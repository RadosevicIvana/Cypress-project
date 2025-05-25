describe('My First Test', () => {
  it('Visits Cypress website and checks Getting Started', () => {
    cy.visit('https://docs.cypress.io')
    cy.contains('Getting Started').click()
    cy.url().should('include', '/getting-started')
  })
})