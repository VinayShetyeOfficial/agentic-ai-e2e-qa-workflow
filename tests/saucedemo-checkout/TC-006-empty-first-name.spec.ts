// spec: specs/saucedemo-checkout-test-plan.md
// Test ID: TC-006 - Empty First Name Field Validation

import { test, expect } from "@playwright/test";

test.describe("Negative Test Cases - Form Validation", () => {
  test("TC-006: Empty First Name Field", async ({ page }) => {
    // Setup: Login and add item to cart
    await page.goto("https://www.saucedemo.com");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory\.html/);

    // Add item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Navigate to checkout
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // 1. Navigate to checkout information page (already there)
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // 2. Leave First Name field empty
    // (do nothing - field is empty by default)

    // 3. Enter "Doe" in Last Name field
    await page.locator('[data-test="lastName"]').fill("Doe");

    // 4. Enter "12345" in Zip Code field
    await page.locator('[data-test="postalCode"]').fill("12345");

    // 5. Click "Continue" button
    await page.locator('[data-test="continue"]').click();

    // 6. Verify error message is displayed: "Error: First Name is required"
    const errorElement = page.locator('[data-test="error"]');
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toContainText("First Name is required");

    // 7. Verify user remains on checkout information page
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // 8. Verify form fields retain entered values (Last Name, Zip Code)
    await expect(page.locator('[data-test="lastName"]')).toHaveValue("Doe");
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue("12345");
  });
});
