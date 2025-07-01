describe("Search section hover effect", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("applies border color on hover", () => {
    cy.get("#search-section")
      .trigger("mouseover")
      .should("have.css", "border-color", "rgb(168, 174, 181)"); 
  });
});
