import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
  setDefaultTimeout
} from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { CustomWorld } from './world';
import { config } from './config';

setDefaultTimeout(config.defaultTimeout);

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: config.headless,
    args: ['--start-maximized']
  });
});

AfterAll(async function () {
  await browser?.close();
});

Before(async function (this: CustomWorld) {
  this.browser = browser;
  // viewport: null lets the page fill the maximized browser window.
  this.context = await browser.newContext({ viewport: null });
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario) {
  // Attach a screenshot to the report whenever a scenario fails.
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  await this.page?.close();
  await this.context?.close();
});
