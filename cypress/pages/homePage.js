class HomePage {

  commentText = 'New comment text added here';

  getAllPosts() {
    return cy.get('.home__main__feed__post.card').not(':first'); //first post is skipped
  }

  getPostImage(post) {
    return post.find('img#author-avatar');
  }

  getPostUserName(post) {
    return post.find('.user-details__username');
  }

  getPostFullName(post) {
    return post.find('.user-details__fullName');
  }
  getPostTimestamp(post) {
    return post.find('.post__informations__timePosted');
  }
  getLikeCommentsSection(post) {
    return post.find('.post__actions');
  }

  assertPostsArePresent() {
    this.getAllPosts().should('have.length.at.least', 1);
  }

  getLikeBtn(post) {
    return post.find('button[aria-label="Post action button"]').has('svg[data-icon="heart"]');
  }

  getCommentBtn(post) {
    return post.find('button[aria-label="Post action button"]').has('svg[data-icon="comment"]');
  }

  getCommentsModalWndw() {
    return cy.get('.commentsModal__header.modal-header');
  }

  getCommentInputField() {
    return cy.get('input[placeholder="Write a comment"]');
  }

  getCommentSubmitBtn() {
    return cy.get('button#createInputSubmitBtn');
  }

  getNewCommentPost() {
    return cy.get('.post__comments');
  }

  getNewestCommentTxt() {
    return cy.get('.post__description.post__description--modal').last();
  }
  getCommentDeleteBtn(commentText) {
    return cy
      .get('.post__comments__list__comment') // take all comments
      .contains('.post__description--modal', commentText) // finding the one with the value from commentText
      .parents('.post__comments__list__comment') // making sure that we are on the parent 
      .find('button.post__deleteBtn') // find the button
      .first(); // fallback, making sure that first delete button is clicked
  }

  getCloseModalBtn() {
    return cy.get('.commentsModal__header.modal-header button.btn-close[aria-label="Close"]');
  }



  clickLikeOnFirstRealPost() {
    this.getAllPosts().eq(0).then(($post) => {
      const likeBtn = this.getLikeBtn($post);
      cy.wrap(likeBtn)
        .scrollIntoView()
        .click();
    });
  }

  clickCommentBtn() {
    this.getAllPosts().eq(0).then(($post) => {
      const commentBtn = this.getCommentBtn($post);
      cy.wrap(commentBtn)
        .scrollIntoView()
        .click();
    });

  }



  assertAllPostsHaveExpectedContent() {
    this.getAllPosts().each(($post) => {
      cy.wrap($post).within(() => {
        cy.wrap(this.getPostImage($post))
          .scrollIntoView()
          .should('be.visible');
        cy.wrap(this.getPostUserName($post))
          .scrollIntoView()
          .should('be.visible');
        cy.wrap(this.getPostFullName($post))
          .scrollIntoView()
          .should('be.visible');
        cy.wrap(this.getPostTimestamp($post))
          .scrollIntoView()
          .should('be.visible');
        cy.wrap(this.getLikeCommentsSection($post))
          .scrollIntoView()
          .should('be.visible');
      });
    });
  }

  assertLikeAndCommentBtnsPresentInPost() {
    this.getAllPosts().eq(0).then(($post) => {
      const likeBtn = this.getLikeBtn($post);
      const commentBtn = this.getCommentBtn($post);
      cy.wrap(likeBtn)
        .scrollIntoView()
        .should('exist')
        .and('be.visible');

      cy.wrap(commentBtn)
        .scrollIntoView()
        .should('exist')
        .and('be.visible');
    });
  }

  assertUserCanLikePost() {
    this.getAllPosts().eq(0).then(($post) => {
      const likeBtn = this.getLikeBtn($post);

      cy.wrap(likeBtn)
        .scrollIntoView()
        .should('have.class', 'btn-tertiary');

      cy.wrap(likeBtn).click();


      cy.wrap(likeBtn)
        .should('have.class', 'btn-primary');
    });
  }

  assertUserCanUnlikePost() {
    this.getAllPosts().eq(0).then(($post) => {
      const likeBtn = this.getLikeBtn($post);

      cy.wrap(likeBtn)
        .scrollIntoView()
        .should('have.class', 'btn-primary');

      cy.wrap(likeBtn).click();

      cy.wrap(likeBtn)
        .should('have.class', 'btn-tertiary');
    });
  }


  assertCommentModalWndwVisible() {
    this.getCommentsModalWndw()
      .should('exist')
      .and('be.visible');
  }

  assertUserCanCommentPost() {
    this.clickCommentBtn();
    this.getCommentInputField()
      .should('exist')
      .and('be.visible')
      .type(this.commentText);

    this.getCommentSubmitBtn()
      .should('exist')
      .and('be.visible')
      .click();

    this.getNewCommentPost()
      .should('exist')
      .and('be.visible')

    this.getNewestCommentTxt()
      .should('be.visible')
      .and('have.text', this.commentText);

  }
  assertUserCanDeleteComment() {
    this.getCommentDeleteBtn(this.commentText)
      .should('be.visible')
      .click();


    cy.contains('.post__description.post__description--modal', this.commentText)
      .should('not.exist');
  }

  assertUserCanCloseCommentModal() {
    this.getCommentsModalWndw().should('exist').and('be.visible');

    this.getCloseModalBtn()
      .should('be.visible')
      .click();

    this.getCommentsModalWndw().should('not.exist');
  }



}


module.exports = new HomePage();