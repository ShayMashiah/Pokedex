describe("User sorts the table", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="tab-my-pokemons"]').click();
    cy.get('[data-cy="pokemon-table"]').should("exist");
    cy.get('[data-cy="sort-by-button"]').click();
    
  });

  it("sorts the table when user clicks an option", () => {
    cy.get('[data-cy="dropdown-menu-item"]').should('be.visible');

    cy.contains('[data-cy="dropdown-menu-item"]', 'Alphabetical A-Z').click();

    cy.get('[data-cy="pokemon-table"] tbody tr').first().within(() => {
      cy.get('td').first().invoke('text').then((text) => {
        expect(text.trim().toLowerCase()).to.eq('aggron'); 
      });
    });
  });
});
