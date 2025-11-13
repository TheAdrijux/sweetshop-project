// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Reusable helpers

Cypress.Commands.add('visitPath', (path = '/') => {
  cy.visit(path, { failOnStatusCode: false });
});

Cypress.Commands.add('basketBadgeShouldBe', (expected) => {
  cy.contains('a.nav-link', 'Basket')
    .find('.badge')
    .should(($el) => {
      // convert both sides to plain strings without NBSP or spaces
      const actual = $el.text().replace(/\u00a0/g, '').trim();
      const cleanExpected = String(expected).replace(/\u00a0/g, '').trim();

      expect(actual).to.eq(cleanExpected);
    });
});

Cypress.Commands.add('addItemByName', (name) => {
  cy.contains('.card', name).within(() => {
    cy.get('.addItem').click();
  });
});

// Robust field locator used by fillBillingForm
const getField = ({
  label, placeholders = [], ids = [], names = [], autocompletes = [], within = 'form.needs-validation',
}) => {
  const scope = within ? `${within} ` : '';
  const tryGet = (desc, selector) => {
    const $found = Cypress.$(`${scope}${selector}`);
    if ($found.length) {
      cy.log(`✔ matched by ${desc}: ${selector}`);
      return cy.get(`${scope}${selector}`).first();
    }
    return null;
  };

  if (label) {
    return cy
      .contains(`${scope}label`, label instanceof RegExp ? label : new RegExp(`^\\s*${label}\\s*:?$`, 'i'))
      .then(($label) => {
        if ($label && $label.length) {
          const forId = $label.attr('for');
          if (forId) {
            const got = tryGet('label(for)', `#${forId}`);
            if (got) return got;
          }
          const $container = $label.closest('.form-group, .mb-3, .col, .col-md-6, .col-12, form');
          if ($container && $container.length) {
            const $input = $container.find('input, select, textarea').first();
            if ($input && $input.length) {
              cy.log('✔ matched by label(nearest)');
              return cy.wrap($input);
            }
          }
        }
        // loose label
        return cy.contains(`${scope}label`, label, { matchCase: false }).then(($label2) => {
          if ($label2 && $label2.length) {
            const forId2 = $label2.attr('for');
            if (forId2) {
              const got2 = tryGet('label(loose for)', `#${forId2}`);
              if (got2) return got2;
            }
            const $container2 = $label2.closest('.form-group, .mb-3, .col, .col-md-6, .col-12, form');
            if ($container2 && $container2.length) {
              const $input2 = $container2.find('input, select, textarea').first();
              if ($input2 && $input2.length) {
                cy.log('✔ matched by label(loose nearest)');
                return cy.wrap($input2);
              }
            }
          }
          // placeholder
          for (const ph of placeholders) {
            if (typeof ph === 'string') {
              const got = tryGet('placeholder', `input[placeholder="${ph}"], textarea[placeholder="${ph}"], select[placeholder="${ph}"]`);
              if (got) return got;
            } else {
              const $cands = Cypress.$(`${scope}input[placeholder], ${scope}textarea[placeholder], ${scope}select[placeholder]`);
              const match = $cands.toArray().find(el => ph.test(el.getAttribute('placeholder') || ''));
              if (match) {
                cy.log('✔ matched by placeholder(regex)');
                return cy.wrap(match);
              }
            }
          }
          // ids
          for (const id of ids) {
            const got = tryGet('id', id.startsWith('#') ? id : `#${id}`);
            if (got) return got;
          }
          // names
          for (const nm of names) {
            const sel = nm.startsWith('[name=') ? nm : `[name="${nm}"]`;
            const got = tryGet('name', sel);
            if (got) return got;
          }
          // autocomplete
          for (const ac of autocompletes) {
            const got = tryGet('autocomplete', `[autocomplete="${ac}"]`);
            if (got) return got;
          }
          cy.log('⚠ fallback: first control in form');
          return cy.get(`${scope} input, ${scope} select, ${scope} textarea`).first();
        });
      });
  }

  // no label path
  for (const ph of placeholders) {
    if (typeof ph === 'string') {
      const got = tryGet('placeholder', `input[placeholder="${ph}"], textarea[placeholder="${ph}"], select[placeholder="${ph}"]`);
      if (got) return got;
    } else {
      const $cands = Cypress.$(`${scope}input[placeholder], ${scope}textarea[placeholder], ${scope}select[placeholder]`);
      const match = $cands.toArray().find(el => ph.test(el.getAttribute('placeholder') || ''));
      if (match) {
        cy.log('✔ matched by placeholder(regex)');
        return cy.wrap(match);
      }
    }
  }
  for (const id of ids) {
    const got = tryGet('id', id.startsWith('#') ? id : `#${id}`);
    if (got) return got;
  }
  for (const nm of names) {
    const sel = nm.startsWith('[name=') ? nm : `[name="${nm}"]`;
    const got = tryGet('name', sel);
    if (got) return got;
  }
  for (const ac of autocompletes) {
    const got = tryGet('autocomplete', `[autocomplete="${ac}"]`);
    if (got) return got;
  }
  cy.log('⚠ fallback: first control in form (no label path)');
  return cy.get(`${scope} input, ${scope} select, ${scope} textarea`).first();
};

