class LoginPage {
  constructor() {
    this.constellationLogo = '#constellation-logo';
    this.emailField = '#email';
    this.passwordField = '#password';
    this.confirmButton = '#loginSubmitBtn';
    this.emailWarningMessage = ':nth-child(1) > .invalid-feedback';
    this.passwordWarningMessage = ':nth-child(2) > .invalid-feedback';
    this.serverError = '.fade';

    this.invalidEmailWarningText = 'Email format is not valid.';
    this.invalidPasswordWarningText = 'Please provide a minimum of 6 characters';
    this.serverErrorMessage = 'An error occurred during login.';
    this.invalidEmail = 'test@';
    this.fakePassword = '123456';
    this.shortPassword = '12345';
    this.expectedUrlAfterLogin = '/home';


  }

  // Poseti login stranicu koristeći URL iz .env fajla (kroz cypress.config.js)
  visit() {
    cy.visit(Cypress.env('ProductionUrl'));
  }
  clickConfirmButton() {
    cy.get(this.confirmButton).click();
  }
  fillEmail(value) {
    cy.get(this.emailField).clear().type(value);
  }
  fillPassword(value) {
    cy.get(this.passwordField).clear().type(value);
  }

  // All elements visible
  assertLoginElementsVisible() {
    cy.get(this.constellationLogo).should('be.visible');
    cy.get(this.emailField).should('be.visible');
    cy.get(this.passwordField).should('be.visible');
    cy.get(this.confirmButton).should('be.visible');
  }

  //Fields are mandatory
  assertMandatoryLoginFields() {
    cy.get(this.emailWarningMessage)
      .should('be.visible')
      .and('have.text', 'Email field is required.');

    cy.get(this.passwordWarningMessage)
      .should('be.visible')
      .and('have.text', 'Password field is required.');
  }
  //Invalid email format check
  assertInvalidEmailFormatMessage() {
    cy.get(this.emailWarningMessage)
      .should('be.visible')
      .and('have.text', this.invalidEmailWarningText);
  }
  assertPasswordLengthValidation() {
    cy.get(this.passwordWarningMessage)
      .should('be.visible')
      .and('have.text', this.invalidPasswordWarningText)
  }
  assertServerErrorMessage() {
    cy.get(this.serverError, { timeout: 5000 })
      .should('be.visible')
      .and('have.text', this.serverErrorMessage)

  }
  assertSuccessfulLogin() {
    cy.url({ timeout: 3000 }).should('include', this.expectedUrlAfterLogin);
  }

}

module.exports = new LoginPage();