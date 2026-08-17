import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the OrangeHRM Directory module.
 * Lets a user search the employee directory and read the resulting cards.
 */
export class DirectoryPage extends BasePage {
  private readonly searchButton: Locator;
  private readonly employeeCards: Locator;
  private readonly recordsFound: Locator;

  constructor(page: Page) {
    super(page);
    this.searchButton = page.locator('button[type="submit"]', { hasText: 'Search' });
    this.employeeCards = page.locator('.orangehrm-directory-card');
    this.recordsFound = page.locator('.oxd-text', { hasText: 'Records Found' });
  }

  /** Wait until the Directory page is loaded and the search form is ready. */
  async waitUntilLoaded(): Promise<void> {
    await this.page.waitForURL('**/directory/viewDirectory');
    await expect(this.searchButton).toBeVisible();
  }

  /** Click the Search button (with no filters entered, returns all employees). */
  async clickSearch(): Promise<void> {
    await this.searchButton.click();
  }

  /** Number of employee cards currently rendered on the page. */
  async getEmployeeCardCount(): Promise<number> {
    await expect(this.employeeCards.first()).toBeVisible();
    return this.employeeCards.count();
  }

  /** The "(N) Records Found" header text shown above the results. */
  async getRecordsFoundText(): Promise<string> {
    return (await this.recordsFound.innerText()).trim();
  }

  /** Capture a screenshot of the directory results to the given path. */
  async captureScreenshot(path: string): Promise<Buffer> {
    return this.takeScreenshot(path);
  }
}
