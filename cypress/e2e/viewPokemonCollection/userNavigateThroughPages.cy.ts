describe("User navigates through Pokémon table pages", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="tab-my-pokemons"]').click();
  });

  it("displays different Pokémon when moving to the next page", () => {
    cy.get('[data-cy="pokemon-table"]').should("exist");

    cy.get('[data-cy="pokemon-table"] tbody tr')
      .should("have.length.greaterThan", 0);
    
    cy.get('[data-cy="pagination-next"]').click();

    cy.get('[data-cy="pokemon-table"] tbody tr')
      .first()
      .find("td")
      .first()
      .invoke("text")
      .then((firstName) => {
        cy.get('[data-cy="pagination-next"]').click();

        cy.get('[data-cy="pokemon-table"] tbody tr').should("have.length.greaterThan", 0);

        cy.get('[data-cy="pokemon-table"] tbody tr')
          .first()
          .find("td")
          .first()
          .invoke("text")
          .should((newName) => {
            expect(newName.trim()).to.not.eq(firstName.trim());
          });
      });
  });
});
