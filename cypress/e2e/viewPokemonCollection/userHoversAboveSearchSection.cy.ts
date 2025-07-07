describe("Search section hover effect", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="tab-my-pokemons"]').click();
    cy.get('[data-cy="pokemon-table"]').should("exist");
  });

  it("applies border color on hover", () => {
    cy.get('[data-cy="search-section"]')
      .trigger("mouseover")
      .should("have.css", "border-color", "rgb(168, 174, 181)"); 
  });
});