Cypress.Commands.add('fillBillingForm', (overrides = {}) => {
  const data = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    address: '1234 Main St',
    address2: 'Apt 5',
    country: 'United Kingdom',
    city: 'Cardiff',
    zip: 'CF10 1AA',
    ccName: 'ADA LOVELACE',
    ccNumber: '4242 4242 4242 4242',
    ccExp: '12/29',
    ccCvv: '123',
    ...overrides,
  };

  getField({ label: /First name/i, placeholders: [/first/i], ids: ['#firstName','#name'], names: ['firstName'], autocompletes: ['given-name'] })
    .as('firstNameField').clear({force:true}).type(data.firstName, {force:true});
  getField({ label: /Last name/i, placeholders: [/last|surname|family/i], ids: ['#lastName','#name'], names: ['lastName'], autocompletes: ['family-name'] })
    .as('lastNameField').clear({force:true}).type(data.lastName, {force:true});
  getField({ label: /Email/i, placeholders: [/email/i], ids: ['#email'], names: ['email'], autocompletes: ['email'] })
    .as('emailField').clear({force:true}).type(data.email, {force:true});
  getField({ label: /Address(?!.*2)/i, placeholders: [/address(?!.*2)|street|line 1/i], ids: ['#address','#address1'], names: ['address','address1','address_line1'], autocompletes: ['address-line1','street-address'] })
    .as('address1Field').clear({force:true}).type(data.address, {force:true});
  getField({ label: /Address\s*2/i, placeholders: [/address 2|line 2|apt|suite|unit/i], ids: ['#address2'], names: ['address2','address_line2'], autocompletes: ['address-line2'] })
    .as('address2Field').clear({force:true}).type(data.address2, {force:true});

  // Country / City (select or input)
  getField({ label: /Country/i, placeholders: [/country/i], ids: ['#country'], names: ['country'], autocompletes: ['country-name'] })
    .as('countryField').then($el => {
      const tag = ($el.prop('tagName')||'').toLowerCase();
      if (tag === 'select') cy.wrap($el).select(data.country, {force:true});
      else cy.wrap($el).clear({force:true}).type(data.country, {force:true});
    });
  getField({ label: /City|Town/i, placeholders: [/city|town/i], ids: ['#city'], names: ['city'], autocompletes: ['address-level2'] })
    .as('cityField').then($el => {
      const tag = ($el.prop('tagName')||'').toLowerCase();
      if (tag === 'select') cy.wrap($el).select(data.city, {force:true});
      else cy.wrap($el).clear({force:true}).type(data.city, {force:true});
    });

  getField({ label: /Zip|Postal/i, placeholders: [/zip|postal/i], ids: ['#zip'], names: ['zip','postalCode','postcode'], autocompletes: ['postal-code'] })
    .as('zipField').clear({force:true}).type(data.zip, {force:true});

  // Payment — use explicit IDs to avoid mix-ups
  cy.get('#cc-name').as('ccNameField').clear({force:true}).type(data.ccName, {force:true});
  cy.get('#cc-number').as('ccNumberField').clear({force:true}).type(data.ccNumber, {force:true});
  cy.get('#cc-expiration').as('ccExpField').clear({force:true}).type(data.ccExp, {force:true});
  cy.get('#cc-cvv').as('ccCvvField').clear({force:true}).type(data.ccCvv, {force:true});
});
