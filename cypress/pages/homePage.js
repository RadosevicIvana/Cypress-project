class HomePage{

    getPostFeed(){
    return cy.get('.home__main__feed__post.card');
}

getPostImage(post) {
    return post.find('#author-avatar'); 
  }
getUserName(post) {
    return post.find('.user-details__username'); 
  }

 getFullName(post) {
    return post.find('.user-details__fullName');
  } 

  getPostTime(post) {
    return post.find('.post__informations__timePosted');
  }
 getContent(post) {
    return post.find('.home__main__feed__post__body');
  }
  getLikeButton(post) {
    return post.find('.home__main__feed__post__like');
  }




assertPostsFeedAreVisible(){
     this.getPostFeed()
      .should('exist')
      .and('have.length.at.least', 1);
  }

}

module.exports = new HomePage();