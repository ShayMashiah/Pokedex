describe("User wants to change the amount of rows in the table", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("changes number of rows per page to 20 and verifies 20 rows are shown", () => {
    cy.get('[data-cy="pokemon-table"]').should("exist");

    cy.get('[data-cy="rows-per-page-select"]').select("20");

    cy.get('[data-cy="pokemon-table"] tbody tr', { timeout: 10000 }).should(
      "have.length",
      20
    );
  });
});
