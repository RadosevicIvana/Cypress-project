class HomePage {

  getPostsContainer() {
    return cy.get('.home__main__feed');
  }

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

  assertPostsContainerIsVisible() {
    this.getPostsContainer()
      .should('exist')
      .and('have.length.at.least', 2);
  }
  
   assertAllPostsHaveBasicContent() {
    this.getAllPosts().each(($post) => {
      cy.wrap($post).within(() => {
        this.getPostImage($post).should('be.visible');
        this.getPostUsername($post).should('be.visible');
        this.getPostFullName($post).should('be.visible');
        this.getPostTimestamp($post).should('be.visible');
        this.getPostActions($post).should('be.visible');
      });
    });
  }

}

module.exports = new HomePage();