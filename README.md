# Social Network E2E Test Automation - Cypress

This project contains an automated end-to-end (E2E) test suite for the Social Network application using Cypress.

---

## Features Covered

### Login Page

- Successful login via UI and API
- Negative login scenarios (e.g., invalid credentials)

### Home Page

- Validation that posts are present on the home feed
- Verification of post content (username, full name, timestamp, etc.)
- Creating a new post (with text and audio recording)
- Posting restrictions (e.g., user cannot post only text or only a recording)
- Like and comment functionality
- Deleting user comments

---

## Project Setup & Execution

```bash
# Clone the Repository
git clone <your-repo-url>
cd <project-folder>

# Install Dependencies
npm install

# Create a `.env` File
# In the root directory, create a file named `.env` and add the following:
CYPRESS_ProductionUrl=
CYPRESS_ProductionHomePage=
CYPRESS_email=
CYPRESS_password=
CYPRESS_loginRequestLink=
CYPRESS_bearerToken=

# Do NOT commit your `.env` file.
# Ensure `.env` is listed in your `.gitignore`.

# Run the Tests
npx cypress open     # opens the Cypress Test Runner
# or
npx cypress run      # runs tests headlessly
```

---

## Other Notes

- Cypress must be installed as a project dependency (`npm install cypress --save-dev`)
- Custom commands (e.g., `cy.loginViaAPI()`) are defined in:
  ```
  cypress/support/commands.js
  ```
- Selectors and assertions are managed through the Page Object Model:
  - `loginPage.js`
  - `homePage.js`
- Ensure the app is accessible at the URL defined in the `.env` file before running tests.

---
