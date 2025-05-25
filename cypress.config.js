const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_ProductionUrl,
    specPattern: 'cypress/e2e/**/*.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here (ako zatreba kasnije)
    },
  },
  env: {
    ProductionUrl: process.env.CYPRESS_ProductionUrl,
    email: process.env.CYPRESS_email,
    password: process.env.CYPRESS_password,
  }
});
