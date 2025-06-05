Cypress.Commands.add("loginViaAPI", () => {
  const loginUrl = Cypress.env("loginRequestLink");
  const bearer = Cypress.env("bearerToken");

  cy.request({
    method: "POST",
    url: loginUrl,
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
    body: {
      email: Cypress.env("email"),
      password: Cypress.env("password"),
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    console.log("Response body:", JSON.stringify(response.body));

    const token = response.body.token;
    if (!token) {
      throw new Error("Token not found in response body");
    }

    cy.setCookie("token", token);
    console.log("Received token:", token);
  });
});
