# Test Plan: SCRUM-101 - E-commerce Checkout Process

**Application URL:** https://www.saucedemo.com  
**Test Credentials:** Username: `standard_user` | Password: `secret_sauce`  
**Test Level:** End-to-End (E2E)  
**Test Type:** Functional, UI, Integration  
**Created:** 2026-07-11

---

## 1. Test Objectives

Verify that the complete checkout flow works as expected from cart review to order confirmation, including:

- Cart display and calculations
- Form validation and data entry
- Order summary and review
- Order completion and confirmation
- Error handling and negative scenarios

---

## 2. Test Scenarios

### 2.1 Happy Path Tests

#### 2.1.1 Complete Checkout Flow - Single Item

**Test ID:** TC-001  
**Priority:** High  
**Seed:** N/A

**Preconditions:**

- User is not logged in
- Browser is at the home page

**Test Steps:**

1. Navigate to https://www.saucedemo.com
2. Enter username "standard_user" in the username field
3. Enter password "secret_sauce" in the password field
4. Click the "Login" button
5. Verify user is redirected to the products page
6. Add the first product (Sauce Labs Backpack) to cart by clicking "Add to cart" button
7. Verify the cart badge shows "1"
8. Click on the shopping cart icon
9. Verify the cart page displays the added item with:
   - Product name: "Sauce Labs Backpack"
   - Product description
   - Product price: "$29.99"
   - Quantity: 1
10. Verify "Checkout" button is visible
11. Click the "Checkout" button
12. Verify checkout information page is displayed
13. Enter "John" in the First Name field
14. Enter "Doe" in the Last Name field
15. Enter "12345" in the Zip/Postal Code field
16. Click the "Continue" button
17. Verify checkout overview page is displayed with:
    - Item details (name, quantity, price)
    - Payment information
    - Shipping information
    - Price Total with subtotal and tax
18. Click the "Finish" button
19. Verify order confirmation page is displayed with success message
20. Verify "Back Home" button is visible
21. Click "Back Home" button
22. Verify user is redirected to products page
23. Verify cart badge is empty or shows "0"

**Expected Results:**

- All steps complete successfully without errors
- Order is placed and confirmed
- Cart is cleared after order completion

---

#### 2.1.2 Complete Checkout Flow - Multiple Items

**Test ID:** TC-002  
**Priority:** High  
**Seed:** N/A

**Preconditions:**

- User is not logged in
- Browser is at the home page

**Test Steps:**

1. Navigate to https://www.saucedemo.com
2. Login with username "standard_user" and password "secret_sauce"
3. Add three different products to cart:
   - Sauce Labs Backpack
   - Sauce Labs Bike Light
   - Sauce Labs Bolt T-Shirt
4. Verify cart badge shows "3"
5. Click on the shopping cart icon
6. Verify all three items are displayed in the cart with correct details
7. Verify total price calculation is correct (sum of all item prices)
8. Click "Checkout" button
9. Enter checkout information:
   - First Name: "Jane"
   - Last Name: "Smith"
   - Zip Code: "90210"
10. Click "Continue"
11. Verify all three items are listed in the checkout overview
12. Verify subtotal, tax, and total amounts are correct
13. Click "Finish"
14. Verify order confirmation page with success message
15. Return to products page
16. Verify cart is empty

**Expected Results:**

- Multiple items checkout successfully
- All calculations are accurate
- All items displayed correctly throughout the flow

---

#### 2.1.3 Continue Shopping from Cart

**Test ID:** TC-003  
**Priority:** Medium  
**Seed:** N/A

**Preconditions:**

- User is logged in
- At least one item in cart

**Test Steps:**

1. Navigate to https://www.saucedemo.com and login
2. Add one product to cart
3. Click shopping cart icon
4. Click "Continue Shopping" button
5. Verify user is redirected back to products page
6. Verify cart badge still shows the item count
7. Add another product to cart
8. Click cart icon again
9. Verify both items are in the cart

**Expected Results:**

- Continue Shopping button returns to products page
- Cart contents are preserved
- User can continue adding items

