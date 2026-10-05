import { expect, test } from '@playwright/test'
import { readFile } from 'node:fs/promises'

test.beforeEach(async ({ page }) => {
  // Keep these checks independent of Google's font service.
  await page.route('https://fonts.googleapis.com/**', (route) => route.abort())
  await page.route('https://fonts.gstatic.com/**', (route) => route.abort())
})

test('renders all sections without browser errors or horizontal overflow', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page).toHaveTitle('Ethan Ortiz | Portfolio')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('article')).toHaveCount(3)
  for (const id of ['home', 'projects', 'about', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeAttached()
  }
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    )
    expect(hasOverflow, `Horizontal overflow at ${width}px`).toBe(false)
  }
  expect(errors).toEqual([])
})

test('navigation reaches projects and mobile menu closes after selection', async ({
  page,
}, testInfo) => {
  await page.goto('/')
  const mobile = testInfo.project.name.startsWith('mobile')
  if (mobile) {
    const menu = page.getByRole('button', { name: 'Menu' })
    await expect(menu).toHaveAttribute('aria-expanded', 'false')
    await expect(
      page.getByRole('navigation').getByRole('link', { name: 'Projects' }),
    ).toBeHidden()
    await menu.click()
    await expect(page.getByRole('button', { name: 'Close' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  }
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Projects' })
    .click()
  await expect(page).toHaveURL(/#projects$/)
  await expect(
    page.getByRole('heading', { name: 'Ideas made tangible.' }),
  ).toBeInViewport()
  if (mobile)
    await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
})

test('resume downloads as a PDF and contact uses an email link', async ({
  page,
}) => {
  await page.goto('/')
  const resume = page.getByRole('link', { name: /Download résumé/ })
  const downloadPromise = page.waitForEvent('download')
  await resume.click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('Ethan-Ortiz-Resume.pdf')
  expect(await download.failure()).toBeNull()
  const downloadPath = await download.path()
  if (!downloadPath)
    throw new Error('The resume download did not produce a file.')
  expect((await readFile(downloadPath)).subarray(0, 5).toString()).toBe('%PDF-')
  await expect(
    page.getByRole('link', { name: /Get in touch/ }),
  ).toHaveAttribute('href', /^mailto:/)
})
