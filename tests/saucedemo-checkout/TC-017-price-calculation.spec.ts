// spec: specs/saucedemo-checkout-test-plan.md
// Test ID: TC-017 - Price Calculation Accuracy

import { test, expect } from "@playwright/test";

test.describe("Data Verification Tests", () => {
  test("TC-017: Price Calculation Accuracy", async ({ page }) => {
    // Setup: Login
    await page.goto("https://www.saucedemo.com");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 1. Note prices of products on products page
    // Expected prices:
    // - Sauce Labs Backpack: $29.99
    // - Sauce Labs Bike Light: $9.99
    // - Sauce Labs Bolt T-Shirt: $15.99

    // 2. Add multiple items with known prices to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
      .click();

    // 3. Navigate to cart page
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 4. Manually calculate expected total
    const expectedSubtotal = 29.99 + 9.99 + 15.99; // = 55.97
    const expectedTax = 4.48; // 8% of 55.97 = 4.4776, rounded to 4.48
    const expectedTotal = 60.45; // 55.97 + 4.48

    // 5. Proceed to checkout overview
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill("Test");
    await page.locator('[data-test="lastName"]').fill("User");
    await page.locator('[data-test="postalCode"]').fill("12345");
    await page.locator('[data-test="continue"]').click();

    // 6. Verify Item Total (subtotal) matches sum of item prices
    const subtotalText = await page
      .locator(".summary_subtotal_label")
      .textContent();
    expect(subtotalText).toContain(expectedSubtotal.toFixed(2));

    // 7. Verify Tax calculation is displayed
    const taxText = await page.locator(".summary_tax_label").textContent();
    expect(taxText).toContain(expectedTax.toFixed(2));

    // 8. Verify Total = Item Total + Tax
    const totalText = await page.locator(".summary_total_label").textContent();
    expect(totalText).toContain(expectedTotal.toFixed(2));

    // 9. Document actual vs expected values
    console.log("Expected Subtotal:", expectedSubtotal.toFixed(2));
    console.log("Actual Subtotal:", subtotalText);
    console.log("Expected Tax:", expectedTax.toFixed(2));
    console.log("Actual Tax:", taxText);
    console.log("Expected Total:", expectedTotal.toFixed(2));
    console.log("Actual Total:", totalText);
  });
});
