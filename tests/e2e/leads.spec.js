const { test } = require("../support/index");
const { faker } = require("@faker-js/faker")

const leadName = faker.person.fullName()
const leadEmail = faker.internet.email()

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {

    await page.landing.goToApp();
    await page.landing.openLeadModal();
    await page.landing.submitLeadForm(leadName, leadEmail);
    await page.toast.haveText("Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!");

});

test("Deve tentar cadastrar um lead com e-mail já registrado", async ({ page }) => {

    await page.landing.goToApp();
    await page.landing.openLeadModal();
    await page.landing.submitLeadForm(leadName, leadEmail);

    await page.landing.goToApp();
    await page.landing.openLeadModal();
    await page.landing.submitLeadForm(leadName, leadEmail);
    await page.toast.haveText("O endereço de e-mail fornecido já está registrado em nossa fila de espera.");

});

test("Deve tentar cadastrar um lead sem o e-mail", async ({ page }) => {

    await page.landing.goToApp();
    await page.landing.openLeadModal();
    await page.landing.submitLeadForm(leadName, "");
    await page.landing.alertHaveText("Campo obrigatório");

});

test("Deve tentar cadastrar um lead sem o nome completo", async ({ page }) => {

    await page.landing.goToApp();
    await page.landing.openLeadModal();
    await page.landing.submitLeadForm("", leadEmail);
    await page.landing.alertHaveText("Campo obrigatório");

});

test("Deve tentar cadastrar um lead sem o nome completo e sem o e-mail", async ({ page }) => {

    await page.landing.goToApp();
    await page.landing.openLeadModal();
    await page.landing.submitLeadForm("", "");
    await page.landing.alertHaveText(
        ["Campo obrigatório", "Campo obrigatório"]);

});

test("Deve tentar cadastrar um lead com e-mail inválido", async ({ page }) => {

    await page.landing.goToApp();
    await page.landing.openLeadModal();
    await page.landing.submitLeadForm(leadName, leadName);
    await page.landing.alertHaveText("Email incorreto");

});
