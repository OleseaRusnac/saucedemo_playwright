// Import Playwright test runner and assertion library
import {test, expect} from '@playwright/test'
// Import reusable setup function that initializes pages and performs login
import { initPages } from './testSetup';

// Group all Inventory-related tests under one test suite
test.describe('Inventory Page Tests', () => {
    // Declare variables to store initialized Page Object instances
    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutPage;
    let TestData;

    // Hook that runs before each test case in this suite
    test.beforeEach(async ({page}) => {
        // Call initPages utility function:
        // 1. Navigate to base URL
        // 2. Perform login
        // 3. Initialize all required Page Objects
        // 4. Return them for reuse in tests
        ({ loginPage, inventoryPage, cartPage, checkoutPage, TestData } = await initPages(page));
    });

    // Test case: Complete checkout process successfully
    test('Complete checkout successfully', async () => {
        // Add product to cart using product name
        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        // Open cart
        await cartPage.openCart();
        // Verify product is present in cart
        await cartPage.verifyItemInCart('Sauce Labs Backpack');
        // Start checkout process
        await cartPage.clickCheckout();
        // Fill checkout information
        await checkoutPage.fillCheckoutInformation(TestData.checkoutDetails.firstName, TestData.checkoutDetails.lastName, TestData.checkoutDetails.postalCode);
        // Complete order
        await checkoutPage.finishOrder();
        // Verify confirmation
        await checkoutPage.verifyOrderCompleted();
    });

    // Test case: Return to inventory from cart page to continue shopping
    test('Continue shopping from cart page', async({page}) =>{
        // Add product to cart using product name
        await inventoryPage.addItemToCartByName('Sauce Labs Onesie');
        // Open cart
        await cartPage.openCart();
        // Verify product is present in cart
        await cartPage.verifyItemInCart('Sauce Labs Onesie');
        // Click "Continue Shopping" button
        await cartPage.continueShopping();
        // Verify the inventory page 
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        // Add product to cart using product name
        await inventoryPage.addItemToCartByName('Sauce Labs Fleece Jacket');
        // Open cart
        await cartPage.openCart();
        // Verify both products are present in cart
        await cartPage.verifyItemInCart('Sauce Labs Onesie');
        await cartPage.verifyItemInCart('Sauce Labs Fleece Jacket');
    });

    // Test case: Remove item from cart page
    test('Remove item from cart page', async() => {
        // Add products to cart using product name
        await inventoryPage.addItemToCartByName('Sauce Labs Onesie');
        await inventoryPage.addItemToCartByName('Sauce Labs Fleece Jacket');
        // Open cart
        await cartPage.openCart();
        // Verify product is present in cart
        await cartPage.verifyItemInCart('Sauce Labs Onesie');
        await cartPage.verifyItemInCart('Sauce Labs Fleece Jacket');
        // Remove item from cart
        await inventoryPage.removeProduct('Sauce Labs Onesie');
        // Verify cart badge shows correct quantity (1 item)
        await inventoryPage.verifyCartBadgeCount(1);
    });
});