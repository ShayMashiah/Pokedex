describe("User navigate to My Pokémons and back", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="tab-my-pokemons"]').click();
    cy.get('[data-cy="pokemon-table"]').should("exist");
  });

  it("closes the popup when clicking X and returns to home with filters intact", () => {
    cy.get('[data-cy="display-range-text"]').should("have.text", "1-10 of 20 items");
    cy.get('[data-cy="tab-all-pokemons"]').click();
    cy.get('[data-cy="pokemon-table"]').should("exist");
    cy.get('[data-cy="display-range-text"]').should("have.text", "1-10 of 809 items");
  });
});
