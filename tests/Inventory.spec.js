// Import Playwright test runner and assertion library
import {test, expect} from '@playwright/test'
// Import centralized test data (users, checkout info, etc.)
import { TestData } from "../Common/TestData";
// Import centralized URLs configuration
import { URLs } from "../Common/URLs";
// Import Page Object classes
import { InventoryPage } from "../PageObjects/InventoryPage";
import { LoginPage } from "../PageObjects/LoginPage";
import { CartPage } from '../PageObjects/CartPage';
import { CheckoutPage } from '../PageObjects/CheckoutPage';

// Group related login tests under a single describe block
test.describe('Inventory Page Tests', () => {
    let loginPage; // Will store LoginPage instance
    let inventoryPage; // Will store InventoryPage instance
    let cartPage; // Will store CartPage instance
    let checkoutPage; // Will store CheckoutPage instance

    // Hook that runs before each test case
    test.beforeEach(async ({page}) => {
        // Initialize Page Object classes before each test
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        // Navigate to the login page to ensure every test starts from the same state
        await page.goto(URLs.baseURL);
        // Perform login with valid credentials from TestData
        await loginPage.login(TestData.validUser.username, TestData.validUser.password); 
        // Verify successful login by checking URL
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    // Test case: Verify that 6 inventory items are displayed
    test('Verify 6 inventory items are displayed', async () => {
        // Get total number of inventory items displayed on page
        const count = await inventoryPage.getInventoryCount();
        // Assert that exactly 6 products are visible
        await expect(count).toBe(6);
    });

    // Test case: Add first product to cart using index
    test('Add first item to cart', async () => {
        // Add first product to cart by its index (0 = first)
        await inventoryPage.addItemToCartByIndex(0);
        // Verify cart badge shows correct quantity (1 item)
        await inventoryPage.verifyCartBadgeCount(1);
    });

    // Test case: Add a product to cart using product name
    test('Add item product by name', async () => {
        // Add product using product name
        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        // Verify cart badge shows correct quantity (1 item)
        await inventoryPage.verifyCartBadgeCount(1);
    });

    // Test case: Add multiple products to cart
    test('Add multiple products to cart', async () => {
        // Add two different products
        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
        // Verify cart badge shows total of 2 items
        await inventoryPage.verifyCartBadgeCount(2);
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

    // Test case: Remove item from inventory page
    test('Remove item from inventory page', async () => {
        // Add products to cart using product name
        await inventoryPage.addItemToCartByName('Sauce Labs Onesie');
        await inventoryPage.addItemToCartByName('Sauce Labs Fleece Jacket');
        // Remove item
        await inventoryPage.removeProduct('Sauce Labs Onesie');
        // Verify cart badge shows correct quantity (1 item)
        await inventoryPage.verifyCartBadgeCount(1);
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
    })
});