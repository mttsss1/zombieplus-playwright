const { test } = require('../support/index')
const { faker } = require('@faker-js/faker')

const { executeSQL } = require('../support/database')

const leadName = faker.person.fullName()
const leadEmail = faker.internet.email()

test.beforeAll(async () => {

    await executeSQL(`DELETE from leads`)

})

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {

    await page.leads.goToApp()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm(leadName, leadEmail)
    await page.popup.haveText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.')

})

test('Deve tentar cadastrar um lead com e-mail já registrado', async ({ page }) => {

    await page.leads.goToApp()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm(leadName, leadEmail)

    await page.leads.goToApp()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm(leadName, leadEmail)
    await page.popup.haveText('Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.')

})

test('Deve tentar cadastrar um lead sem o e-mail', async ({ page }) => {

    await page.leads.goToApp()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm(leadName, '')
    await page.leads.alertHaveText('Campo obrigatório')

})

test('Deve tentar cadastrar um lead sem o nome completo', async ({ page }) => {

    await page.leads.goToApp()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm('', leadEmail)
    await page.leads.alertHaveText('Campo obrigatório')

})

test('Deve tentar cadastrar um lead sem o nome completo e sem o e-mail', async ({ page }) => {

    await page.leads.goToApp()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm('', '')
    await page.leads.alertHaveText(
        ['Campo obrigatório', 'Campo obrigatório'])

})

test('Deve tentar cadastrar um lead com e-mail inválido', async ({ page }) => {

    await page.leads.goToApp()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm(leadName, leadName)
    await page.leads.alertHaveText('Email incorreto')

})
