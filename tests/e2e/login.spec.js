const { test } = require("../support/index");

test("Deve logar com o e-mail e senha corretos", async ({ page }) => {

    await page.login.goToLogin();
    await page.login.submitForm("admin@zombieplus.com", "pwd123");
    await page.movies.isLoggedIn();

});

test("Deve tentar logar com a senha incorreta", async ({ page }) => {

    await page.login.goToLogin();
    await page.login.submitForm("admin@zombieplus.com", "tt");
    await page.toast.haveText('Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.')

});

test("Deve tentar logar com o e-mail incorreto", async ({ page }) => {

    await page.login.goToLogin();
    await page.login.submitForm("tt", "pwd123");
    await page.login.alertEmailHaveText('Email incorreto');

});

test("Deve tentar logar sem o e-mail", async ({ page }) => {

    await page.login.goToLogin();
    await page.login.submitForm("", "pwd123");
    await page.login.alertEmailHaveText('Campo obrigatório');

});

test("Deve tentar logar sem a senha", async ({ page }) => {

    await page.login.goToLogin();
    await page.login.submitForm("admin@zombieplus.com", "");
    await page.login.alertPasswordHaveText('Campo obrigatório');

});

test("Deve tentar logar sem a senha e o e-mail", async ({ page }) => {

    await page.login.goToLogin();
    await page.login.submitForm("", "");
    await page.login.alertEmailHaveText('Campo obrigatório');
    await page.login.alertPasswordHaveText('Campo obrigatório');

});