// cypress/e2e/add_to_basket.cy.js

describe('TS_6 Add to Basket Functionality', () => {
  beforeEach(() => {
    // Try to start with an empty basket each time
    cy.visitPath('/');
    cy.clearLocalStorage();      // clear any stored basket
    cy.visitPath('/');           // reload after clearing
    cy.basketBadgeShouldBe(0);
  });

  it('TC_6.1 – Should add random product from Main page to basket and verify', () => {
    // Pick a random "Most popular" card on the main page
    cy.get('.row.text-center .cards .card').then(($cards) => {
      expect($cards.length).to.be.greaterThan(0);

      const idx = Cypress._.random(0, $cards.length - 1);
      const $card = $cards.eq(idx);

      cy.wrap($card).within(() => {
        cy.get('.addItem').click();
      });
    });

    // Basket badge should now be 1
    cy.basketBadgeShouldBe(1);

    // Go to Basket page and verify it loads and has the checkout form
    cy.contains('a.nav-link', 'Basket').click();
    cy.url().should('include', '/basket');
    cy.contains('h1', 'Your Basket').should('be.visible');

    // Basic check that the checkout form is present
    cy.get('form.needs-validation').should('exist');
  });

  it('TC_6.2 – Should add random product from Sweets page to basket and verify', () => {
    cy.visitPath('/sweets');
    cy.basketBadgeShouldBe(0);

    // Pick a random card on the sweets page
    cy.get('.row.text-center .card').then(($cards) => {
      expect($cards.length).to.be.greaterThan(0);

      const idx = Cypress._.random(0, $cards.length - 1);
      const $card = $cards.eq(idx);

      cy.wrap($card).within(() => {
        cy.get('.addItem').click();
      });
    });

    // Basket badge should now be 1
    cy.basketBadgeShouldBe(1);

    // Go to Basket page and verify it loads and has the checkout form
    cy.contains('a.nav-link', 'Basket').click();
    cy.url().should('include', '/basket');
    cy.contains('h1', 'Your Basket').should('be.visible');

    cy.get('form.needs-validation').should('exist');
  });
});
