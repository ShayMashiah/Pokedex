it("shows progress bar in yellow when HP is between 30% and 100%", () => {
    cy.visit("/");
    cy.get('[data-cy="start-fight-button"]').click();
    cy.get('[data-cy="dialog-content"]').should("be.visible");

    cy.get('[data-cy="pokemon-item"]').first().as("chosenPokemon");
    cy.get("@chosenPokemon").click();
    cy.get('[data-cy="start-battle-button"]').contains("Start battle").click();

    cy.url().should("include", "/battle");

    cy.get('[data-cy="opponent-bar-indicator"]')
        .should("have.class", "bg-extendedPalette-success-green");

    cy.get('[data-cy="attack-button"]').click();

    cy.get('[data-cy="attack-button"]').click();

    cy.get('[data-cy="opponent-bar-indicator"]').should("have.class", "bg-extendedPalette-error-red");
});
