const loginPage = require('../../pages/loginPage');

describe('Login Page Tests', () => {
  // Pre svakog testa otvaramo login stranicu
  beforeEach(() => {
    loginPage.visit();
  });

  it('Logo, Email, Password and Confirm button are displayed.', () => {
    loginPage.assertLoginElementsVisible();
  });

  it('When fields are empty, mandatory warning messages are displayed.', () => {
    loginPage.clickConfirmButton();            
    loginPage.assertMandatoryLoginFields();   
  });
});