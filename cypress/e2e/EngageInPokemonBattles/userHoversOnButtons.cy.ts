describe("Hover effects on attack and catch buttons", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="start-fight-button"]').click();
    cy.get('[data-cy="dialog-content"]').should("be.visible");

    cy.get('[data-cy="pokemon-item"]')
      .first()
      .as("chosenPokemon")
    cy.get("@chosenPokemon").click();
    cy.get('[data-cy="start-battle-button"]').contains("Start battle").click();

    cy.url().should("include", "/battle");
  });
  it("highlights button border on hover", () => {

    cy.get('[data-cy="attack-button"]')
      .trigger("mouseover")
      .should("have.class", "hover:border-primary-600");

    cy.get('[data-cy="catch-button"]')
      .trigger("mouseover")
      .should("have.class", "hover:border-primary-600");
  });
});
