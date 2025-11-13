// cypress/e2e/about.cy.js

describe('TS_4 About Page', () => {
  beforeEach(() => {
    cy.visitPath('/about');
  });

  it('TC_4.1 – Verify the page has the title "Sweet Shop Project"', () => {
    cy.contains('h1.display-3', 'Sweet Shop Project').should('be.visible');
  });

  it('TC_4.2 – Verify the page has a description', () => {
    cy.get('.lead, p')
      .contains(/intentionally broken web application|Sweet Shop Project/i)
      .should('exist');
  });

  it('TC_4.3 – Verify the page has a banner/footer for the year 2018', () => {
    // In the Sweet Shop app this is usually in the footer
    cy.contains('footer .container, footer', 'Sweet Shop Project 2018')
      .should('be.visible');
  });
});
