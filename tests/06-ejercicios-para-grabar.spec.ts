// ============================================================
// 06 - EJERCICIOS: TU TURNO DE GRABAR
// Cada test de este archivo está incompleto a propósito.
// Sigue el PASO 7 de LAB.md: lanza `npm run record`, realiza la
// acción descrita, copia el código generado dentro del test y
// agrega al menos una assertion. Luego borra el test.skip().
// ============================================================
import { test, expect } from '@playwright/test';
import { LoginPage, USUARIOS, PASSWORD } from '../pages/LoginPage';

test.describe('Ejercicios de grabación', () => {

  // ------------------------------------------------------------
  // EJERCICIO 1
  // Graba: login con standard_user -> agregar "Sauce Labs Onesie"
  // al carrito -> ir al carrito -> quitarlo con el botón "Remove".
  // Verifica al final que el carrito quedó en 0 productos.
  // ------------------------------------------------------------

import { test, expect } from '@playwright/test';
/* RAW
test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.getByText('$7.99Add to cart').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="remove-sauce-labs-onesie"]').click();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
*/
await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();

  await page.getByTestId('add-to-cart-sauce-labs-onesie').click();
  await page.getByTestId('shopping-cart-link').click();
  await page.getByTestId('remove-sauce-labs-onesie').click();
  // Aserción
  await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();

});

  // ------------------------------------------------------------
  // EJERCICIO 2
  // Graba: intentar loguear con locked_out_user -> capturar el
  // mensaje de error con el botón de "assert" del Inspector.
  // ------------------------------------------------------------
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
/*  RAW
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
*/
await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('locked_out_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('error')).toBeVisible();

});


  // ------------------------------------------------------------
  // EJERCICIO 3
  // Graba: login -> abrir el dropdown "Sort by" -> elegir
  // "Price (high to low)" -> verificar visualmente el primer
  // producto de la lista.
  // Pista: usa inventoryPage.obtenerPrecios() del Paso 6 del lab
  // como inspiración si quieres validarlo con datos, no solo visual.
  // ------------------------------------------------------------
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
/*
test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.getByText('Name (A to Z)Name (A to Z)').click();
  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
  await expect(page.getByText('$49.99')).toBeVisible();

  // Obtener el array de precios numéricos 
  const precios = await inventoryPage.obtenerPrecios();

  // Validacion
  expect(precios[0]).toBe(49.99);
});
*/
// Fixeado

test('ejercicio 3: ordenar por precio con getByTestId', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();

  // Cambiar el selector del dropdown a getByTestId
  await page.getByTestId('product-sort-container').selectOption('hilo');

  const precios = await inventoryPage.obtenerPrecios();
  expect(precios[0]).toBe(49.99);

});

  // ------------------------------------------------------------
  // EJERCICIO 4
  // Graba: login -> agregar 1 producto -> ir a checkout ->
  // completar el formulario -> en la pantalla de resumen, hacer
  // clic en "Cancel" en vez de "Finish".
  // Verifica que termina de nuevo en /inventory.html.
  // ------------------------------------------------------------
import { test, expect } from '@playwright/test';
/*
test('test', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Bart');
  await page.locator('[data-test="lastName"]').fill('Simpson');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="cancel"]').click();
  await expect(page).toHaveURL(/.*inventory.html/);
});
*/

import { test, expect } from '@playwright/test';

test('ejercicio 4: cancelar en resumen redirige a inventario', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('shopping-cart-link').click();
  await page.getByTestId('checkout').click();
  await page.getByTestId('firstName').fill('Bruce');
  await page.getByTestId('lastName').fill('Wayne');
  await page.getByTestId('postalCode').fill('12345');
  await page.getByTestId('continue').click();
  await page.getByTestId('cancel').click();
  // Aserción de inventory.html
  await expect(page).toHaveURL(/.*inventory.html/);
});


  // ------------------------------------------------------------
  // EJERCICIO 5 (desafío)
  // Graba un flujo con problem_user: agrega un producto al
  // carrito e inspecciona visualmente si notas algún bug conocido
  // de este usuario (ej. imágenes rotas). Documenta con un
  // screenshot usando page.screenshot() dentro del test.
  // ------------------------------------------------------------

/*  
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.screenshot({ path: 'screenshots/bug-problem-user.png', fullPage: true });
});
*/

import { test, expect } from '@playwright/test';

test('ejercicio 5: capturar bug visual con problem_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('problem_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  // Captura de pantalla
  await page.screenshot({ path: 'screenshots/problem-user-bug.png', fullPage: true });
});
