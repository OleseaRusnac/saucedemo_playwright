// Centralized test data used across the automation framework
export const TestData = {
    // Valid user credentials for positive login scenarios
    validUser: {
        username: 'standard_user', // Correct username provided by the application
        password: 'secret_sauce' // Correct password for successful authentication
    },

    // Invalid user credentials for negative login scenarios
    invalidUser: {
        username: 'standarduser',  // Incorrect username (missing underscore)
        password: 'secretsauce' // Incorrect password (missing underscore)
    },

    // Checkout form test data used for completing orders
    checkoutDetails: {
        firstName: 'Dummy', // Sample first name for checkout form
        lastName: 'Test', // Sample last name for checkout form
        postalCode: '123' // Sample postal/ZIP code
    }
};