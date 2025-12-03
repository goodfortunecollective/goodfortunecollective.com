import { expect, test } from '@playwright/test';

test('home page responds and renders', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('body')).toBeVisible();
});
