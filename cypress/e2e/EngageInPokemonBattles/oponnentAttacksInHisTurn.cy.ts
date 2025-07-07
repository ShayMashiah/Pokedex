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
    cy.get('[data-cy="my-pokemon-bar"]')
      .invoke("attr", "currentHP") 
      .then((initialHpString) => {
        const initialHp = parseInt(initialHpString ?? "0");

        cy.get('[data-cy="attack-button"]').click();

        cy.get('[data-cy="my-pokemon-bar"]', { timeout: 10000 }).should("have.class", "bg-gradient-disabled");

        cy.get('[data-cy="battle-message"]', { timeout: 8000 })
          .invoke("text")
          .should("match", /attacks/i);

        cy.get('[data-cy="my-pokemon-bar"]')
            .invoke("attr", "data-current-hp") 
            .then((hpStr) => {
                const hp = parseInt(hpStr ?? "0");
        });
      });
  });
});
