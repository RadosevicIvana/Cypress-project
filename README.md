<h1>Social Network E2E Test Automation - Cypress</h1>

<h2>The Social Network application allows users to:</h2>
<ul>
<li>Log in to their account </li>
<li>View posts in the home feed </li>
<li>Create new posts with text and audio recordings</li>
<li>Like and comment on existing posts</li>
<li>Delete their comments on the post</li>
</ul>

<h2>The automated test suite covers the following areas:</h2>
<h3>Login Page: </h3>
<ul>
<li>Successful login via UI and API </li>
<li>Negative login scenarios (e.g. wrong credentials) </li>
</ul>
<h3>Home Page:</h3>
<ul>
<li>Validation that posts are present on the home feed</li>
<li>Verification of all post content (username, full name, timestamp, etc.)</li>
<li>Creating a new post with text and recording</li>
<li>Restrictions (e.g. user cannot post only text or only a recording)</li>
<li>Like and comment features </li>
<li>Deleting comments </li>
</ul>
<h2>How to set up and run the tests:</h2>
<h3>1. Clone the repository</h3>
git clone <your-repo-url> <br>
cd <repo-folder>
<h3>2. Install dependencies</h3>
npm install
<h3>3. Create the.env file</h3>
In the project root, create a file named .env and add the following: <br>
CYPRESS_ProductionUrl= <br>
CYPRESS_ProductinHomePage= <br>
CYPRESS_email= <br>
CYPRESS_password= <br>
CYPRESS_loginRequestLink= <br>
CYPRESS_bearerToken= <br>
<br>
⚠️ Do not commit your .env file to version control!!! Make sure that the .env file is in the .gitignore file <br>
<h3>4. Run the tests</h3>
npx cypress open <br> 
or <br>
npx cypress run
<h2>Other Notes</h2>
<ul>
  <li>Cypress must be installed as a project dependency</li>
  <li>Custom Cypress commands (such as cy.loginViaAPI()) are defined in cypress/support/commands.js</li>
  <li>All selectors and assertions are managed through the Page Object Model (loginPage.js/homePage.js) for maintainability.</li>
  <li>Make sure the application is accessible at the URL provided in the .env file before running tests.</li>
</ul>


