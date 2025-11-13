// cypress/e2e/account.cy.js

const users = require('../fixtures/users.json');

const isGuidAccountPage = (p) =>
  /\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.html$/i.test(p);

describe('TS_8 Account Page', () => {
  it('TC_8.1 – Positive login to Account page', () => {
    // Step 1: Open login page
    cy.visitPath('/login');
    cy.contains('h1', 'Login').should('be.visible');

    // Step 2: Enter valid credentials and submit
    cy.get('#exampleInputEmail').clear().type(users.valid.email);
    cy.get('#exampleInputPassword').clear().type(users.valid.password);
    cy.get('button.btn-primary').click();

    // Step 3: Verify we landed on an account GUID HTML page
    cy.location('pathname').should(($p) => {
      expect(isGuidAccountPage($p)).to.eq(true);
    });

    // Step 4: Verify Account page content
    cy.contains('h1', 'Your Account').should('be.visible');
    cy.contains('.lead', 'Welcome back').should('contain.text', users.valid.email);

    // Previous orders table
    cy.get('table#transactions').should('be.visible');

    // Chart.js canvas
    cy.get('canvas#transactionChart').should('be.visible');

    // Basket area (even if empty)
    cy.get('#basketItems, #basket-items, #basketItemsContainer')
      .should('exist');
  });
});
