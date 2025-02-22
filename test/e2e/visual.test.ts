import { test, expect } from '@playwright/test';

test.describe('Roman Numeral Converter Visual Tests', () => {
  test('should render', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveScreenshot();
  });

  test('should render in dark mode', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('http://localhost:3000');
    await expect(page).toHaveScreenshot();
  });
});
