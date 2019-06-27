/// <reference types="Cypress" />

context('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  });


  it('should render app', () => {
    cy.get('.App').should('exist', true)
  })
});
