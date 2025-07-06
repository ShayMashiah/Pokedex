describe("Battle Page - Cant catch Opponent's Pokemon", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="start-fight-button"]').click();
    cy.get('[data-cy="dialog-content"]').should("be.visible");

    cy.get('[data-cy="pokemon-item"]').first().as("chosenPokemon");
    cy.get("@chosenPokemon").click();
    cy.get('[data-cy="start-battle-button"]').contains("Start battle").click();

    cy.url().should("include", "/battle");
  });

  it("allows the user to catch the opponent's Pokemon", () => {

    cy.get('[data-cy="catch-button"]').click();

    cy.get('[data-cy="battle-message"]', { timeout: 8000 })
      .invoke("text")
      .should("match", /yet/i);
  });
});
