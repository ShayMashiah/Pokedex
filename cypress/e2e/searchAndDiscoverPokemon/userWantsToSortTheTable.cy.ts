describe("User wants to Sort the Table", () => {
  beforeEach(() => {
    cy.visit("/"); 
  });

  it("shows the sort dropdown with three options when pressing 'Sort by'", () => {

    cy.get('[data-cy="sort-by-button"]').click();
    cy.get('[data-cy="dropdown-menu-content"]') 
      .should("be.visible")
      .within(() => {
        cy.contains("Alphabetical A-Z").should("exist");
        cy.contains("Alphabetical Z-A").should("exist");
        cy.contains("HP (Low to high)").should("exist");
        cy.contains("HP (High to low)").should("exist");
        cy.contains("Power (Low to high)").should("exist");
        cy.contains("Power (High to low)").should("exist");
      });
  });
});
