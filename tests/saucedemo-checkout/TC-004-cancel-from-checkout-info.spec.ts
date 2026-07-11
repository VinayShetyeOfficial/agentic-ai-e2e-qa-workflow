// spec: specs/saucedemo-checkout-test-plan.md
// Test ID: TC-004 - Cancel Checkout from Information Page

import { test, expect } from "@playwright/test";

test.describe("Happy Path Tests", () => {
  test("TC-004: Cancel Checkout from Information Page", async ({ page }) => {
    // Setup: Login and add item to cart
    await page.goto("https://www.saucedemo.com");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory\.html/);

    // Add item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 1. Navigate to cart with items
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/.*cart\.html/);

    // Verify item is in cart
    await expect(page.locator(".cart_item")).toHaveCount(1);

    // 2. Click "Checkout" button
    await page.locator('[data-test="checkout"]').click();

    // 3. Verify checkout information page is displayed
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // 4. Click "Cancel" button
    await page.locator('[data-test="cancel"]').click();

    // 5. Verify user is redirected back to cart page
    await expect(page).toHaveURL(/.*cart\.html/);

    // 6. Verify cart items are still present
    await expect(page.locator(".cart_item")).toHaveCount(1);
    await expect(page.locator(".inventory_item_name")).toContainText(
      "Sauce Labs Backpack",
    );
  });
});