---

#### 2.1.4 Cancel Checkout from Information Page

**Test ID:** TC-004  
**Priority:** Medium  
**Seed:** N/A

**Preconditions:**

- User is logged in
- Items in cart

**Test Steps:**

1. Navigate to cart with items
2. Click "Checkout" button
3. Verify checkout information page is displayed
4. Click "Cancel" button
5. Verify user is redirected back to cart page
6. Verify cart items are still present

**Expected Results:**

- Cancel returns user to cart
- Cart contents are preserved

---

#### 2.1.5 Cancel Checkout from Overview Page

**Test ID:** TC-005  
**Priority:** Medium  
**Seed:** N/A

**Preconditions:**

- User is logged in
- Items in cart

**Test Steps:**

1. Navigate to cart with items
2. Click "Checkout"
3. Enter valid checkout information (First: "Test", Last: "User", Zip: "12345")
4. Click "Continue"
5. Verify checkout overview page is displayed
6. Click "Cancel" button
7. Verify user is redirected back to products page
8. Click cart icon
9. Verify cart items are still present

**Expected Results:**

- Cancel from overview returns to products page
- Cart contents are preserved

---

### 2.2 Negative Test Cases - Form Validation

#### 2.2.1 Empty First Name Field

**Test ID:** TC-006  
**Priority:** High  
**Seed:** N/A

**Preconditions:**

- User is logged in
- Items in cart
- On checkout information page

**Test Steps:**

1. Navigate to checkout information page
2. Leave First Name field empty
3. Enter "Doe" in Last Name field
4. Enter "12345" in Zip Code field
5. Click "Continue" button
6. Verify error message is displayed: "Error: First Name is required"
7. Verify user remains on checkout information page
8. Verify form fields retain entered values (Last Name, Zip Code)

**Expected Results:**

- Appropriate error message displayed
- Form submission prevented
- User remains on same page

---

#### 2.2.2 Empty Last Name Field

**Test ID:** TC-007  
**Priority:** High  
**Seed:** N/A

**Preconditions:**

- User is logged in
- Items in cart
- On checkout information page

**Test Steps:**

1. Navigate to checkout information page
2. Enter "John" in First Name field
3. Leave Last Name field empty
4. Enter "12345" in Zip Code field
5. Click "Continue" button
6. Verify error message is displayed: "Error: Last Name is required"
7. Verify user remains on checkout information page

**Expected Results:**

- Appropriate error message displayed
- Form submission prevented

---

#### 2.2.3 Empty Zip Code Field

**Test ID:** TC-008  
**Priority:** High  
**Seed:** N/A

**Preconditions:**

- User is logged in
- Items in cart
- On checkout information page

**Test Steps:**

1. Navigate to checkout information page
2. Enter "John" in First Name field
3. Enter "Doe" in Last Name field
4. Leave Zip/Postal Code field empty
5. Click "Continue" button
6. Verify error message is displayed: "Error: Postal Code is required"
7. Verify user remains on checkout information page

**Expected Results:**

- Appropriate error message displayed
- Form submission prevented

---

#### 2.2.4 All Fields Empty

**Test ID:** TC-009  
**Priority:** High  
**Seed:** N/A

**Preconditions:**

- User is logged in
- Items in cart
- On checkout information page

**Test Steps:**

1. Navigate to checkout information page
2. Leave all fields empty (First Name, Last Name, Zip Code)
3. Click "Continue" button
4. Verify error message is displayed indicating required field
5. Verify user remains on checkout information page

**Expected Results:**

- Error message displayed
- Form submission prevented

---

### 2.3 Edge Cases and Boundary Tests

#### 2.3.1 Special Characters in Name Fields

**Test ID:** TC-010  
**Priority:** Medium  
**Seed:** N/A

**Preconditions:**

- User is logged in
- Items in cart
- On checkout information page

**Test Steps:**

