// spec: specs/saucedemo-checkout-test-plan.md
// Test ID: TC-002 - Complete Checkout Flow - Multiple Items

import { test, expect } from "@playwright/test";

test.describe("Happy Path Tests", () => {
  test("TC-002: Complete Checkout Flow - Multiple Items", async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com
    await page.goto("https://www.saucedemo.com");

    // 2. Login with username "standard_user" and password "secret_sauce"
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 3. Add three different products to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
      .click();

    // 4. Verify cart badge shows "3"
    await expect(page.locator(".shopping_cart_badge")).toHaveText("3");

    // 5. Click on the shopping cart icon
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 6. Verify all three items are displayed in the cart with correct details
    const cartItems = page.locator(".cart_item");
    await expect(cartItems).toHaveCount(3);

    // Verify individual items
    await expect(
      page
        .locator(".inventory_item_name")
        .filter({ hasText: "Sauce Labs Backpack" }),
    ).toBeVisible();
    await expect(
      page
        .locator(".inventory_item_name")
        .filter({ hasText: "Sauce Labs Bike Light" }),
    ).toBeVisible();
    await expect(
      page
        .locator(".inventory_item_name")
        .filter({ hasText: "Sauce Labs Bolt T-Shirt" }),
    ).toBeVisible();

    // 7. Verify total price calculation is present (will verify exact amount in overview)
    // Cart page doesn't show total, so we proceed to checkout

    // 8. Click "Checkout" button
    await page.locator('[data-test="checkout"]').click();

    // 9. Enter checkout information
    await page.locator('[data-test="firstName"]').fill("Jane");
    await page.locator('[data-test="lastName"]').fill("Smith");
    await page.locator('[data-test="postalCode"]').fill("90210");

    // 10. Click "Continue"
    await page.locator('[data-test="continue"]').click();

    // 11. Verify all three items are listed in the checkout overview
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    const overviewItems = page.locator(".cart_item");
    await expect(overviewItems).toHaveCount(3);

    // 12. Verify subtotal, tax, and total amounts are correct
    // Expected: $29.99 + $9.99 + $15.99 = $55.97
    // Tax (8%): $4.48
    // Total: $60.45
    const subtotalText = await page
      .locator(".summary_subtotal_label")
      .textContent();
    const taxText = await page.locator(".summary_tax_label").textContent();
    const totalText = await page.locator(".summary_total_label").textContent();

    expect(subtotalText).toContain("55.97");
    expect(taxText).toContain("4.48");
    expect(totalText).toContain("60.45");

    // 13. Click "Finish"
    await page.locator('[data-test="finish"]').click();

    // 14. Verify order confirmation page with success message
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    await expect(page.locator(".complete-header")).toContainText(
      "Thank you for your order",
    );

    // 15. Return to products page
    await page.locator('[data-test="back-to-products"]').click();

    // 16. Verify cart is empty
    await expect(page.locator(".shopping_cart_badge")).not.toBeVisible();
  });
});
