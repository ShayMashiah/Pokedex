describe("Search functionality with no results", () => {
  beforeEach(() => {
    cy.visit("/"); 
  });

  it('shows "No Pokemons were found" when no results match the search', () => {

    cy.get('[data-cy="search-section"]').type("someRandomStringThatMatchesNothing");

    cy.get('[data-cy="pokemon-table"] tbody tr').should("have.length", 0);

    cy.contains("No Pokemons were found").should("be.visible");
  });
});
