describe("User enters the app", () => {
  it("displays the Pokémon table with full data", () => {
    cy.visit("/");

    cy.get('[data-cy="pokemon-table"]', { timeout: 10000 }).should("exist");

    cy.get('[data-cy="pokemon-table"] tbody tr').should("have.length.greaterThan", 0);

    cy.get('[data-cy="pokemon-table"]').within(() => {
      cy.contains("Pokemon name");
      cy.contains("ID");
      cy.contains("Description");
      cy.contains("Power level");
      cy.contains("HP level");
    });
  });
});
