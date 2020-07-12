/// <reference types="Cypress" />

context('App', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
  });


  it('should render app', () => {
    cy.get('.App').should('exist', true)
  })
});
