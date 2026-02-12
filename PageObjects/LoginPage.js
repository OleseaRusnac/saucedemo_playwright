// Import Playwright assertion library to use expect() for validations
import { expect } from "@playwright/test";

// Define LoginPage class following Page Object Model structure
export class LoginPage {
    // Constructor receives Playwright page object
    constructor(page) {
        // Store page object so it can be reused in all methods
        this.page = page;
        // Locator for Username input field on login page
        this.usernameInput = page.locator('[data-test="username"]');
        // Locator for Password input field on login page
        this.passwordInput = page.locator('[data-test="password"]');
        // Locator for Login button used to submit credentials
        this.loginButton = page.locator('[data-test="login-button"]');
        // Locator for Error message displayed when login fails
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // Method to perform login action using provided username and password
    async login(username, password) {
        // Fill username field (if value is undefined/null, use empty string instead)
        await this.usernameInput.fill(username || '');
        // Fill password field (if value is undefined/null, use empty string instead)
        await this.passwordInput.fill(password || '');
        // Click login button to submit the form
        await this.loginButton.click();
    }

    // Method to verify that expected error message appears on login page
    async verifyErrorMessage(expectedMessage) {
        // Assert that error message text matches expected value
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }
}