1. Navigate to checkout information page
2. Enter special characters in First Name: "John@#$"
3. Enter special characters in Last Name: "Doe!%^"
4. Enter valid Zip Code: "12345"
5. Click "Continue"
6. Observe system behavior

**Expected Results:**

- System either accepts special characters and proceeds OR
- Displays validation error for invalid characters

---

#### 2.3.2 Long Input Values

**Test ID:** TC-011  
**Priority:** Low  
**Seed:** N/A

**Preconditions:**

- User is logged in
- Items in cart
- On checkout information page

**Test Steps:**

1. Navigate to checkout information page
2. Enter very long string (100+ characters) in First Name field
3. Enter very long string (100+ characters) in Last Name field
4. Enter valid Zip Code: "12345"
5. Click "Continue"
6. If proceeds, verify display on overview page is handled correctly

**Expected Results:**

- System handles long inputs gracefully
- No UI breaking or overflow issues

---

#### 2.3.3 Numeric Values in Name Fields

**Test ID:** TC-012  
**Priority:** Medium  
**Seed:** N/A

**Preconditions:**

- User is logged in
- Items in cart
- On checkout information page

**Test Steps:**

1. Navigate to checkout information page
2. Enter numeric values in First Name: "12345"
3. Enter numeric values in Last Name: "67890"
4. Enter valid Zip Code: "12345"
5. Click "Continue"
6. Observe system behavior

**Expected Results:**

- System behavior is consistent with business rules
- Either accepts or rejects with clear validation message

---

#### 2.3.4 Whitespace Only in Fields

**Test ID:** TC-013  
**Priority:** Medium  
**Seed:** N/A

**Preconditions:**

- User is logged in
- Items in cart
- On checkout information page

**Test Steps:**

1. Navigate to checkout information page
2. Enter only spaces in First Name field: " "
3. Enter only spaces in Last Name field: " "
4. Enter only spaces in Zip Code field: " "
5. Click "Continue"
6. Verify error messages are displayed

**Expected Results:**

- System treats whitespace-only as empty fields
- Appropriate validation errors displayed

---

### 2.4 Navigation and State Management Tests

#### 2.4.1 Browser Back Button During Checkout

**Test ID:** TC-014  
**Priority:** Medium  
**Seed:** N/A

**Preconditions:**

- User is logged in
- Items in cart

**Test Steps:**

1. Navigate to cart with items
2. Click "Checkout"
3. Enter checkout information and click "Continue"
4. Verify on checkout overview page
5. Click browser back button
6. Verify returned to checkout information page
7. Verify entered information is preserved or cleared based on design
8. Click browser back button again
9. Verify returned to cart page
10. Verify cart items are still present

**Expected Results:**

- Back button navigation works correctly
- Application state is maintained appropriately
- No errors or broken states

---

#### 2.4.2 Direct URL Access to Checkout Pages Without Login

**Test ID:** TC-015  
**Priority:** High  
**Seed:** N/A

**Preconditions:**

- User is not logged in

**Test Steps:**

1. Clear browser cookies/session
2. Directly navigate to: https://www.saucedemo.com/cart.html
3. Observe behavior (should redirect to login)
4. Login successfully
5. Verify appropriate page is displayed after login

**Expected Results:**

- Unauthorized users cannot access checkout pages
- Proper redirect to login page
- After login, user is taken to appropriate page

---

#### 2.4.3 Direct URL Access to Checkout Without Items in Cart

**Test ID:** TC-016  
**Priority:** Medium  
**Seed:** N/A

**Preconditions:**

- User is logged in
- Cart is empty

**Test Steps:**

1. Ensure cart is empty
2. Directly navigate to checkout pages via URL manipulation
3. Observe system behavior

**Expected Results:**

- System prevents checkout with empty cart OR
- Displays appropriate message/warning
- User is guided back to products or cart page

---

### 2.5 Data Verification Tests

#### 2.5.1 Price Calculation Accuracy

**Test ID:** TC-017  
**Priority:** High  
**Seed:** N/A

**Preconditions:**

- User is logged in

**Test Steps:**

