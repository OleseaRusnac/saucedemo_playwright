// Import Playwright test runner and assertion library
import { test, expect } from '@playwright/test';
// Import reusable login setup function
import { initLogin } from './testSetup';

// Group all login-related test cases under one suite
test.describe('Login Form', () => {
    // Declare variables to store LoginPage instance and TestData
    let loginPage;
    let TestData;

    // Hook that runs before each test case in this suite
    test.beforeEach(async ({ page }) => {
        // Call initLogin utility function to:
        // 1. Navigate to base URL
        // 2. Initialize LoginPage object
        // 3. Return LoginPage and TestData for use in tests
        ({ loginPage, TestData } = await initLogin(page));
    });

    // Positive test: successful login with valid credentials
    test('Login with valid credentials', async ({ page }) => {
        // Perform login using valid username and password from TestData
        await loginPage.login(TestData.validUser.username, TestData.validUser.password); 
        // Verify user is redirected to inventory page after successful login
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 
    });

    // Negative test: login attempt with empty username
    test('Login validation - empty username', async () => {
        // Attempt login with empty username and valid password
        await loginPage.login('', TestData.validUser.password);
        // Verify correct validation error message is displayed
        await loginPage.verifyErrorMessage('Epic sadface: Username is required');
    });
    // Negative test: login attempt with empty password
    test('Login validation - empty password', async () => {
        // Attempt login with valid username and empty password
        await loginPage.login(TestData.validUser.username,''); 
        // Verify correct validation error message is displayed
        await loginPage.verifyErrorMessage('Epic sadface: Password is required');
    });

    // Negative test: login attempt with both fields empty
    test('Login validation - empty username and password', async () => {
        // Attempt login without providing any credentials
        await loginPage.login('','');
        // Verify username required message appears (application prioritizes username validation)
        await loginPage.verifyErrorMessage('Epic sadface: Username is required');
    });
    // Negative test: invalid username with valid password
    test('Login validation - invalid username', async () => {
        // Attempt login with incorrect username and valid password
        await loginPage.login(TestData.invalidUser.username, TestData.validUser.password);
        // Verify generic authentication failure message is displayed
        await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });

    // Negative test: valid username with invalid password
    test('Login validation - invalid password', async () => {
        // Attempt login with correct username and incorrect password
        await loginPage.login(TestData.validUser.username, TestData.invalidUser.password);
        // Verify generic authentication failure message is displayed
        await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });

    // Negative test: both username and password invalid
    test('Login validation - invalid username and password', async () => {
        // Attempt login with completely invalid credentials
        await loginPage.login(TestData.invalidUser.username, TestData.invalidUser.password);
        // Verify generic authentication failure message is displayed
        await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });
});