// Import Playwright assertion library to use expect() for validations
import { expect } from "@playwright/test";

// Define CheckoutPage class following Page Object Model structure
export class CheckoutPage {
    // Constructor receives Playwright page object
    constructor(page) {
        // Store page object so it can be reused in all methods
        this.page = page;
        // Locator for First Name input field in checkout form
        this.firstNameInput = page.locator('[data-test="firstName"]');
        // Locator for Last Name input field in checkout form
        this.lastNameInput = page.locator('[data-test="lastName"]');
        // Locator for Postal Code input field in checkout form
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        // Locator for Continue button
        this.continueButton = page.locator('[data-test="continue"]');
        // Locator for Finish button
        this.finishButton = page.locator('[data-test="finish"]');
        // Locator for success message displayed after successful order
        this.successMessage = page.locator('[data-test="complete-header"]');
    }

    // Method to fill checkout form and proceed to next step
    async fillCheckoutInformation(firstName, lastName, postalCode) {
        // Fill First Name field with provided value
        await this.firstNameInput.fill(firstName);
        // Fill Last Name field with provided value
        await this.lastNameInput.fill(lastName);
        // Fill Postal Code field with provided value
        await this.postalCodeInput.fill(postalCode);
        // Click Continue to proceed to checkout overview page
        await this.continueButton.click();
    }

    // Method to finalize the purchase
    async finishOrder() {
        // Click Finish button to complete the order
        await this.finishButton.click();
    }

    // Method to verify that order was successfully completed
    async verifyOrderCompleted() {
        // Assert that success message matches expected confirmation text
        await expect(this.successMessage).toHaveText('Thank you for your order!');
    }
}