1. Note prices of products on products page
2. Add multiple items with known prices to cart
3. Navigate to cart page
4. Manually calculate expected total
5. Proceed to checkout overview
6. Verify Item Total (subtotal) matches sum of item prices
7. Verify Tax calculation is displayed
8. Verify Total = Item Total + Tax
9. Document actual vs expected values

**Expected Results:**

- All price calculations are accurate
- No rounding errors
- Tax calculation is correct

---

#### 2.5.2 Item Details Consistency

**Test ID:** TC-018  
**Priority:** High  
**Seed:** N/A

**Preconditions:**

- User is logged in

**Test Steps:**

1. On products page, note details of selected item (name, description, price)
2. Add item to cart
3. Navigate to cart page
4. Verify item details match products page
5. Proceed through checkout
6. On checkout overview, verify item details still match
7. Document any discrepancies

**Expected Results:**

- Item details are consistent across all pages
- No data loss or corruption during flow

---

## 3. Test Data

| Field      | Valid Data                | Invalid Data | Edge Cases                       |
| ---------- | ------------------------- | ------------ | -------------------------------- |
| First Name | "John", "Jane", "Mary"    | "", " "      | "John@123", "A", "X".repeat(100) |
| Last Name  | "Doe", "Smith", "Johnson" | "", " "      | "Doe#456", "B", "Y".repeat(100)  |
| Zip Code   | "12345", "90210", "10001" | "", " "      | "ABC12", "1", "Z".repeat(50)     |

---

## 4. Environment Setup

**Prerequisites:**

- Playwright Test Framework installed
- Node.js environment configured
- Browser drivers (Chrome, Firefox, Safari)

**Test Environment:**

- URL: https://www.saucedemo.com
- Test User: standard_user
- Password: secret_sauce

---

## 5. Test Coverage Matrix

| Acceptance Criteria      | Test Cases                                             | Coverage |
| ------------------------ | ------------------------------------------------------ | -------- |
| AC1: Cart Review         | TC-001, TC-002, TC-003, TC-017, TC-018                 | 100%     |
| AC2: Checkout Info Entry | TC-001, TC-002, TC-006, TC-007, TC-008, TC-009         | 100%     |
| AC3: Order Overview      | TC-001, TC-002, TC-017, TC-018                         | 100%     |
| AC4: Order Completion    | TC-001, TC-002                                         | 100%     |
| AC5: Error Handling      | TC-006, TC-007, TC-008, TC-009, TC-010, TC-012, TC-013 | 100%     |
| Navigation               | TC-003, TC-004, TC-005, TC-014, TC-015, TC-016         | 100%     |
| Edge Cases               | TC-010, TC-011, TC-012, TC-013                         | 100%     |

---

## 6. Test Execution Priority

**Priority 1 (Must Run):**

- TC-001, TC-002, TC-006, TC-007, TC-008, TC-009, TC-015, TC-017, TC-018

**Priority 2 (Should Run):**

- TC-003, TC-004, TC-005, TC-010, TC-012, TC-013, TC-014, TC-016

**Priority 3 (Nice to Have):**

- TC-011

---

## 7. Pass/Fail Criteria

**Test Case Passes If:**

- All steps execute without errors
- All expected results are achieved
- Application behaves according to specifications

**Test Case Fails If:**

- Any step cannot be completed
- Expected results do not match actual results
- Application errors, crashes, or hangs
- Data integrity issues observed

---

## 8. Risks and Assumptions

**Assumptions:**

- Application is accessible at https://www.saucedemo.com
- Test credentials remain valid throughout testing
- Application behavior is consistent across test runs
- No external dependencies affect test execution

**Risks:**

- Network connectivity issues
- Application downtime or slow response
- Test environment instability
- Browser compatibility issues

---

## 9. Test Deliverables

1. This test plan document
2. Automated test scripts (Playwright)
3. Test execution report
4. Bug reports (if any)
5. Screenshots and evidence
6. Test coverage report

---

**Test Plan Approved By:** QA Team  
**Date:** 2026-07-11  
**Version:** 1.0
