describe("Search section interaction", () => {
  beforeEach(() => {
    cy.visit("/"); 
  });

  it("lets the user type characters into the search input", () => {
    cy.get('[data-cy="search-section"]')
      .click()                
      .type("Pikachu")        
      .should("have.value", "pikachu"); 
  });
});