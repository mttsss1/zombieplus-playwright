const { expect } = require("@playwright/test");

export class Toast {

    constructor(page) {

        this.page = page

    }

    async haveText(message) {

        await expect(this.page.locator(".toast")).toHaveText(message);
        await expect(this.page.locator(".toast")).not.toBeVisible({ timeout: 5000 });

    }

    async containText(message) {

        await expect(this.page.locator(".toast")).toContainText(message);
        await expect(this.page.locator(".toast")).not.toBeVisible({ timeout: 5000 });

    }

}