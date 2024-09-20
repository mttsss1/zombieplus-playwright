const { expect } = require('@playwright/test')

export class Login {

    constructor(page) {

        this.page = page

    }

    async goToLogin() {

        await this.page.goto('/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()

    }

    async submitForm(email, password) {

        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.getByText('Entrar').click()

    }

    async alertsOnInputs(text) {

        await expect(this.page.locator('.alert')).toHaveText(text)

    }

    async isLoggedIn(username) {

        await expect(this.page.locator('.logged-user')).toHaveText(`Olá, ${username}`)

    }

    async do(email, password, username) {

        await this.goToLogin()
        await this.submitForm(email, password)
        await this.isLoggedIn(username)

    }

}
