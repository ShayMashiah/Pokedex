describe("Search functionality", () => {
  beforeEach(() => {
    cy.visit("/"); 
    cy.get('[data-cy="tab-my-pokemons"]').click();
    cy.get('[data-cy="pokemon-table"]').should("exist");
  });

  it("filters Pokémon list based on search input", () => {
    cy.get('[data-cy="search-section"]').should("exist");
    cy.get('[data-cy="search-section"]').click().type("Serperior");
    cy.get('[data-cy="pokemon-table"] tbody tr').each(($row) => {
      cy.wrap($row)
        .find("td") 
        .first() 
        .invoke("text")
        .then((text) => {
          expect(text.toLowerCase()).to.include("serperior");
        });
    });
  });
});
