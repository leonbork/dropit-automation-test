import { expect } from 'playwright/test';
import { BasePage } from './BasePage';

export class CatalogPage extends BasePage {
    private searchIcon = this.page.locator('//summary[contains(@class, "header__icon--search") and @aria-haspopup="dialog" and @role="button"]');
    private searchInput = this.page.locator('input[type="search"]');
    private addToCartButton = this.page.locator('button:has-text("Add to cart")');
    private cartBadge = this.page.locator('span.cart-badge');

    async searchProduct(productName: string) {
        await this.searchIcon.click;
        await this.searchInput.fill(productName);
        await this.searchInput.press('Enter');
        await this.page.locator(`text=${productName}`).waitFor({ state: 'visible' });
    }

    async addProductToCart(size: string, quantity: number) {
        await this.page.locator(`text=${size}`).click();
        for (let i = 0; i < quantity; i++) {
            await this.addToCartButton.click();
        }
    }

    async verifyCartBadge(expectedCount: string) {
        await expect(this.cartBadge).toHaveText(expectedCount);
    }
}