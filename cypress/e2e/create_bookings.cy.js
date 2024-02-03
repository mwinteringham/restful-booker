import bookings_generator from "../utils/bookings_generator";
import bookings_wrapper from "../utils/bookings_wrapper";

describe("Create Bookings spec", () => {
  // known issue with API that dates don't get saved correctly and come back off by one - so I skipped deep equal test on whole body
  it("create valid booking", () => {
    let newbooking = bookings_generator.generate_booking();
    bookings_wrapper.create_booking(newbooking).then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body.booking.firstname).to.be.deep.equal(
        newbooking.firstname,
      );
      expect(response.body).to.have.property("bookingid");
      cy.log("returned bookingid: " + response.body.bookingid);
      bookings_wrapper
        .get_booking(response.body.bookingid)
        .its("status")
        .should("equal", 200);
    });
  });

  it("create valid booking with faker generated data", () => {
    let newbooking = bookings_generator.generate_booking(true);
    bookings_wrapper.create_booking(newbooking).then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body.booking.firstname).to.be.deep.equal(
        newbooking.firstname,
      );
      expect(response.body).to.have.property("bookingid");
      cy.log("returned bookingid: " + response.body.bookingid);
      bookings_wrapper
        .get_booking(response.body.bookingid)
        .its("status")
        .should("equal", 200);
    });
  });

  it("First name is null should have error response", () => {
    let newbooking = bookings_generator.generate_booking();
    newbooking.firstname = null;
    cy.log(newbooking);
    bookings_wrapper
      .create_booking(newbooking, { failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.be.equal(500);
        expect(response.body).to.not.have.property("bookingid");
      });
  });
});
