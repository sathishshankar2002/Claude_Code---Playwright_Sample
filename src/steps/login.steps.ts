import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { config } from '../support/config';

Given('I am on the OrangeHRM login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open(config.baseUrl);
});

When(
  'I login with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    const loginPage = new LoginPage(this.page);
    await loginPage.login(username, password);
  }
);

Then('I should be logged in successfully', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.waitUntilLoaded();
});

Then('I capture a screenshot of the dashboard', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  const buffer = await dashboardPage.captureScreenshot('reports/screenshots/dashboard.png');
  // Also embed it in the Cucumber HTML report.
  this.attach(buffer, 'image/png');
});

Then(
  'the selected menu on the dashboard should contain {string}',
  async function (this: CustomWorld, expectedMenu: string) {
    const dashboardPage = new DashboardPage(this.page);
    const selectedMenu = await dashboardPage.getSelectedMenuText();
    expect(selectedMenu.toLowerCase()).toContain(expectedMenu.toLowerCase());
  }
);
