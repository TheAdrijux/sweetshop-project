// cypress/e2e/login.cy.js

const users = require('../fixtures/users.json');

const isGuidAccountPage = (p) =>
  /\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.html$/i.test(p);

describe('TS_3 Login Page', () => {
  beforeEach(() => {
    cy.visitPath('/login');
  });

  it('TC_3.1 – Verify the page title is "Login"', () => {
    cy.contains('h1', 'Login').should('be.visible');
    // optional extra: document title, if set
    cy.title().then((title) => {
      // don’t fail if it’s something else, just log
      cy.log('Document title:', title);
    });
  });

  it('TC_3.2 – Verify the page has a description', () => {
    // Typically a .lead or paragraph explaining login
    cy.get('p, .lead')
      .contains(/log in|please enter your email|access your account/i)
      .should('exist');
  });

  it('TC_3.3 – Verify the page contains "email" and "password" input fields', () => {
    cy.get('#exampleInputEmail')
      .should('be.visible')
      .and('have.attr', 'type', 'email');

    cy.get('#exampleInputPassword')
      .should('be.visible')
      .and('have.attr', 'type', 'password');
  });

  it('TC_3.4 – Verify the page contains a "Login" button', () => {
    cy.get('button.btn-primary')
      .should('be.visible')
      .and('contain.text', 'Login');
  });

  it('TC_3.5 – Verify links to Twitter, Facebook, Linkedin', () => {
    // 3 social links exist
    cy.get('.social a').should('have.length', 3);

    // Icons for each social network are present
    cy.get('.social img[alt="twitter"]').should('be.visible');
    cy.get('.social img[alt="facebook"]').should('be.visible');
    cy.get('.social img[alt="linkedin"]').should('be.visible');
  });

  it('TC_3.6 – Positive login with valid data', () => {
    cy.get('#exampleInputEmail').clear().type(users.valid.email);
    cy.get('#exampleInputPassword').clear().type(users.valid.password);
    cy.get('button.btn-primary').click();

    cy.location('pathname').should(($p) => {
      expect(isGuidAccountPage($p)).to.eq(true);
    });
  });

  it('TC_3.7 – Negative login with wrong email format', () => {
    cy.get('#exampleInputEmail').clear().type(users.invalid.email); // no @
    cy.get('#exampleInputPassword').clear().type('somePassword');
    cy.get('button.btn-primary').click();

    // Should NOT reach account page
    cy.location('pathname', { timeout: 1000 }).should(($p) => {
      expect(isGuidAccountPage($p)).to.eq(false);
    });

    // And should show email error
    cy.get('.invalid-email').should('be.visible');
  });

  it('TC_3.8 – Negative login with empty email', () => {
    cy.get('#exampleInputEmail').clear();
    cy.get('#exampleInputPassword').clear().type('somePassword');
    cy.get('button.btn-primary').click();

    cy.get('.invalid-email').should('be.visible');
  });

  it('TC_3.9 – Negative login with empty password', () => {
    cy.get('#exampleInputEmail').clear().type('user@example.com');
    cy.get('#exampleInputPassword').clear();
    cy.get('button.btn-primary').click();

    cy.get('.invalid-password').should('be.visible');
  });

  it('TC_3.10 – Negative login with empty email and empty password', () => {
    cy.get('#exampleInputEmail').clear();
    cy.get('#exampleInputPassword').clear();
    cy.get('button.btn-primary').click();

    cy.get('.invalid-email').should('be.visible');
    cy.get('.invalid-password').should('be.visible');
  });

  // Extra (not in testcases.md, but nice to keep):
  it('prevents paste into password field (extra)', () => {
    cy.get('#exampleInputPassword')
      .invoke('attr', 'onpaste')
      .should('contain', 'return false;');
  });
});
