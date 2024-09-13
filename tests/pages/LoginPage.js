const { expect } = require("@playwright/test");

export class LoginPage {

    constructor(page) {

        this.page = page;

    }

    async goToLogin() {

        await this.page.goto("http://localhost:3000/admin/login");

        const loginForm = this.page.locator(".login-form");
        await expect(loginForm).toBeVisible();

    }

    async submitForm(email, password) {

        await this.page.getByPlaceholder("E-mail").fill(email);
        await this.page.getByPlaceholder("Senha").fill(password);
        await this.page.getByText("Entrar").click();

    }

    async alertEmailHaveText(text) {

        await expect(this.page.locator('.email-alert')).toHaveText(text)

    }

    async alertPasswordHaveText(text) {

        await expect(this.page.locator('.password-alert')).toHaveText(text)

    }

}
