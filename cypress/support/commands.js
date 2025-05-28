Cypress.Commands.add('loginViaAPI', () => {
  const loginUrl = Cypress.env('loginRequestLink');
  const bearer = Cypress.env('bearerToken');


  console.log('LOGIN URL: ' , loginUrl);
  console.log('BEARER TOKEN: ', bearer);

  cy.request({
    method: 'POST',
    url: loginUrl,
    headers: {
      Authorization: `Bearer ${bearer}`,
      'Content-Type': 'application/json'
    },
    body: {
      email: Cypress.env('email'),
      password: Cypress.env('password')
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    console.log('Response body:', JSON.stringify(response.body));

    const token = response.body.token;
    if (!token) {
      throw new Error('Token not found in response body');
    }

    cy.setCookie('token', token);
    console.log('Received token:', token);



    // // Ako backend automatski NE postavlja cookie, dodaj ručno:
    // cy.setCookie('token', response.body.token);
    // cy.log('Received token:', response.body.token);

    // // Ako backend već postavi cookie sam (set-cookie), možda nije ni potrebno dodatno ručno
  });
});









// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })