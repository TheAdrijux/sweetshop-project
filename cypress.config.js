// cypress.config.js (no require needed)
module.exports = {
  e2e: {
    baseUrl: process.env.BASE_URL || "https://sweetshop.netlify.app",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1366,
    viewportHeight: 900,
    defaultCommandTimeout: 8000,
  },
};
