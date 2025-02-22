import { test, expect } from '@playwright/test';

test.describe('Roman Numeral Converter E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the UI app
    await page.goto('http://localhost:3000');
  });

  test('should convert valid numbers to roman numerals', async ({ page }) => {
    // Get the input field and submit button
    const input = page.getByLabel('Enter a number');
    const button = page.getByText('Convert to roman numeral');

    // Test a few valid conversions
    const testCases = [
      { input: '42', expected: 'XLII' },
      { input: '2024', expected: 'MMXXIV' },
      { input: '999', expected: 'CMXCIX' }
    ];

    for (const testCase of testCases) {
      await input.clear();
      await input.fill(testCase.input);
      await button.click();

      // Verify the result
      await expect(page.getByText('Roman numeral:')).toBeVisible();
      await expect(page.getByText(testCase.expected)).toBeVisible();
    }
  });

  test('should handle invalid inputs', async ({ page }) => {
    const input = page.getByLabel('Enter a number');
    const button = page.getByText('Convert to roman numeral');

    // Test cases for invalid inputs
    const testCases = [
      { input: '4000', expectedError: 'Number must be between 1 and 3999' },
      { input: '0', expectedError: 'Number must be between 1 and 3999' },
      { input: 'abc', expectedError: 'Input must be a number' },
      { input: '1.5', expectedError: 'Number must be an integer' }
    ];

    for (const testCase of testCases) {
      await input.clear();
      await input.fill(testCase.input);
      await button.click();

      // Verify error message
      await expect(page.getByText(testCase.expectedError)).toBeVisible();
    }
  });

  test('should handle API service unavailability', async ({ page }) => {
    // Force API requests to fail
    await page.route('/api/roman**', route => route.abort());

    const input = page.getByLabel('Enter a number');
    const button = page.getByText('Convert to roman numeral');

    await input.fill('42');
    await button.click();

    // Verify error message
    await expect(page.getByText('Something went wrong. Please try again later.')).toBeVisible();
  });
});
