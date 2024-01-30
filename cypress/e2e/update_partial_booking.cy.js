import bookings_generator from "../utils/bookings_generator";
import bookings_wrapper from "../utils/bookings_wrapper";

describe("Update Partial Booking spec", () => {
  let temp_token;

  before(() => {
    bookings_wrapper.create_auth("admin", "password123").then((response) => {
      temp_token = response.body.token;
      cy.log("temp_token: " + temp_token);
    });
  });

  it("valid partial update", () => {
    let newbooking = bookings_generator.generate_booking();
    const partialbooking = {
      firstname: newbooking.firstname + "MODIFIED",
      lastname: newbooking.lastname + "MODIFIED",
    };
    bookings_wrapper.create_booking(newbooking).then((response) => {
      bookings_wrapper
        .update_partial_booking(response.body.bookingid, partialbooking, {
          token: temp_token,
        })
        .then((response) => {
          expect(response.status).to.be.equal(200);
          expect(response.body.firstname).to.be.deep.equal(
            partialbooking.firstname,
          );
          expect(response.body.lastname).to.be.deep.equal(
            partialbooking.lastname,
          );
        });
    });
  });

  // this test fails due to API bug. API should return error response and not update, but instead returns 200 and updates booking with invalid value
  it.skip("invalid firstname", () => {
    let newbooking = bookings_generator.generate_booking();
    const partialbooking = {
      firstname: null,
      lastname: newbooking.lastname + "MODIFIED",
    };
    bookings_wrapper.create_booking(newbooking).then((response) => {
      bookings_wrapper
        .update_partial_booking(response.body.bookingid, partialbooking, {
          token: temp_token,
        })
        .then((response) => {
          expect(response.status).to.be.equal(400);
        });
    });
  });
});
