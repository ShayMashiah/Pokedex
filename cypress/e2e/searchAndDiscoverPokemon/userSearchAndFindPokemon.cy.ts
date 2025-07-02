describe("Search functionality", () => {
  beforeEach(() => {
    cy.visit("/"); 
  });

  it("filters Pokémon list based on search input", () => {

    cy.get('[data-cy="search-section"]').should("exist");

    cy.get('[data-cy="search-section"]').click().type("Pikachu")   ;

    cy.get('[data-cy="pokemon-table"] tbody tr').each(($row) => {
      cy.wrap($row)
        .find("td") 
        .first() 
        .invoke("text")
        .then((text) => {
          expect(text.toLowerCase()).to.include("pikachu");
        });
    });
  });
});
