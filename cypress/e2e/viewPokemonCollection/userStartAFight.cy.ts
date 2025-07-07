describe("User initiates a battle from the home screen", () => {
  beforeEach(() => {
    cy.visit("/"); 
    cy.get('[data-cy="tab-my-pokemons"]').click();
    cy.get('[data-cy="pokemon-table"]').should("exist");
  });

  it("opens user's Pokemons pop-up when clicking 'Start a fight' button", () => {
    cy.get('[data-cy="start-fight-button"]').click();

    cy.get('[data-cy="dialog-content"]').should("be.visible");
  });
});
