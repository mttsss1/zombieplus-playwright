const { test } = require('../support/index');

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require("../support/database");

test("Deve cadastrar novo filme", async ({ page }) => {

    const movie = data.create

    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await page.login.goToLogin();
    await page.login.submitForm("admin@zombieplus.com", "pwd123");
    await page.movies.isLoggedIn();

    await page.movies.createMovie(movie.title, movie.overview, movie.company, movie.release_year)

    await page.toast.containText('Cadastro realizado com sucesso')

});