import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/landingPage';
import { baseUrl } from '../config';
test.skip('Theme Switch Verification', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const lightTheme = "light";
  const darkTheme = "dark";
  
  // Navigate to the URL
  await landingPage.open(baseUrl);

  // Verify initial theme is light
  await verifyTheme(page, lightTheme);

  // Change to dark theme
  await landingPage.changeTheme();
 
  // Verify theme is now dark
  await verifyTheme(page, darkTheme);

  // Return to light mode
  await landingPage.changeTheme();

  // Verify theme is back to light
  await verifyTheme(page, lightTheme);
});

async function verifyTheme(page: any, expectedTheme:string) {
  const actualTheme = await page.locator("//html").getAttribute("data-theme");
  expect(actualTheme).toEqual(expectedTheme);
}