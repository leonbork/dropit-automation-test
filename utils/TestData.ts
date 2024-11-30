export const testData = {
    baseUrl: 'https://drpt-external-dev.myshopify.com/password',
    password: 'giclao',
    checkoutTotal: '£56.99',
    validCardDetails: {
        email: 'testuser@example.com',
        cardNumber: '1',
        expiry: '12/26',
        cvv: '777',
        name: 'Bogus Gateway',
    },
    invalidCardDetails: {
        email: 'invalid-email',
        cardNumber: '1234',
    },
};