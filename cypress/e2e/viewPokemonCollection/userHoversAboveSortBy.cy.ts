describe('Sort by button hover effect', () => {
  beforeEach(() => {
    cy.visit('/'); 
    cy.get('[data-cy="tab-my-pokemons"]').click();
    cy.get('[data-cy="pokemon-table"]').should("exist");
  });

  it('button becomes black when hovered', () => {
    cy.get('[data-cy="sort-by-button"]')
      .trigger('mouseover')
      .should('have.css', 'border-color', 'rgb(168, 174, 181)') ; 
  });
});
