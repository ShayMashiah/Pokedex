describe("User sees Pokéball icon for owned Pokémon", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="pokemon-table"]').should("exist");
  });

  it("displays a Pokéball icon next to owned Pokémon", () => {
    const ownedPokemonName = "Wartortle";  
    cy.contains('[data-cy="pokemon-table"] tbody tr', ownedPokemonName).within(() => {
      cy.get('[data-cy="pokeball-icon"]').should("be.visible");
    });
  });
});
