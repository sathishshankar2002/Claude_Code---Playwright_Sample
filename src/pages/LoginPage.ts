import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the OrangeHRM login screen.
 * All locators and login actions live here; steps only call these methods.
 */
export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorAlert = page.locator('.oxd-alert-content-text');
  }

  /** Navigate to the login page and wait for the form to be ready. */
  async open(baseUrl: string): Promise<void> {
    await this.goto(`${baseUrl}/web/index.php/auth/login`);
    await expect(this.usernameInput).toBeVisible();
  }

  /** Fill the credentials and submit the login form. */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Returns the visible error message (e.g. "Invalid credentials"), if any. */
  async getErrorMessage(): Promise<string> {
    await expect(this.errorAlert).toBeVisible();
    return (await this.errorAlert.innerText()).trim();
  }
}
