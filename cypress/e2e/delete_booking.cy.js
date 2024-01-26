import bookings_generator from "../utils/bookings_generator";
import bookings_wrapper from "../utils/bookings_wrapper";

describe("Delete booking spec", () => {
  let temp_token;
  before(() => {
    bookings_wrapper.create_auth("admin", "password123").then((response) => {
      temp_token = response.body.token;
      cy.log("temp_token: " + temp_token);
    });
  });

  it("Delete booking", () => {
    let newbooking = bookings_generator.generate_booking();
    bookings_wrapper.create_booking(newbooking).then((response) => {
      bookings_wrapper
        .delete_booking(response.body.bookingid, { token: temp_token })
        .its("status")
        .should("equal", 201); // bug in API; should return 200
      bookings_wrapper
        .get_booking(response.body.bookingid, { failOnStatusCode: false })
        .its("status")
        .should("equal", 404);
    });
  });
});
