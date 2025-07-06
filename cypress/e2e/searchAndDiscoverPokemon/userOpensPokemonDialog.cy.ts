describe("User opens Pokémon details popup", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("opens a popup with Pokémon details when a Pokémon is clicked", () => {
    cy.get('[data-cy="pokemon-table"]').should("exist");

    cy.get('[data-cy="pokemon-table"] tbody tr').first().click();

    cy.get('[data-cy="dialog-content"]')
      .should("be.visible")
      .within(() => {
        cy.get('[data-cy="pokemon-name"]').should("exist");
        cy.get('[data-cy="pokemon-img"]').should("exist");
        cy.get('[data-cy="pokemon-description"]').should("exist");
        cy.get('[data-cy="pokemon-stats"]').should("exist");
      });
  });
});
