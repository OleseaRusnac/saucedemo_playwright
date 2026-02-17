// Import Playwright assertion library to use expect() for validations
import { expect } from "@playwright/test";

// Define InventoryPage class following Page Object Model structure
export class InventoryPage {

    // Constructor receives Playwright page object
    constructor(page) {
        // Store page object so it can be reused in all methods
        this.page = page;
        // Locator for all inventory item description blocks (each product container)
        this.inventoryItems = page.locator('[data-test="inventory-item-description"]'); 
        // Locator for shopping cart badge showing number of added items
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        // Locator for product sorting dropdown 
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        // Locator for product price elements (used for sorting verification)
        this.productPrices = page.locator('.inventory_item_price');
    }

    // Method to return total number of products displayed on inventory page
    async getInventoryCount() { 
        // Count how many product elements are present
        return await this.inventoryItems.count(); 
    }

    // Method to add product to cart using its index (position in list)
    async addItemToCartByIndex(index) { 
        // Select product by its index (0-based)
        const item = this.inventoryItems.nth(index);
        // Locate "Add to cart" button inside selected product block
        const addButton = item.locator('button');
        // Click the button to add product to cart
        await addButton.click();
    }

    // Method to add product to cart by product name
    async addItemToCartByName(productName) {
        // Locate product container that contains specific product name
        const item = this.page.locator('.inventory_item').filter({ hasText: productName});
        // Click the button inside the matched product container
        await item.locator('button').click();
    }

    // Method to verify cart badge displays expected number of items
    async verifyCartBadgeCount(expectedCount) {
        // Convert expected number to string and verify badge text matches
        await expect(this.cartBadge).toHaveText(expectedCount.toString());
    }

    // Method to remove a specific product from the cart
    async removeProduct(productName) {
        const formattedName = productName.toLowerCase().replace(/ /g, '-');
        // Create dynamic locator for the Remove button
        const removeButton = this.page.locator(`[data-test="remove-${formattedName}"]`);
        // Click the Remove button
        await removeButton.click();
    }

    // Method to sort products by a specific criteria (e.g., price, name)
    async sortBy(value) {
        await this.sortDropdown.selectOption(value);
    }

    // Method to get all product prices as an array of numbers (used for sorting verification)
    async getAllPrices() {
        // Get all price elements and extract their text content
        const priceElements = await this.productPrices.allTextContents();
        return priceElements.map(price => parseFloat(price.replace('$', '')));
    }
}