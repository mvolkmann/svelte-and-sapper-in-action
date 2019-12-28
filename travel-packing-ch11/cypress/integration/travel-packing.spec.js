const baseUrl = 'http://localhost:5000/';

function login() {
  cy.visit(baseUrl);
  cy.contains('Username')
    .children('input')
    .type('username');
  cy.contains('Password')
    .children('input')
    .type('password');
  cy.contains('Login').click();
}

function addCategories() {
  login();
  cy.get('[data-testid=category-name-input]')
    .as('nameInput')
    .type('Clothes');
  cy.contains('Add Category').click();
  cy.get('@nameInput').type('Toiletries{enter}');
}

function addItems() {
  addCategories();
  cy.get('[data-testid=item-input]')
    .first()
    .as('item-input-1')
    .type('socks');
  cy.contains('Add Item')
    .first()
    .click();
  cy.get('@item-input-1').type('shoes{enter}');

  cy.contains(/^Clothes$/)
    //.then(el => el.css('border', 'solid red'))
    .siblings('span')
    .contains('2 of 2 remaining');

  cy.get('[data-testid=item-input]')
    .last()
    .type('razor{enter}');

  cy.contains(/^Toiletries$/)
    .siblings('span')
    .contains('1 of 1 remaining');
}

describe('Travel Packing app', () => {
  it.skip('should login', () => {
    login();
  });

  it.skip('should add categories', () => {
    addCategories();
  });

  it.skip('should add items', () => {
    addItems();
  });

  it('should toggle done', () => {
    cy.visit(baseUrl);
    cy.contains('1 of 2 remaining');

    cy.get('input[type=checkbox]')
      .first()
      .as('cb1')
      .click();
    cy.contains('2 of 2 remaining');

    cy.get('@cb1').check();
    cy.contains('1 of 2 remaining');
  });

  it.skip('should delete item', () => {
    cy.visit(baseUrl);
    cy.contains('1 of 2 remaining');

    const itemText = 'learn Svelte'; // first item
    cy.contains('ul', itemText);

    cy.contains('Delete').click();
    cy.contains('ul', itemText).should('not.exist');
    cy.contains('1 of 1 remaining');
  });

  it.skip('should archive completed', () => {
    cy.visit(baseUrl);

    const itemText = 'learn Svelte'; // first item
    cy.contains('ul', itemText);

    cy.contains('Archive Completed').click();
    cy.contains('ul', itemText).should('not.exist');
    cy.contains('1 of 1 remaining');
  });
});
