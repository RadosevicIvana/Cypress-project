class HomePage {
  commentText = "New comment text added here";
  postText = "Final test that evrything is working";

  getAllPosts() {
    return cy.get(".home__main__feed__post.card").not(":first"); //first post is skipped
  }

  getPostImage(post) {
    return post.find("img#author-avatar");
  }

  getPostUserName(post) {
    return post.find(".user-details__username");
  }

  getPostFullName(post) {
    return post.find(".user-details__fullName");
  }
  getPostTimestamp(post) {
    return post.find(".post__informations__timePosted");
  }
  getLikeCommentsSection(post) {
    return post.find(".post__actions");
  }

  getLikeBtn(post) {
    return post
      .find('button[aria-label="Post action button"]')
      .has('svg[data-icon="heart"]');
  }

  getCommentBtn(post) {
    return post
      .find('button[aria-label="Post action button"]')
      .has('svg[data-icon="comment"]');
  }

  getCommentsModalWndw() {
    return cy.get(".commentsModal__header.modal-header");
  }

  getCommentInputField() {
    return cy.get('input[placeholder="Write a comment"]');
  }

  getCommentSubmitBtn() {
    return cy.get("button#createInputSubmitBtn");
  }

  getNewCommentPost() {
    return cy.get(".post__comments");
  }

  getNewestCommentTxt() {
    return cy.get(".post__description.post__description--modal").last();
  }
  getCommentDeleteBtn(commentText) {
    return cy
      .get(".post__comments__list__comment") // take all comments
      .contains(".post__description--modal", commentText) // finding the one with the value from commentText
      .parents(".post__comments__list__comment") // making sure that we are on the parent
      .find("button.post__deleteBtn") // find the button
      .first(); // fallback, making sure that first delete button is clicked
  }

  getCloseModalBtn() {
    return cy.get(
      '.commentsModal__header.modal-header button.btn-close[aria-label="Close"]'
    );
  }

  getCreatePostSection() {
    return cy.get('input[placeholder="What\'s happening"]').parents(".card");
  }
  getProfileImage(parent = cy) {
    return parent.get('img[aria-label="User Profile Image"]');
  }

  getPostInputField(parent = cy) {
    return parent.get("input.form-control");
  }

  getRecordingBtn(parent = cy) {
    return parent.get("#startRecordingButton");
  }

  getSubmitPostBtn(parent = cy) {
    return parent.get("#submitPostBtn");
  }

  getDeleteRecordingBtn(parent = cy) {
    return parent.get("button.btn-danger");
  }

  getStopRecordingBtn(parent = cy) {
    return parent.get("#stopRecordingButton");
  }

  getPauseRecordingBtn(parent = cy) {
    return parent.get("#pauseRecordingButton");
  }

  getFirstPost() {
    return cy.get(".home__main__feed__post.card").eq(1);
  }

  clickLikeOnFirstRealPost() {
    this.getAllPosts()
      .eq(0)
      .then(($post) => {
        const likeBtn = this.getLikeBtn($post);
        cy.wrap(likeBtn).scrollIntoView().click();
      });
  }

  clickCommentBtn() {
    this.getAllPosts()
      .eq(0)
      .then(($post) => {
        const commentBtn = this.getCommentBtn($post);
        cy.wrap(commentBtn).scrollIntoView().click();
      });
  }

  clickRecordBtn() {
    this.getCreatePostSection().within(() => {
      this.getRecordingBtn(cy).should("be.visible").click();
    });
  }
  clickStopRecordingBtn() {
    this.getCreatePostSection().within(() => {
      this.getStopRecordingBtn(cy)
        .scrollIntoView()
        .should("be.visible")
        .click();
    });
  }

  clickStartStopRecording() {
    this.getRecordingBtn().should("be.visible").click();
    cy.wait(2000);
    this.getStopRecordingBtn().scrollIntoView().should("be.visible").click();
  }

  assertPostsArePresent() {
    this.getAllPosts().should("have.length.at.least", 1);
  }

  assertAllPostsHaveExpectedContent() {
    this.getAllPosts().each(($post) => {
      cy.wrap($post).within(() => {
        cy.wrap(this.getPostImage($post)).scrollIntoView().should("be.visible");
        cy.wrap(this.getPostUserName($post))
          .scrollIntoView()
          .should("be.visible");
        cy.wrap(this.getPostFullName($post))
          .scrollIntoView()
          .should("be.visible");
        cy.wrap(this.getPostTimestamp($post))
          .scrollIntoView()
          .should("be.visible");
        cy.wrap(this.getLikeCommentsSection($post))
          .scrollIntoView()
          .should("be.visible");
      });
    });
  }

  assertLikeAndCommentBtnsPresentInPost() {
    this.getAllPosts()
      .eq(0)
      .then(($post) => {
        const likeBtn = this.getLikeBtn($post);
        const commentBtn = this.getCommentBtn($post);
        cy.wrap(likeBtn).scrollIntoView().should("exist").and("be.visible");

        cy.wrap(commentBtn).scrollIntoView().should("exist").and("be.visible");
      });
  }

  assertUserCanLikePost() {
    this.getAllPosts()
      .eq(0)
      .then(($post) => {
        const likeBtn = this.getLikeBtn($post);

        cy.wrap(likeBtn).scrollIntoView().should("have.class", "btn-tertiary");

        cy.wrap(likeBtn).click();

        cy.wrap(likeBtn).should("have.class", "btn-primary");
      });
  }

  assertUserCanUnlikePost() {
    this.getAllPosts()
      .eq(0)
      .then(($post) => {
        const likeBtn = this.getLikeBtn($post);

        cy.wrap(likeBtn).scrollIntoView().should("have.class", "btn-primary");

        cy.wrap(likeBtn).click();

        cy.wrap(likeBtn).should("have.class", "btn-tertiary");
      });
  }

  assertCommentModalWndwVisible() {
    this.getCommentsModalWndw().should("exist").and("be.visible");
  }

  assertUserCanCommentPost() {
    this.clickCommentBtn();
    this.getCommentInputField()
      .should("exist")
      .and("be.visible")
      .type(this.commentText);

    this.getCommentSubmitBtn().should("exist").and("be.visible").click();

    this.getNewCommentPost().should("exist").and("be.visible");

    this.getNewestCommentTxt()
      .should("be.visible")
      .and("have.text", this.commentText);
  }
  assertUserCanDeleteComment() {
    this.getCommentDeleteBtn(this.commentText).should("be.visible").click();

    cy.contains(
      ".post__description.post__description--modal",
      this.commentText
    ).should("not.exist");
  }

  assertUserCanCloseCommentModal() {
    this.getCommentsModalWndw().should("exist").and("be.visible");

    this.getCloseModalBtn().should("be.visible").click();

    this.getCommentsModalWndw().should("not.exist");
  }
  assertCreatePostSectionVisible() {
    this.getCreatePostSection()
      .should("be.visible")
      .within(() => {
        this.getProfileImage(cy).should("be.visible");
        this.getPostInputField(cy).should("be.visible");
        this.getRecordingBtn(cy).should("be.visible");
        this.getSubmitPostBtn(cy).should("be.visible").and("be.disabled");
      });
  }

  assertUserCanNotPostTextOnly(postText) {
    this.getCreatePostSection().within(() => {
      this.getSubmitPostBtn(cy)
        .invoke("attr", "class")
        .then((classBefore) => {
          //saving the button attribute before the test

          this.getPostInputField(cy).click().clear().type(postText); //interact with the text field

          cy.wait(1000);

          this.getSubmitPostBtn(cy)
            .invoke("attr", "class")
            .then((classAfter) => {
              //checking the button sttribute after the text is entered
              if (classAfter !== classBefore) {
                //if they are not same the test will fail
                throw new Error(
                  `Button class changed from "${classBefore}" to "${classAfter}"` //logging error
                );
              }
            });
        });
    });
  }

  assertUserCanCreateRecording() {
    this.getRecordingBtn().should("be.visible");
    this.getRecordingBtn().click();
    this.getRecordingBtn().should("not.exist");
    this.getStopRecordingBtn().should("be.visible");
    this.getDeleteRecordingBtn().should("be.visible");
    this.clickStopRecordingBtn();
    this.getStopRecordingBtn().should("not.exist");
    this.getPauseRecordingBtn().should("be.visible");
  }

  assertUserCanNotPostOnlyRecording() {
    this.getCreatePostSection().within(() => {
      this.getSubmitPostBtn(cy)
        .invoke("attr", "class")

        .then((classBefore) => {
          this.clickStartStopRecording();

          this.getSubmitPostBtn(cy)
            .invoke("attr", "class")
            .then((classAfter) => {
              if (classAfter !== classBefore) {
                throw new Error(
                  `Button class changed from "${classBefore}" to "${classAfter}"`
                );
              }
            });
        });
    });
  }

  assertUserCanDeleteRecording() {
    this.clickStartStopRecording();
    this.getDeleteRecordingBtn().should("be.visible").click();
    this.getDeleteRecordingBtn().should("not.exist");
  }

  assertUserCanPostTextAndRecording(postText) {
    this.clickStartStopRecording();
    this.getPostInputField().should("be.visible").clear().type(postText);
    this.getSubmitPostBtn().should("be.visible").and("not.be.disabled").click();

    this.assertNoErrorOnPage();

    this.getFirstPost().within(() => {
      cy.get(".post__description").should("contain.text", postText);
    });
  }
  assertNoErrorOnPage() {
    cy.document().then((doc) => {
      if (doc.getElementById("_next_error_")) {
        throw new Error("Application error: prikazan je _next_error_ ekran!");
      }
    });
  }
}

module.exports = new HomePage();
