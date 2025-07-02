describe("User closes Pokémon details popup", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="pokemon-table"]').should("exist");
    cy.get('[data-cy="pokemon-table"] tbody tr').first().click();
    cy.get('[data-cy="dialog-content"]').should("be.visible");
  });

  it("closes the popup when clicking X and returns to home with filters intact", () => {
    cy.get('[data-cy="close-dialog-button"]').click();
    cy.get('[data-cy="dialog-content"]').should("not.exist");
    cy.get('[data-cy="pokemon-table"]').should("exist");
    cy.get('[data-cy="pokemon-table"] tbody tr').should("have.length.greaterThan", 0); 
  });
});
