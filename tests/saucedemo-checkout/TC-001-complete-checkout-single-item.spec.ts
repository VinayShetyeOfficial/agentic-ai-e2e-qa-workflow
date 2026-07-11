// spec: specs/saucedemo-checkout-test-plan.md
// Test ID: TC-001 - Complete Checkout Flow - Single Item

import { test, expect } from "@playwright/test";

test.describe("Happy Path Tests", () => {
  test("TC-001: Complete Checkout Flow - Single Item", async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com
    await page.goto("https://www.saucedemo.com");

    // 2. Enter username "standard_user" in the username field
    await page.locator('[data-test="username"]').fill("standard_user");

    // 3. Enter password "secret_sauce" in the password field
    await page.locator('[data-test="password"]').fill("secret_sauce");

    // 4. Click the "Login" button
    await page.locator('[data-test="login-button"]').click();

    // 5. Verify user is redirected to the products page
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator(".inventory_list")).toBeVisible();

    // 6. Add the first product (Sauce Labs Backpack) to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 7. Verify the cart badge shows "1"
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

    // 8. Click on the shopping cart icon
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 9. Verify the cart page displays the added item
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(page.locator(".inventory_item_name")).toContainText(
      "Sauce Labs Backpack",
    );
    await expect(page.locator(".inventory_item_price")).toContainText("29.99");

    // 10. Verify "Checkout" button is visible
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();

    // 11. Click the "Checkout" button
    await page.locator('[data-test="checkout"]').click();

    // 12. Verify checkout information page is displayed
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // 13. Enter "John" in the First Name field
    await page.locator('[data-test="firstName"]').fill("John");

    // 14. Enter "Doe" in the Last Name field
    await page.locator('[data-test="lastName"]').fill("Doe");

    // 15. Enter "12345" in the Zip/Postal Code field
    await page.locator('[data-test="postalCode"]').fill("12345");

    // 16. Click the "Continue" button
    await page.locator('[data-test="continue"]').click();

    // 17. Verify checkout overview page is displayed
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    await expect(page.locator(".summary_info")).toBeVisible();
    await expect(page.locator(".inventory_item_name")).toContainText(
      "Sauce Labs Backpack",
    );

    // Verify payment and shipping information sections exist
    await expect(
      page
        .locator(".summary_info_label")
        .filter({ hasText: "Payment Information" }),
    ).toBeVisible();
    await expect(
      page
        .locator(".summary_info_label")
        .filter({ hasText: "Shipping Information" }),
    ).toBeVisible();

    // Verify price totals are displayed
    await expect(page.locator(".summary_subtotal_label")).toBeVisible();
    await expect(page.locator(".summary_tax_label")).toBeVisible();
    await expect(page.locator(".summary_total_label")).toBeVisible();

    // 18. Click the "Finish" button
    await page.locator('[data-test="finish"]').click();

    // 19. Verify order confirmation page is displayed with success message
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    await expect(page.locator(".complete-header")).toContainText(
      "Thank you for your order",
    );

    // 20. Verify "Back Home" button is visible
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();

    // 21. Click "Back Home" button
    await page.locator('[data-test="back-to-products"]').click();

    // 22. Verify user is redirected to products page
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 23. Verify cart badge is empty or not visible
    await expect(page.locator(".shopping_cart_badge")).not.toBeVisible();
  });
});
