import { expect, test } from '@playwright/test';

test('home page responds and renders', async ({ page }) => {
	const response = await page.goto('/');
	expect(response?.ok()).toBe(true);
	await expect(page.locator('body')).toBeVisible();
});
