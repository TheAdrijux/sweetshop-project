// cypress/e2e/sweets.cy.js

describe('TS_5 Sweets Page', () => {
  beforeEach(() => {
    cy.visitPath('/sweets');
  });

  it('TC_5.1 – Verify the page title is "Browse sweets"', () => {
    cy.contains('h1', 'Browse sweets').should('be.visible');
  });

  it('TC_5.2 – Verify each product has a name, price, image, and "Add to Basket" button', () => {
    // make sure there are multiple products
    cy.get('.row.text-center .card').should('have.length.greaterThan', 4);

    cy.get('.row.text-center .card').each(($card) => {
      cy.wrap($card).within(() => {
        // name
        cy.get('.card-title').should('be.visible').and('not.be.empty');

        // price (contains £ somewhere in the card)
        cy.contains(/£/).should('exist');

        // image
        cy.get('img')
          .should('have.attr', 'src')
          .and('not.be.empty');

        // Add to Basket button
        cy.get('.addItem')
          .should('be.visible')
          .and('have.class', 'btn')
          .and('have.class', 'btn-success');
      });
    });
  });
});
