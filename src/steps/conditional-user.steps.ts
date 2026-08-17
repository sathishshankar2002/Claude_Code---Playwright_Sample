import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { DashboardPage } from '../pages/DashboardPage';

When('I check if the logged-in user is an Admin', async function (this: CustomWorld) {
  const dashboard = new DashboardPage(this.page);
  this.loggedInUser = await dashboard.getLoggedInUserName();
  this.isAdmin = await dashboard.isAdminUser();
  console.log(
    `Logged-in user: "${this.loggedInUser}" | Admin privileges: ${this.isAdmin ? 'YES' : 'NO'}`
  );
});

Then('access should be validated based on the user\'s role', async function (this: CustomWorld) {
  const dashboard = new DashboardPage(this.page);

  if (this.isAdmin) {
    // Admin path: admin-only modules must be available.
    console.log(`"${this.loggedInUser}" is an Admin — verifying admin modules are available.`);
    await dashboard.assertSideMenuVisible('Admin');
    await dashboard.assertSideMenuVisible('PIM');
  } else {
    // Non-admin path: the Admin module must NOT be present.
    console.log(`"${this.loggedInUser}" is NOT an Admin — verifying the Admin module is hidden.`);
    await expect(dashboard.sideMenuItem('Admin')).toBeHidden();
  }
});
