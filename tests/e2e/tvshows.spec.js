const { test } = require('../support/index')

const data = require('../support/fixtures/tvshows.json')
const { executeSQL } = require('../support/database')

test.beforeAll(async () => {

    await executeSQL(`DELETE from tvshows`)

})

test('Deve cadastrar uma nova série', async ({ page }) => {

    const tvshow = data.create

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.tvshows.createTvshow(tvshow)

    await page.popup.haveText(`A série '${tvshow.title}' foi adicionada ao catálogo.`)

    await page.popup.havePassedIcon()

})

test('Deve poder remover uma série', async ({ page, request }) => {

    const tvshow = data.to_remove

    await request.api.postTvshow(tvshow)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.tvshows.goToTvshows()

    await page.tvshows.removeTvshow(tvshow.title)

})

test('Deve tentar cadastrar quando o título é duplicado', async ({ page, request }) => {

    const tvshow = data.duplicate

    await request.api.postTvshow(tvshow)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.tvshows.createTvshow(tvshow)

    await page.popup.haveText(`O título '${tvshow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)

})

test('Deve tentar cadastrar uma nova série quando os dados obrigatórios não forem preenchidos', async ({ page }) => {

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.tvshows.goToTvshows()

    await page.tvshows.goForm()
    await page.tvshows.submitTvshowForm()

    await page.tvshows.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'
    ])

})

test('Deve realizar busca pelo termo Zumbi', async ({ page, request }) => {

    const tvshows = data.search

    tvshows.data.forEach(async (ts) => {

        await request.api.postTvshow(ts)

    })

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.tvshows.goToTvshows()

    await page.tvshows.searchTvshow(tvshows.input)

    await page.tvshows.tableHave(tvshows.outputs)

})
