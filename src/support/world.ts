import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';

/**
 * Custom Cucumber World. One instance is created per scenario and shared across
 * all steps in that scenario, so the Playwright context/page live here.
 */
export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  // Scenario-scoped state used by conditional steps.
  isAdmin?: boolean;
  loggedInUser?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
