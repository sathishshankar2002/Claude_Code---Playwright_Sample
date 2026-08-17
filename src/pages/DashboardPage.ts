import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the OrangeHRM dashboard (landing page after a successful login).
 */
export class DashboardPage extends BasePage {
  private readonly breadcrumbHeader: Locator;
  private readonly userDropdown: Locator;

  constructor(page: Page) {
    super(page);
    // Topbar heading that reflects the currently selected menu, e.g. "Dashboard".
    this.breadcrumbHeader = page.locator('.oxd-topbar-header-breadcrumb h6');
    this.userDropdown = page.locator('.oxd-userdropdown-name');
  }

  /** Wait until the dashboard has fully loaded after login. */
  async waitUntilLoaded(): Promise<void> {
    await this.page.waitForURL('**/dashboard/index');
    await expect(this.userDropdown).toBeVisible();
    await expect(this.breadcrumbHeader).toBeVisible();
  }

  /** Text of the currently selected menu shown in the topbar (e.g. "Dashboard"). */
  async getSelectedMenuText(): Promise<string> {
    return (await this.breadcrumbHeader.innerText()).trim();
  }

  /** The display name of the currently logged-in user (top-right dropdown). */
  async getLoggedInUserName(): Promise<string> {
    await expect(this.userDropdown).toBeVisible();
    return (await this.userDropdown.innerText()).trim();
  }

  /**
   * Whether the logged-in user has Admin privileges. In OrangeHRM the left
   * menu is role-driven, so the presence of the "Admin" module is a reliable
   * signal that the user is an administrator.
   */
  async isAdminUser(): Promise<boolean> {
    return this.isSideMenuVisible('Admin');
  }

  /** Capture a screenshot of the dashboard to the given path. */
  async captureScreenshot(path: string): Promise<Buffer> {
    return this.takeScreenshot(path);
  }
}
