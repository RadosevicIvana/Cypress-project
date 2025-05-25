class LoginPage {
  constructor() {
    this.constellationLogo = '#constellation-logo';
    this.emailField= '#email'; 
    this.passwordField = '#password';
    this.confirmButton = '#loginSubmitBtn';
    this.emailMandatoryMessage = ':nth-child(1) > .invalid-feedback';
    this.passwordMandatoryMessage = ':nth-child(2) > .invalid-feedback';
  }

  // Poseti login stranicu koristeći URL iz .env fajla (kroz cypress.config.js)
  visit() {
    cy.visit(Cypress.env('ProductionUrl'));
  }
   clickConfirmButton() {
    cy.get(this.confirmButton).click();
  }

  // Provera da su svi elementi vidljivi
  assertLoginElementsVisible() {
    cy.get(this.constellationLogo).should('be.visible');
    cy.get(this.emailField).should('be.visible');
    cy.get(this.passwordField).should('be.visible');
    cy.get(this.confirmButton).should('be.visible');
  }
  assertMandatoryLoginFields() {
    cy.get(this.emailMandatoryMessage)
      .should('be.visible')
      .and('have.text', 'Email field is required.');

    cy.get(this.passwordMandatoryMessage)
      .should('be.visible')
      .and('have.text', 'Password field is required.');
  }
}

module.exports = new LoginPage();