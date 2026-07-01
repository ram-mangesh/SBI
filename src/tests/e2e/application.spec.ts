import { test, expect } from '@playwright/test';

test('application route can be requested', async ({ page }) => {
  await page.goto('/customer/applications');
  await expect(page).toHaveURL(/customer/);
});
