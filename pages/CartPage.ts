import { expect } from 'playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    private checkoutButton = this.page.locator('button:has-text("Check Out")');
    private totalAmount = this.page.locator('text=Total');

    async goToCart() {
        await this.page.click('a[href="/cart"]');
    }

    async verifyTotalAmount(expectedTotal: string) {
        await expect(this.totalAmount).toContainText(expectedTotal);
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}