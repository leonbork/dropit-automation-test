import { test } from '@playwright/test';
import { PasswordPage } from '../pages/PasswordPage';
import { CatalogPage } from '../pages/CatalogPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { testData } from '../utils/TestData';

test.describe('UI Testing for Dropit Store', () => {
    test('Positive Test Scenario', async ({ page }) => {
        const passwordPage = new PasswordPage(page);
        const catalogPage = new CatalogPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await passwordPage.navigateTo(testData.baseUrl);
        await passwordPage.enterPassword(testData.password);

        await catalogPage.searchProduct('Dropit Hamburger (QA Automation)');
        await catalogPage.addProductToCart('Medium', 2);
        await catalogPage.addProductToCart('So large you can’t eat it', 1);

        await catalogPage.searchProduct('Dropit Chips (QA Automation)');
        await catalogPage.addProductToCart('Large', 2);
        await catalogPage.addProductToCart('Too much for you to handle', 1);

        await catalogPage.verifyCartBadge('6');

        await cartPage.goToCart();
        await cartPage.verifyTotalAmount(testData.checkoutTotal);
        await cartPage.proceedToCheckout();

        await checkoutPage.fillCheckoutForm(
            testData.validCardDetails.email,
            testData.validCardDetails.cardNumber,
            testData.validCardDetails.expiry,
            testData.validCardDetails.cvv,
            testData.validCardDetails.name
        );
        await checkoutPage.payNow();
        await checkoutPage.verifyOrderConfirmation();
    });

    test('Negative Test Scenario', async ({ page }) => {
        const passwordPage = new PasswordPage(page);
        const catalogPage = new CatalogPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await passwordPage.navigateTo(testData.baseUrl);
        await passwordPage.enterPassword(testData.password);
    

        await catalogPage.searchProduct('Dropit Hamburger (QA Automation)');
        await catalogPage.addProductToCart('Medium', 1);

        await catalogPage.searchProduct('Dropit Chips (QA Automation)');
        await catalogPage.addProductToCart('Large', 1);

        await catalogPage.verifyCartBadge('2');

        await cartPage.goToCart();
        await cartPage.proceedToCheckout();

        await checkoutPage.fillCheckoutForm(
            testData.invalidCardDetails.email,
            testData.invalidCardDetails.cardNumber,
            testData.validCardDetails.expiry,
            testData.validCardDetails.cvv,
            testData.validCardDetails.name
        );
        await checkoutPage.verifyErrorMessages();
    });
});