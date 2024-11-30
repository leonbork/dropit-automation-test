import { expect } from 'playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    private emailField = this.page.locator('input[name="email"]');
    private cardNumberField = this.page.locator('input[name="card_number"]');
    private expiryField = this.page.locator('input[name="expiry_date"]');
    private cvvField = this.page.locator('input[name="security_code"]');
    private nameField = this.page.locator('input[name="name_on_card"]');
    private payNowButton = this.page.locator('button:has-text("Pay now")');
    private confirmationMessage = this.page.locator('text=Order Confirmed');
    private errorMessage = this.page.locator('text=Enter a valid email');

    async fillCheckoutForm(email: string, cardNumber: string, expiry: string, cvv: string, name: string) {
        await this.emailField.fill(email);
        await this.cardNumberField.fill(cardNumber);
        await this.expiryField.fill(expiry);
        await this.cvvField.fill(cvv);
        await this.nameField.fill(name);
    }

    async payNow() {
        await this.payNowButton.click();
    }

    async verifyOrderConfirmation() {
        await expect(this.confirmationMessage).toBeVisible();
    }

    async verifyErrorMessages() {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.page.locator('text=Enter a valid card number')).toBeVisible();
    }
}