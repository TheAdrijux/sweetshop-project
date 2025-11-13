# 🍬 Sweet Shop – Cypress E2E Automated Test Suite

This repository contains a **Cypress end-to-end (E2E)** test suite for the **Sweet Shop** demo application:

👉 https://sweetshop.netlify.app

The tests are based on the test cases from **`testcases.md`** and verify the main user flows:  
home page, navigation, login, sweets catalog, basket/cart, checkout form, and account page.

All tests can be run locally and also run automatically in **GitHub Actions CI**.

---

## 📁 Project Structure

The main files in this project (as in this repository) are:

.github/
  workflows/
    cypress.yml          # GitHub Actions workflow (runs Cypress in CI)

cypress/
  e2e/
    about.cy.js          # TS_4 – About Page
    account.cy.js        # TS_8 – Account Page
    basket.cy.js         # TS_6, TS_7, TS_9 – Basket + Checkout
    login.cy.js          # TS_3 – Login Page
    main.cy.js           # TS_1 – Main Page
    navigation.cy.js     # TS_2 – Navigation between pages
    sweets.cy.js         # TS_5 – Sweets catalog
  fixtures/
    users.json           # Valid / invalid login credentials
  support/
    commands.js          # Custom Cypress commands
    e2e.js               # Support file loaded for every spec (imports commands)

sweetshop-project/
  README.md (this file)
  testcases.md           # Original teacher test cases description (TS_1–TS_9)

cypress.config.js        # Cypress configuration (baseUrl, timeouts, etc.)
package.json             # npm scripts + Cypress dependency
package-lock.json
.gitignore
