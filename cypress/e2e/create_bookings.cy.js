import bookings_generator from "../utils/bookings_generator";

describe("Create Bookings spec", () => {
  it("create valid booking", () => {
    let newbooking = bookings_generator.generate_booking();
    cy.request("POST", "/booking", newbooking).then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body.booking.firstname).to.be.deep.equal(
        newbooking.firstname,
      );
      expect(response.body).to.have.property("bookingid");
    });
  });
});
