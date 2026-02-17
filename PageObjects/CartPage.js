// Import Playwright assertion library to use expect() for validations
import { expect } from "@playwright/test";

// Define CartPage class following Page Object Model structure
export class CartPage {
    // Constructor receives Playwright page object
    constructor(page) {
        // Store page instance so it can be used in all methods
        this.page = page;
        // Locator for shopping cart icon (top right)
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        // Locator for "Checkout" button inside cart page
        this.checkoutButton = page.locator('[data-test="checkout"]');
        // Locator for all cart items (each product added to cart)
        this.cartItems = page.locator('.cart_item');
        // Locator for continue shopping button
        this.continueShoppingButton = page.locator('[id="continue-shopping"]');
    }

    // Method to open the cart page
    async openCart() {
        // Clicks the cart icon to navigate to cart page
        await this.cartLink.click();
    }

    // Method to verify that a specific product exists in the cart
    async verifyItemInCart(productName) {
        // Filter cart items to find the one containing the provided product name
        const item = this.cartItems.filter({ hasText: productName });
        // Assert that the filtered item is visible on the page
        await expect(item).toBeVisible();
    }

    // Method to proceed to checkout
    async clickCheckout() {
        // Click the Checkout button to start checkout process
        await this.checkoutButton.click();
    }

    // Method to continue shopping (navigate back to inventory)
    async continueShopping(){
        // Click the Continue Shopping
        await this.continueShoppingButton.click();
    }
}