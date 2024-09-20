const { test } = require('../support/index')

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

test.beforeAll(async () => {

    await executeSQL(`DELETE from movies`)

})

test('Deve cadastrar um novo filme', async ({ page }) => {

    const movie = data.create

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.createMovie(movie)

    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)

})

test('Deve poder remover um filme', async ({ page, request }) => {

    const movie = data.to_remove

    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.removeMovie(movie.title)

})

test('Deve tentar cadastrar quando o título é duplicado', async ({ page, request }) => {

    const movie = data.duplicate

    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.createMovie(movie)
    await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)

})

test('Deve tentar cadastrar um novo filme quando os dados obrigatórios não forem preenchidos', async ({ page }) => {

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.goForm()
    await page.movies.submitMovieForm()

    await await page.movies.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ])

})

test('Deve realizar busca pelo termo Zumbi', async ({ page, request }) => {

    const movies = data.search

    movies.data.forEach(async (m) => {

        await request.api.postMovie(m)

    })

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.searchMovie(movies.input)

    await page.movies.tableHave(movies.output)

})