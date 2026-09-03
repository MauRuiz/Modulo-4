//Crudo o raw para los panas
/*
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.getByText('$7.99Add to cart').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="remove-sauce-labs-onesie"]').click();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
});

*/

// refactorizado
/*
import { test, expect } from '@playwright/test';

test('ejercicio 1: agregar y quitar un producto desde el carrito', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  //login 
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  
  // Agregar el onesie al carrito usando su data-test directo
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  
  // Ir al carrito y quitarlo
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="remove-sauce-labs-onesie"]').click();

  // Al no haber productos, el elemento 'shopping-cart-badge' ya no existe en pantalla
  await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
});

*/
/*
import { test, expect } from '@playwright/test';

test('ejercicio 1: agregar y quitar un producto desde el carrito', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Usa los placeholders del HTML
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // Acciones en la tienda
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="remove-sauce-labs-onesie"]').click();

  // Aserción: El contador del carrito no debe existir
  await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
});

*/

// import { test, expect } from '@playwright/test';
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

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
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