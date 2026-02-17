// Import centralized test data used across tests
import { TestData } from "../Common/TestData";
// Import application URLs configuration
import { URLs } from "../Common/URLs";
// Import Page Object classes
import { InventoryPage } from "../PageObjects/InventoryPage";
import { LoginPage } from "../PageObjects/LoginPage";
import { CartPage } from '../PageObjects/CartPage';
import { CheckoutPage } from '../PageObjects/CheckoutPage';
// Import Playwright assertion library
import { expect } from '@playwright/test';

// Utility function to initialize all main pages after successful login
export async function initPages(page) {
    // Create instances
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Navigate to application base URL
    await page.goto(URLs.baseURL);
    // Perform login using valid credentials from TestData
    await loginPage.login(TestData.validUser.username, TestData.validUser.password);
    // Verify login was successful by checking redirection to inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    // Return initialized page objects and test data for use in tests
    return { loginPage, inventoryPage, cartPage, checkoutPage, TestData };
}

// Utility function to initialize only the LoginPage (without logging in)
export async function initLogin(page) {
    // Create LoginPage instance
    const loginPage = new LoginPage(page);
    // Navigate to application base URL
    await page.goto(URLs.baseURL);
    // Return LoginPage instance and TestData for login-related tests
    return { loginPage, TestData }
}