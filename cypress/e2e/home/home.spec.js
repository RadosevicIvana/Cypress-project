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
    it("User can like and unlike the first visible post and like is visible", () => {
      homePage.assertUserCanLikePost();
      homePage.assertUserCanUnlikePost();
    });
  });

  describe("Home Page - Comment option", () => {
    it("Comment modal window is displayed", () => {
      homePage.clickCommentBtn();
      homePage.assertCommentModalWndwVisible();
    });

    it("User can comment post, entered comment is saved, user can delete comment", () => {
      homePage.assertUserCanCommentPost();
      homePage.assertUserCanDeleteComment();
    });

    it("User can close the Comment modal window ", () => {
      homePage.clickCommentBtn();
      homePage.assertUserCanCloseCommentModal();
    });
  });
  describe("Home Page - create post option", () => {
    it("Create post option contains expected elements", () => {
      homePage.assertCreatePostSectionVisible();
    });
    it("User can't post only text", () => {
      homePage.assertUserCanNotPostTextOnly(homePage.postText);
    });
    it.only("User can click on Recording button", () => {
      homePage.assertUserCanRecordStopVideo();
    });
  });
});
