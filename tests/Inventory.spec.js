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

    // Hook that runs before each test case in this suite
    test.beforeEach(async ({page}) => {
        // Call initPages utility function:
        // 1. Navigate to base URL
        // 2. Perform login
        // 3. Initialize all required Page Objects
        // 4. Return them for reuse in tests
        ({ loginPage, inventoryPage, cartPage, checkoutPage } = await initPages(page));
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

    // Test case: Verify products are sorted by price: Low to High
    test('Verify products are sorted by price: Low to High', async () => {
        // Sort products by price: Low to High
        await inventoryPage.sortBy('lohi');
        // Get all product prices as text
        const priceTexts = await inventoryPage.productPrices.allTextContents();
        // Convert price texts to numbers (remove $ and parse)
        const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));
        // Check if prices are in ascending order
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }
    });

    // Test case: Verify products are sorted by price: High to Low
    test('Verify products are sorted by price: High to Low', async () => {
        // Sort products by price: High to Low
        await inventoryPage.sortBy('hilo');
        // Get all product prices as text
        const priceTexts = await inventoryPage.productPrices.allTextContents();
        // Convert price texts to numbers (remove $ and parse)
        const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));
        // Check if prices are in descending order
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
        }
    });

    // Test case: Verify products are sorted by name: Z to A
    test('Verify products are sorted by name: Z to A', async () => {
        // Sort products by name: Z to A
        await inventoryPage.sortBy('za');
        // Get all product name as text
        const nameTexts = await inventoryPage.inventoryItems.allTextContents();
        // Check if names are in descending order
        for (let i = 0; i < nameTexts.length - 1; i++) {
            expect(nameTexts[i].localeCompare(nameTexts[i + 1])).toBeGreaterThanOrEqual(0);
        }
        // Check if names are in descending order
        for (let i = 0; i < nameTexts.length - 1; i++) {
            expect(nameTexts[i].localeCompare(nameTexts[i + 1])).toBeGreaterThanOrEqual(0);
        }
    });
});