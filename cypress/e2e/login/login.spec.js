const loginPage = require("../../pages/loginPage");

describe("Login Page Tests", () => {
  // Before each test we are visiting the site
  beforeEach(() => {
    loginPage.visit();
  });

  it("Logo, Email, Password and Confirm button are displayed.", () => {
    loginPage.assertLoginElementsVisible();
  });

  it("Warning messages are displayed when fields empty and user can not log in.", () => {
    loginPage.clickConfirmButton();
    loginPage.assertMandatoryLoginFields();
  });

  it("Invalid email format triggers warning message and user can not log in.", () => {
    loginPage.fillEmail(loginPage.invalidEmail);
    loginPage.fillPassword(loginPage.fakePassword);
    loginPage.clickConfirmButton();
    loginPage.assertInvalidEmailFormatMessage();
  });

  it("Password shorter than 6 characters triggers warning message and user can not log in", () => {
    loginPage.fillEmail(Cypress.env("email"));
    loginPage.fillPassword(loginPage.shortPassword);
    loginPage.clickConfirmButton();
    loginPage.assertPasswordLengthValidation();
  });

  it("Server error message present if the user is not registered", () => {
    loginPage.fillEmail(Cypress.env("email"));
    loginPage.fillPassword(loginPage.fakePassword);
    loginPage.clickConfirmButton();
    loginPage.assertServerErrorMessage();
  });

  it("Registered user can successfully log in", () => {
    loginPage.fillEmail(Cypress.env("email"));
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.clickConfirmButton();
    loginPage.assertSuccessfulLogin();
  });
});
