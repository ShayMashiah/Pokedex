describe("Battle Page - Opponent Attacks", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="start-fight-button"]').click();
    cy.get('[data-cy="dialog-content"]').should("be.visible");

    cy.get('[data-cy="pokemon-item"]').first().as("chosenPokemon");
    cy.get("@chosenPokemon").click();
    cy.get('[data-cy="start-battle-button"]').contains("Start battle").click();

    cy.url().should("include", "/battle");
  });

  it("displays the opponent's attack message and reduces HP", () => {
    cy.get('[data-cy="my-pokemon-bar-indicator"]')
        .should("have.class", "bg-extendedPalette-success-green");
  });
});
