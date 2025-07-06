
describe("User attacks opponent", () => {
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
  it("removes buttons, shows attack message and decreases opponent HP", () => {
    cy.get('[data-cy="attack-button"]').click();

    cy.get('[data-cy="battle-buttons"]').should("not.exist");
    cy.get('[data-cy="battle-message"]')
      .invoke("text")
      .should("match", /attacks/i);

    cy.get('[data-cy="opponent-bar-indicator"]').should('have.class', 'bg-extendedPalette-warning-yellow');
});
});
