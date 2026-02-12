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
}