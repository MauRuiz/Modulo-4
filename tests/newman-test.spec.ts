import { test, expect } from '@playwright/test';
import { correrNewman } from '../pages/NewmanRunner';

test('correr la colección de Postman', async () => {
const resumen = await correrNewman('01 - Fundamentos');
const cuantasFallaron = resumen.run.stats.assertions.failed;
expect(cuantasFallaron).toBe(0);
});



//Correr la prueba y generar los datos npx playwright test tests/newman-test.spec.ts --reporter=allure-playwright
//Compilar / Generar la carpeta del reporte  npx allure generate allure-results --clean -o allure-report
// Abrir el reporte npx allure open allure-report
// Compilar y ejecutar npx allure serve allure-results