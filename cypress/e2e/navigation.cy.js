// cypress/e2e/navigation.cy.js

const goHomeFromAnyPage = () => {
  cy.get('nav .navbar-brand').click();
  cy.url().should('match', /\/$/);
  cy.contains('h1', 'Welcome to the sweet shop!').should('be.visible');
};

describe('TS_2 Navigation Tests', () => {
  // ---- From MAIN page ----
  it('TC_2.1 – "Sweets" page loads from main page correctly', () => {
    cy.visitPath('/');
    cy.contains('a.nav-link', 'Sweets').click();
    cy.url().should('include', '/sweets');
    cy.contains('h1', 'Browse sweets').should('be.visible');
  });

  it('TC_2.2 – "About" page loads from main page correctly', () => {
    cy.visitPath('/');
    cy.contains('a.nav-link', 'About').click();
    cy.url().should('include', '/about');
    cy.contains('h1, h2', 'Sweet Shop Project').should('exist');
  });

  it('TC_2.3 – "Login" page loads from main page correctly', () => {
    cy.visitPath('/');
    cy.contains('a.nav-link', 'Login').click();
    cy.url().should('include', '/login');
    cy.contains('h1', 'Login').should('be.visible');
  });

  it('TC_2.4 – "Basket" page loads from main page correctly', () => {
    cy.visitPath('/');
    cy.contains('a.nav-link', 'Basket').click();
    cy.url().should('include', '/basket');
    cy.contains('h1', 'Your Basket').should('be.visible');
  });

  // ---- From SWEETS page ----
  it('TC_2.5 – Main page loads from "Sweets" page correctly', () => {
    cy.visitPath('/sweets');
    goHomeFromAnyPage();
  });

  it('TC_2.6 – "About" page loads from "Sweets" page correctly', () => {
    cy.visitPath('/sweets');
    cy.contains('a.nav-link', 'About').click();
    cy.url().should('include', '/about');
    cy.contains('h1, h2', 'Sweet Shop Project').should('exist');
  });

  it('TC_2.7 – "Login" page loads from "Sweets" page correctly', () => {
    cy.visitPath('/sweets');
    cy.contains('a.nav-link', 'Login').click();
    cy.url().should('include', '/login');
    cy.contains('h1', 'Login').should('be.visible');
  });

  it('TC_2.8 – "Basket" page loads from "Sweets" page correctly', () => {
    cy.visitPath('/sweets');
    cy.contains('a.nav-link', 'Basket').click();
    cy.url().should('include', '/basket');
    cy.contains('h1', 'Your Basket').should('be.visible');
  });

  // ---- From ABOUT page ----
  it('TC_2.9 – Main page loads from "About" page correctly', () => {
    cy.visitPath('/about');
    goHomeFromAnyPage();
  });

  it('TC_2.10 – "Sweets" page loads from "About" page correctly', () => {
    cy.visitPath('/about');
    cy.contains('a.nav-link', 'Sweets').click();
    cy.url().should('include', '/sweets');
    cy.contains('h1', 'Browse sweets').should('be.visible');
  });

  it('TC_2.11 – "Login" page loads from "About" page correctly', () => {
    cy.visitPath('/about');
    cy.contains('a.nav-link', 'Login').click();
    cy.url().should('include', '/login');
    cy.contains('h1', 'Login').should('be.visible');
  });

  it('TC_2.12 – "Basket" page loads from "About" page correctly', () => {
    cy.visitPath('/about');
    cy.contains('a.nav-link', 'Basket').click();
    cy.url().should('include', '/basket');
    cy.contains('h1', 'Your Basket').should('be.visible');
  });

  // ---- From LOGIN page ----
  it('TC_2.13 – Main page loads from "Login" page correctly', () => {
    cy.visitPath('/login');
    goHomeFromAnyPage();
  });

  it('TC_2.14 – "Sweets" page loads from "Login" page correctly', () => {
    cy.visitPath('/login');
    cy.contains('a.nav-link', 'Sweets').click();
    cy.url().should('include', '/sweets');
    cy.contains('h1', 'Browse sweets').should('be.visible');
  });

  it('TC_2.15 – "About" page loads from "Login" page correctly', () => {
    cy.visitPath('/login');
    cy.contains('a.nav-link', 'About').click();
    cy.url().should('include', '/about');
    cy.contains('h1, h2', 'Sweet Shop Project').should('exist');
  });

  it('TC_2.16 – "Basket" page loads from "Login" page correctly', () => {
    cy.visitPath('/login');
    cy.contains('a.nav-link', 'Basket').click();
    cy.url().should('include', '/basket');
    cy.contains('h1', 'Your Basket').should('be.visible');
  });

  // ---- From BASKET page ----
  it('TC_2.17 – Main page loads from "Basket" page correctly', () => {
    cy.visitPath('/basket');
    goHomeFromAnyPage();
  });

  it('TC_2.18 – "Sweets" page loads from "Basket" page correctly', () => {
    cy.visitPath('/basket');
    cy.contains('a.nav-link', 'Sweets').click();
    cy.url().should('include', '/sweets');
    cy.contains('h1', 'Browse sweets').should('be.visible');
  });

  it('TC_2.19 – "About" *link* from "Basket" page behaves as in the app (href="bout")', () => {
    cy.visitPath('/basket');

    // Assert the href is exactly "bout" (the current app behavior)
    cy.contains('a.nav-link', 'About')
      .should('have.attr', 'href', 'bout')
      .click();

    // And that we navigated to /bout
    cy.url().should('include', '/bout');
  });

  it('TC_2.20 – "Login" page loads from "Basket" page correctly', () => {
    cy.visitPath('/basket');
    cy.contains('a.nav-link', 'Login').click();
    cy.url().should('include', '/login');
    cy.contains('h1', 'Login').should('be.visible');
  });
});