/*
// paso 5 compra

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').press('CapsLock');
  await page.locator('[data-test="firstName"]').fill('B');
  await page.locator('[data-test="firstName"]').press('CapsLock');
  await page.locator('[data-test="firstName"]').fill('Bruce');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').press('CapsLock');
  await page.locator('[data-test="lastName"]').fill('W');
  await page.locator('[data-test="lastName"]').press('CapsLock');
  await page.locator('[data-test="lastName"]').fill('Willis');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('67798');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="complete-header"]')).toBeVisible();

});

*/

// Refactorized y añadiendo los pages inventoryPage, cartPage y checkoutPage

import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

/*
test('completar una compra de principio a fin', async () => {

    
await test.step('Agregar productos al carrito', async () => {
await inventoryPage.agregarAlCarrito('Sauce Labs Backpack');
await inventoryPage.agregarAlCarrito('Sauce Labs Bike Light');
});
await test.step('Ir al carrito y comenzar el checkout', async () => {
await inventoryPage.irAlCarrito();
await cartPage.irACheckout();
});
await test.step('Completar los datos del comprador', async () => {
await checkoutPage.completarDatos('Bruce', 'Willis', '00000');
});
await test.step('Revisar el resumen y finalizar', async () => {
await expect(checkoutPage.resumenTotal).toBeVisible();
await checkoutPage.finalizarCompra();
});
await test.step('Verificar la confirmación', async () => {
await expect(checkoutPage.mensajeConfirmacion).toBeVisible();
});
});

*/

test('completar una compra de principio a fin', async ({ page }) => {
  // 1. Instanciar dentro del test (aquí sí existe 'page')
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 2. Navegar e Iniciar sesión
  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');

  // 3. Pasos del test
  await test.step('Agregar productos al carrito', async () => {
    await inventoryPage.agregarAlCarrito('Sauce Labs Backpack');
    await inventoryPage.agregarAlCarrito('Sauce Labs Bike Light');
  });

  await test.step('Ir al carrito y comenzar el checkout', async () => {
    await inventoryPage.irAlCarrito();
    await cartPage.irACheckout();
  });

  await test.step('Completar los datos del comprador', async () => {
    await checkoutPage.completarDatos('Bruce', 'Willis', '00000');
  });

  await test.step('Revisar el resumen y finalizar', async () => {
    await expect(checkoutPage.resumenTotal).toBeVisible();
    await checkoutPage.finalizarCompra();
  });

  await test.step('Verificar la confirmación', async () => {
    await expect(checkoutPage.mensajeConfirmacion).toBeVisible();
  });
});