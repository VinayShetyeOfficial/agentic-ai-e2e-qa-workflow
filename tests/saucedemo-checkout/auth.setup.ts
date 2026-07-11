// spec: specs/saucedemo-checkout-test-plan.md
// Authentication setup for SauceDemo tests

import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  // Navigate to login page
  await page.goto("https://www.saucedemo.com");

  // Fill login credentials
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");

  // Click login button
  await page.locator('[data-test="login-button"]').click();

  // Wait for successful navigation to inventory page
  await page.waitForURL("**/inventory.html");

  // Verify login successful
  await expect(page.locator(".inventory_list")).toBeVisible();

  // Save authentication state
  await page.context().storageState({ path: authFile });
});
