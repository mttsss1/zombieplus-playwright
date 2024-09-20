const { expect } = require('@playwright/test')

export class Popup {

    constructor(page) {

        this.page = page

    }

    async haveText(message) {

        await expect(this.page.locator('.swal2-html-container')).toHaveText(message)

    }

    async havePassedIcon() {

        await expect(this.page.locator('.swal2-success-ring')).toBeVisible()

    }

}