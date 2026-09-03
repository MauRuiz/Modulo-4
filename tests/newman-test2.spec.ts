//Sin Steps
/*
test('correr Newman y hacer login', async ({ page }) => {
const resumen = await correrNewman('01 - Fundamentos');
expect(resumen.run.stats.assertions.failed).toBe(0);
const loginPage = new LoginPage(page);
await loginPage.ir();
await loginPage.login(USUARIOS.estandar, PASSWORD);
});
*/

//Con steps

import * as allure from 'allure-js-commons';

test('correr Newman y hacer login', async ({ page }) => {
const resumen = await allure.step('Correr la colección de Postman', () =>
correrNewman('01 - Fundamentos')
);

expect(resumen.run.stats.assertions.failed).toBe(0);
await allure.step('Hacer login en SauceDemo', async () => {
const loginPage = new LoginPage(page);
await loginPage.ir();
await loginPage.login(USUARIOS.estandar, PASSWORD);
});

});

//Correr la prueba y generar los datos npx playwright test tests/newman-test2.spec.ts --reporter=allure-playwright
//Compilar / Generar la carpeta del reporte  npx allure generate allure-results --clean -o allure-report
// Abrir el reporte npx allure open allure-report
// Compilar y ejecutar npx allure serve allure-results