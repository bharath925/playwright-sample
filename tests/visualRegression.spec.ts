import { test, expect } from "@playwright/test";
import afterAll from "@playwright/test";
import { LandingPage } from "../pages/landingPage";
import * as fs from "fs";
import * as path from "path";
import { baseUrl } from "../config";

test("Visual Test for Light and Dark Theme", async ({ page }) => {
  const landingPage = new LandingPage(page);

  // Generate a timestamp for the filename
  const timestamp = generateTimestamp();

  // Navigate to the URL
  await page.goto(baseUrl);

  // Capture screenshot in light theme
  const lightThemeImage = await page.screenshot({
    path: `screenshots/light_theme${timestamp}.png`,
  });

  // Switch to dark theme
  await landingPage.changeTheme();

  // Capture screenshot in dark theme
  const darkThemeImage = await page.screenshot({
    path: `screenshots/dark_theme${timestamp}.png`,
  });

  // Verify screenshots for visual differences
  expect(lightThemeImage).toMatchSnapshot({ name: "light_theme" });
  expect(darkThemeImage).toMatchSnapshot({ name: "dark_theme" });
});

// Before all tests have run, delete files from the "screenshots" directory
test.beforeAll(async () => {
  const screenshotsDirectory = path.join(process.cwd(), "screenshots");
  deleteFilesInDirectory(screenshotsDirectory);
});

function generateTimestamp() {
  const timestamp = new Date().toISOString().replace(/:/g, "-");
  return timestamp;
}

function deleteFilesInDirectory(directory: string): void {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${filePath}: ${err}`);
        } else {
          console.log(`Deleted file: ${filePath}`);
        }
      });
    });
  });
}
