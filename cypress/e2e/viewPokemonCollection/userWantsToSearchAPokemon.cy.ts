describe("Search section interaction", () => {
  beforeEach(() => {
    cy.visit("/"); 
    cy.get('[data-cy="tab-my-pokemons"]').click();
    cy.get('[data-cy="pokemon-table"]').should("exist");
  });

  it("lets the user type characters into the search input", () => {
    cy.get('[data-cy="search-section"]')
      .click()                
      .type("Serperior")        
      .should("have.value", "serperior"); 
  });
});