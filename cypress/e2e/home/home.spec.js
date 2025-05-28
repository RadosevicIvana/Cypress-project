const homePage = require('../../pages/homePage');

describe('Home Page tests', () => {
  beforeEach(() => {
    cy.session('api-login', () => {
      cy.loginViaAPI(); // koristi tvoju custom komandu iz commands.js
    });
    cy.visit(Cypress.env('productionHomePage'));
  });

  it('Posts are present on the Home page', () => {
    homePage.assertPostsFeedAreVisible();
  });
});
