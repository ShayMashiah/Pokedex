describe("User enters the app", () => {
  it("displays the Pokémon table with full data", () => {
    cy.visit("/");

    cy.get("#pokemon-table", { timeout: 10000 }).should("exist");

    cy.get("#pokemon-table tbody tr").should("have.length.greaterThan", 0);

    cy.get("#pokemon-table").within(() => {
      cy.contains("Pokemon name");
      cy.contains("ID");
      cy.contains("Description");
      cy.contains("Power level");
      cy.contains("HP level");
    });
  });
});
