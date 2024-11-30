import { BasePage } from './BasePage';

export class PasswordPage extends BasePage {
    private passwordInput = this.page.locator('input[type="password"]');
    private submitButton = this.page.locator('button[type="submit"]');

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

}