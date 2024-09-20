import { API } from './api'

const { test: base } = require('@playwright/test')

const { Leads } = require('./actions/Leads')
const { Login } = require('./actions/Login')
const { Popup } = require('./actions/Components')
const { Movies } = require('./actions/Movies')
const { Tvshows } = require('./actions/Tvshows')


const test = base.extend({
    page: async ({ page }, use) => {

        const context = page

        context['leads'] = new Leads(page)
        context['login'] = new Login(page)
        context['movies'] = new Movies(page)
        context['popup'] = new Popup(page)
        context['tvshows'] = new Tvshows(page)

        await use(context)

    },


    request: async ({ request }, use) => {

        const context = request

        context['api'] = new API(request)

        await context['api'].setToken()

        await use(context)

    }

})

export { test }