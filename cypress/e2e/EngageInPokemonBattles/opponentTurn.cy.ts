describe("Battle Page - Opponent's Turn", () => {

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

  it("fades the user's Pokemon bar when it's the opponent's turn", () => {
    
    cy.get('[data-cy="attack-button"]').click();

    cy.get('[data-cy="my-pokemon-bar"]', { timeout: 10000 }).should("have.class", "bg-gradient-disabled");
  });
});
