const homePage = require('../../pages/homePage');

describe('Home Page tests', () => {
  beforeEach(() => {
    cy.session('api-login', () => {
      cy.loginViaAPI(); // koristi tvoju custom komandu iz commands.js
    });
    cy.visit(Cypress.env('productionHomePage'));
  });

  it('Posts are present on the Home page', () => {
    homePage.assertPostsArePresent();
  })

  it('All posts contain expected content', () => {
    homePage.assertAllPostsHaveBasicContent();
  });

  it('Like and comment buttons are present in the first visible post', () => {
    homePage.assertLikeAndCommentButtonsArePresentInFirstRealPost();

  });

  it('User can like the first visible post and like is visible', () => {
    homePage.assertUserCanLikeFirstRealPost();
  });

  it('User can unlike the first visible post and like is not visible anymore', () => {
    homePage.assertUserCanUnlikeFirstRealPost(); 
  });

  it('Comment modal window is opened when user click on the comment button on the first visible post', () => {
    homePage.clickCommentOnFirstRealPost();
    homePage.assertCommentsModalIsVisible();
  });


});
