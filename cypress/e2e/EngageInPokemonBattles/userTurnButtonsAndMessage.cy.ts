describe("User turn on battle page", () => {
  let chosenPokemonName: string;

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

    cy.get('[data-cy="battle-message"]').should("contain.text", "starts the fight!");
  });

  it("shows attack and catch buttons on user's turn", () => {
    cy.get('[data-cy="attack-button"]').should("exist");
    cy.get('[data-cy="catch-button"]').should("exist");
    cy.get('[data-cy="opponent-bar"]').should("have.class", "bg-gradient-disabled");
  });
});
