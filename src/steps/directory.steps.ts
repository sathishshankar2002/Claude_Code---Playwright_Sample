import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { DirectoryPage } from '../pages/DirectoryPage';

When('I open the {string} menu', async function (this: CustomWorld, menuName: string) {
  const directoryPage = new DirectoryPage(this.page);
  await directoryPage.clickSideMenu(menuName);
});

When('I click the Search button in the directory', async function (this: CustomWorld) {
  const directoryPage = new DirectoryPage(this.page);
  await directoryPage.waitUntilLoaded();
  await directoryPage.clickSearch();
});

Then('the directory should display employee cards', async function (this: CustomWorld) {
  const directoryPage = new DirectoryPage(this.page);
  const cardCount = await directoryPage.getEmployeeCardCount();
  expect(cardCount).toBeGreaterThan(0);

  // Cross-check against the "(N) Records Found" header.
  const recordsText = await directoryPage.getRecordsFoundText();
  const recordCount = Number(recordsText.replace(/\D/g, ''));
  expect(recordCount).toBeGreaterThan(0);
});

Then('I capture a screenshot of the directory', async function (this: CustomWorld) {
  const directoryPage = new DirectoryPage(this.page);
  const buffer = await directoryPage.captureScreenshot('reports/screenshots/directory.png');
  this.attach(buffer, 'image/png');
});
