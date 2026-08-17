# OrangeHRM UI Automation — Playwright + Cucumber + TypeScript (POM)

BDD UI test automation for the OrangeHRM portal, built with **Playwright**,
**Cucumber (cucumber-js)** and **TypeScript**, following the **Page Object Model**.

## Tech stack

| Concern            | Tool                          |
| ------------------ | ----------------------------- |
| Browser automation | Playwright                    |
| BDD framework      | Cucumber (cucumber-js)        |
| Language           | TypeScript (via ts-node)      |
| Design pattern     | Page Object Model (POM)       |

## Project structure

```
├── cucumber.js                 # Cucumber config (paths, formats, ts-node)
├── tsconfig.json
├── package.json
└── src/
    ├── features/               # Gherkin .feature files
    │   ├── login.feature
    │   ├── directory.feature
    │   ├── admin-menu.feature
    │   └── conditional-user.feature
    ├── pages/                  # Page Objects (locators + actions)
    │   ├── BasePage.ts
    │   ├── LoginPage.ts
    │   ├── DashboardPage.ts
    │   └── DirectoryPage.ts
    ├── steps/                  # Step definitions (thin glue → call POM methods)
    │   ├── login.steps.ts
    │   ├── directory.steps.ts
    │   ├── conditional-user.steps.ts
    │   └── common.steps.ts
    └── support/                # World + hooks + config
        ├── config.ts
        ├── world.ts
        └── hooks.ts
```

**Design principle:** step definitions stay thin — all locators and page
actions live in the Page Object classes.

## Test cases

1. **Login with valid credentials** — log in, screenshot the dashboard, verify the selected menu is "Dashboard".
2. **Search Employee in directory** — Directory → Search → validate employee cards populate, screenshot.
3. **Verify Admin Menu is Visible** — log in, screenshot, assert the "Admin" menu item is visible.
4. **Conditional test based on user** — log in, determine Admin vs non-Admin (by role-driven menu presence), and validate access accordingly.

## Setup

```bash
npm install
npx playwright install chromium
```

## Running the tests

```bash
# All scenarios
npm test

# By tag
npx cucumber-js --tags '@login'
npx cucumber-js --tags '@directory'
npx cucumber-js --tags '@admin'
npx cucumber-js --tags '@conditional'

# Headed (visible browser, maximized window)
npm run test:headed
```

## Configuration

Settings live in `src/support/config.ts` and can be overridden with environment variables:

| Variable         | Default                                              | Purpose                     |
| ---------------- | ---------------------------------------------------- | --------------------------- |
| `BASE_URL`       | `https://yakshahrm.makemylabs.in/orangehrm-5.7`      | Target OrangeHRM instance   |
| `HEADLESS`       | `false` (headed)                                     | Set `true` for headless     |
| `OHRM_USERNAME`  | `Admin`                                              | Login username              |
| `OHRM_PASSWORD`  | `Admin@1234`                                         | Login password              |

## Reports

After a run, reports are generated under `reports/`:

- `reports/cucumber-report.html` — HTML report (with embedded screenshots)
- `reports/cucumber-report.json` — JSON report
- `reports/screenshots/` — captured screenshots

A screenshot is automatically attached to the report for any failing scenario.
