describe("Selecting a Pokemon in the pop-up", () => {
  beforeEach(() => {
    cy.visit("/"); 
    cy.get('[data-cy="start-fight-button"]').click();
    cy.get('[data-cy="dialog-content"]').should("be.visible");
  });

  it("highlights the selected Pokemon with a blue circle", () => {
    cy.get('[data-cy="pokemon-item"]').first().as("firstPokemon");
cy.get('@firstPokemon')
  .click()
  .should('have.css', 'box-shadow')
  .and('contain', 'rgb(59, 130, 246) 0px 0px 0px 2px');
  });
});
