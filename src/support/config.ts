/**
 * Central test configuration. Values can be overridden with environment variables,
 * which is handy for CI or for pointing tests at a private OrangeHRM instance.
 */
export const config = {
  baseUrl: process.env.BASE_URL || 'https://yakshahrm.makemylabs.in/orangehrm-5.7',
  headless: process.env.HEADLESS === 'true', // default: headed (see the browser locally)
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT) || 60_000,
  credentials: {
    username: process.env.OHRM_USERNAME || 'Admin',
    password: process.env.OHRM_PASSWORD || 'Admin@1234'
  }
};
