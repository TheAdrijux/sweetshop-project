// cypress/e2e/home.cy.js

describe('TS_1 Main Page', () => {
  beforeEach(() => {
    cy.visitPath('/');
  });

  it('TC_1.1 – header with all navigation links is visible', () => {
    cy.get('nav .navbar-brand')
      .should('be.visible')
      .and('contain.text', 'Sweet Shop');

    cy.contains('a.nav-link', 'Sweets')
      .should('be.visible')
      .and('have.attr', 'href', '/sweets');

    cy.contains('a.nav-link', 'About')
      .should('be.visible')
      .and('have.attr', 'href', '/about');

    cy.contains('a.nav-link', 'Login')
      .should('be.visible')
      .and('have.attr', 'href', '/login');

    cy.contains('a.nav-link', 'Basket')
      .should('be.visible')
      .and('have.attr', 'href', '/basket');
  });

  it('TC_1.2 – welcome text is visible', () => {
    cy.contains('h1', 'Welcome to the sweet shop!').should('be.visible');
  });

  it('TC_1.3 – "Browse Sweets" button is visible and navigates correctly', () => {
    cy.contains('a.btn.btn-primary.sweets', 'Browse Sweets')
      .should('be.visible')
      .and('have.attr', 'href', '/sweets')
      .click();

    cy.url().should('include', '/sweets');
    cy.contains('h1', 'Browse sweets').should('be.visible');
  });

  it('TC_1.4 – page displays at least 4 popular sweets with correct info', () => {
    // "Most popular" section
    cy.contains('h2', 'Most popular').should('be.visible');

    // At least 4 cards
    cy.get('.row.text-center .cards .card')
      .should('have.length.at.least', 4)
      .each(($card) => {
        cy.wrap($card).within(() => {
          // name
          cy.get('.card-title').should('be.visible').and('not.be.empty');
          // price (very simple check: has some text with £)
          cy.contains('£').should('exist');
          // image
          cy.get('img').should('have.attr', 'src').and('not.be.empty');
          // Add to Basket button
          cy.get('.addItem')
            .should('be.visible')
            .and('have.class', 'btn')
            .and('have.class', 'btn-success');
        });
      });
  });
});
