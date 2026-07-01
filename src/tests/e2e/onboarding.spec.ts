import { test, expect } from '@playwright/test';

test('onboarding route can be requested', async ({ page }) => {
  await page.goto('/customer/onboarding');
  await expect(page).toHaveURL(/customer/);
});
