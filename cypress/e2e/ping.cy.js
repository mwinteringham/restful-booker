describe("Ping spec", () => {
  it("Ping is successful", () => {
    cy.request("/ping")
      .its("status")
      .should("be.greaterThan", 199)
      .and("be.lessThan", 300);
  });
});
