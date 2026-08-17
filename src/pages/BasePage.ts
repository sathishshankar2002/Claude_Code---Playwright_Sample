import { Page, Locator, expect } from '@playwright/test';

/**
 * Base class for all Page Objects. Holds the Playwright `page` and common
 * helpers so individual pages stay focused on their own locators/actions.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(url: string): Promise<void> {
    // The target instance occasionally has slow first responses; retry once
    // on a navigation timeout so a transient network blip doesn't fail the test.
    try {
      await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
    } catch {
      await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
    }
  }

  async takeScreenshot(path: string): Promise<Buffer> {
    return this.page.screenshot({ path, fullPage: true });
  }

  async currentUrl(): Promise<string> {
    return this.page.url();
  }

  /** Locator for a left side-panel main menu item by its visible name. */
  sideMenuItem(name: string): Locator {
    return this.page.locator('.oxd-main-menu-item', { hasText: name });
  }

  /**
   * Click a left side-panel main menu item by its visible name
   * (e.g. "Admin", "PIM", "Directory"). The menu is present on every page.
   */
  async clickSideMenu(name: string): Promise<void> {
    await this.sideMenuItem(name).click();
  }

  /** Assert a left side-panel main menu item is visible. */
  async assertSideMenuVisible(name: string): Promise<void> {
    await expect(this.sideMenuItem(name)).toBeVisible();
  }

  /** Whether a left side-panel main menu item is currently visible. */
  async isSideMenuVisible(name: string): Promise<boolean> {
    return this.sideMenuItem(name).isVisible();
  }
}
