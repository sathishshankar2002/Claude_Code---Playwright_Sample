import { Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { DashboardPage } from '../pages/DashboardPage';

/**
 * Cross-cutting steps reusable across features:
 *  - capturing a named screenshot
 *  - asserting a left-menu item is visible
 */

Then('I capture the page screenshot as {string}', async function (this: CustomWorld, name: string) {
  const buffer = await this.page.screenshot({
    path: `reports/screenshots/${name}.png`,
    fullPage: true
  });
  this.attach(buffer, 'image/png');
});

Then('the {string} menu item should be visible', async function (this: CustomWorld, menuName: string) {
  const shell = new DashboardPage(this.page);
  await shell.assertSideMenuVisible(menuName);
});
