
// EJERCICIOS: TU TURNO DE GRABAR

import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Ejercicios de grabación', () => {

  // ------------------------------------------------------------
  // EJERCICIO 1
  // ------------------------------------------------------------
  test('ejercicio 1: agregar y quitar un producto desde el carrito', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    await page.getByTestId('add-to-cart-sauce-labs-onesie').click();
    await page.getByTestId('shopping-cart-link').click();
    await page.getByTestId('remove-sauce-labs-onesie').click();

    // Aserción: El contador del carrito desaparece (quedó en 0)
    await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();
  });

  // ------------------------------------------------------------
  // EJERCICIO 2
  // ------------------------------------------------------------
  test('ejercicio 2: validar mensaje de error con usuario bloqueado', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByTestId('username').fill('locked_out_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('error')).toBeVisible();
  });

  // ------------------------------------------------------------
  // EJERCICIO 3
  // ------------------------------------------------------------
  test('ejercicio 3: ordenar por precio de mayor a menor', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await page.goto('https://www.saucedemo.com/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    await page.getByTestId('product-sort-container').selectOption('hilo');

    const precios = await inventoryPage.obtenerPrecios();
    expect(precios[0]).toBe(49.99);
  });

  // ------------------------------------------------------------
  // EJERCICIO 4
  // ------------------------------------------------------------
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

    await expect(page).toHaveURL(/.*inventory.html/);
  });

  // ------------------------------------------------------------
  // EJERCICIO 5 (desafío)
  // ------------------------------------------------------------
  test('ejercicio 5: capturar bug visual con problem_user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByTestId('username').fill('problem_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    await page.screenshot({ path: 'screenshots/problem-user-bug.png', fullPage: true });
  });

});