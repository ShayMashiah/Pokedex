describe("My Pokemons page", () => {
  it("displays the user's Pokémons in a table format", () => {
    cy.visit("/");

    cy.get('[data-cy="tab-my-pokemons"]').click();
    cy.get('[data-cy="pokemon-table"]').should("exist");

    cy.get('[data-cy="pokemon-table"] tbody tr').each(($row) => {
      cy.wrap($row).within(() => {
        cy.get('[data-cy="pokemon-picture"]').should("exist");
        cy.get('[data-cy="pokemon-name"]').should("exist");
        cy.get('[data-cy="pokeball-icon"]').should("exist");
        cy.get('[data-cy="pokemon-id"]').should("exist");
        cy.get('[data-cy="pokemon-description"]').should("exist");
        cy.get('[data-cy="pokemon-power"]').should("exist");
        cy.get('[data-cy="pokemon-hp"]').should("exist");
      });
    });
  });
});
