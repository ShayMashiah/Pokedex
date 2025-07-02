describe("Start battle flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="start-fight-button"]').click();
    cy.get('[data-cy="dialog-content"]').should("be.visible");
  });

  it('starts the battle and shows chosen Pokemon on the left side', () => {
    let chosenPokemonName : string;

    cy.get('[data-cy="pokemon-item"]').first().as("chosenPokemon");
    
    cy.get("@chosenPokemon")
      .find('img')
      .invoke('attr', 'alt')
      .then((altText) => {
        if (!altText) {
          throw new Error("Pokemon alt text is not available");
        }
        chosenPokemonName = altText;
      });

    cy.get("@chosenPokemon").click();

    cy.get('[data-cy="start-battle-button"]').contains("Start battle").click();

    cy.url().should("include", "/prebattle");

    cy.get('[data-cy="battle-left-pokemon"]').should("exist");

    cy.get('[data-cy="battle-left-pokemon"]')
      .invoke("attr", "alt")
      .then((battleAltText) => {
        expect(chosenPokemonName.trim().toLowerCase()).to.eq(battleAltText?.trim().toLowerCase());
      });
  });
});
