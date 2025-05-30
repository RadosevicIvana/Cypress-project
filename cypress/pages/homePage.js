class HomePage {

  getAllPosts() {
    return cy.get('.home__main__feed__post.card').not(':first');//skipping first post
  }

  getPostImage(post) {
    return post.find('img#author-avatar'); // jer je jedini img unutar posta i uvek se nalazi prvi
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

  getLikeButton(post) {
    return post.find('button[aria-label="Post action button"]').has('svg[data-icon="heart"]');
  }

  getCommentButton(post) {
    return post.find('button[aria-label="Post action button"]').has('svg[data-icon="comment"]');
  }

  getCommentsModalHeader() {
    return cy.get('.commentsModal__header.modal-header');
  }

  clickLikeOnFirstRealPost() {
    this.getAllPosts().eq(0).then(($post) => {
      const likeBtn = this.getLikeButton($post);
      cy.wrap(likeBtn)
        .scrollIntoView()
        .click();
    });
  }

  clickCommentOnFirstRealPost() {
    this.getAllPosts().eq(0).then(($post) => {
      const commentBtn = this.getCommentButton($post);
      cy.wrap(commentBtn)
        .scrollIntoView()
        .click();
    });

  }

  assertAllPostsHaveBasicContent() {
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

  assertLikeAndCommentButtonsArePresentInFirstRealPost() {
    this.getAllPosts().eq(0).then(($post) => {
      const likeBtn = this.getLikeButton($post);
      const commentBtn = this.getCommentButton($post);
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

  assertUserCanLikeFirstRealPost() {
    this.getAllPosts().eq(0).then(($post) => {
      const likeBtn = this.getLikeButton($post);

      cy.wrap(likeBtn)
        .scrollIntoView()
        .should('have.class', 'btn-tertiary');

      cy.wrap(likeBtn).click();

      cy.wrap(likeBtn)
        .should('have.class', 'btn-primary');
    });
  }

    assertUserCanUnlikeFirstRealPost() {
    this.getAllPosts().eq(0).then(($post) => {
      const likeBtn = this.getLikeButton($post);

      cy.wrap(likeBtn)
        .scrollIntoView()
        .should('have.class', 'btn-primary');

      cy.wrap(likeBtn).click();

      cy.wrap(likeBtn)
        .should('have.class', 'btn-tertiary');
    });
  }


  assertCommentsModalHeaderIsVisible() {
    this.getCommentsModalHeader()
      .should('exist')
      .and('be.visible');
  }



}


module.exports = new HomePage();