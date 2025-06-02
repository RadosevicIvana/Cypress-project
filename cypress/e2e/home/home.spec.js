const homePage = require("../../pages/homePage");

describe("Home Page", () => {
  beforeEach(() => {
    cy.session("api-login", () => {
      cy.loginViaAPI(); // using custom commande from commands.js
    });
    cy.visit(Cypress.env("productionHomePage"));
  });

  describe("Home Page - content", () => {
    it("Posts are present on the Home page", () => {
      homePage.assertPostsArePresent();
    });

    it("All posts contain expected content", () => {
      homePage.assertAllPostsHaveExpectedContent();
    });

    it("Like and comment buttons are present in the first visible post", () => {
      homePage.assertLikeAndCommentBtnsPresentInPost();
    });
  });

  describe("Home Page - Like option", () => {
    it("User can like the first visible post and like is visible", () => {
      homePage.assertUserCanLikePost();
    });

    it("User can unlike the first visible post and like is not visible anymore", () => {
      homePage.assertUserCanUnlikePost();
    });
  });

  describe("Home Page - Comment option", () => {
    it("Comment modal window is displayed", () => {
      homePage.clickCommentBtn();
      homePage.assertCommentModalWndwVisible();
    });

    it("User can comment post and entered comment is saved", () => {
      homePage.assertUserCanCommentPost();
    });

    it("User can delete the comment", () => {
      homePage.clickCommentBtn();
      homePage.assertUserCanDeleteComment();
    });

    it("User can close the Comment modal window ", () => {
      homePage.clickCommentBtn();
      homePage.assertUserCanCloseCommentModal();
    });
  });
});
