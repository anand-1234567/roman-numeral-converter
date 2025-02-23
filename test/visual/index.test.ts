import { test, expect } from '@playwright/test';

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

test.describe('Roman Numeral Converter Visual Tests', () => {
  test('should render', async ({ page }) => {
    await page.goto(APP_URL);
    await expect(page).toHaveScreenshot();
  });

  test('should render in dark mode', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(APP_URL);
    await expect(page).toHaveScreenshot();
  });
});
