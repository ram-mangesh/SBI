import { test, expect } from '@playwright/test';

test('kyc route can be requested', async ({ page }) => {
  await page.goto('/customer/kyc');
  await expect(page).toHaveURL(/customer/);
});
