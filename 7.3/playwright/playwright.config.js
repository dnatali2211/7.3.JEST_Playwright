// playwright.config.js
const { chromium, firefox, webkit } = require('playwright');

module.exports = {
    projects: [
      {
        name: 'chromium',
        use: { ...chromium, channel: 'chrome' },
        retries: 1,
        webServer: { enable: true },
        screenshotOnFailure: true,
        verbose: true,
      },
      {
        name: 'firefox',
        use: { ...firefox, channel: 'firefox' },
        retries: 1,
        webServer: { enable: true },
        screenshotOnFailure: true,
        verbose: true,
      },
      {
        name: 'webkit',
        use: { ...webkit, channel: 'webkit' },
        retries: 1,
        webServer: { enable: true },
        screenshotOnFailure: true,
        verbose: true,
      },
    ],
  };
  