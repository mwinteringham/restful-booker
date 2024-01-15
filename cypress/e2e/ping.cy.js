describe("Ping spec", () => {
  it("passes", () => {
    cy.request("/ping")
      .its("status")
      .should("be.greaterThan", 199)
      .and("be.lessThan", 300);
  });
});
