import bookings_generator from "../utils/bookings_generator";
import bookings_wrapper from "../utils/bookings_wrapper";

describe("Update Booking spec", () => {
  let temp_token;

  before(() => {
    bookings_wrapper.create_auth("admin", "password123").then((response) => {
      temp_token = response.body.token;
      cy.log("temp_token: " + temp_token);
    });
  });

  it("valid update booking", () => {
    let newbooking = bookings_generator.generate_booking();
    let updatedbooking = Object.assign({}, newbooking);
    updatedbooking.firstname = newbooking.firstname + "MODIFIED";
    updatedbooking.lastname = newbooking.lastname + "MODIFIED";
    bookings_wrapper.create_booking(newbooking).then((response) => {
      bookings_wrapper
        .update_booking(response.body.bookingid, updatedbooking, {
          token: temp_token,
        })
        .then((response) => {
          expect(response.status).to.be.equal(200);
          expect(response.body.firstname).to.be.deep.equal(
            updatedbooking.firstname,
          );
          expect(response.body.lastname).to.be.deep.equal(
            updatedbooking.lastname,
          );
        });
    });
  });

  it("invalid firstname", () => {
    let newbooking = bookings_generator.generate_booking();
    let updatedbooking = Object.assign({}, newbooking);
    updatedbooking.firstname = null;
    bookings_wrapper.create_booking(newbooking).then((response) => {
      bookings_wrapper
        .update_booking(response.body.bookingid, updatedbooking, {
          failOnStatusCode: false,
          token: temp_token,
        })
        .then((response) => {
          expect(response.status).to.be.equal(400);
        });
      bookings_wrapper.get_booking(response.body.bookingid).then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body.firstname).to.be.deep.equal(newbooking.firstname);
      });
    });
  });

  // this test fails due to bug in API, where checkin gets set to "0NaN-aN-aN" when updated to an invalid value; prior value should be retained and update should return a 400 or other error response
  it.skip("invalid checkin date", () => {
    let newbooking = bookings_generator.generate_booking();
    let updatedbooking = Object.assign({}, newbooking);
    updatedbooking.bookingdates.checkin = "2024-12-32";
    bookings_wrapper.create_booking(newbooking).then((response) => {
      bookings_wrapper
        .update_booking(response.body.bookingid, updatedbooking, {
          failOnStatusCode: false,
          token: temp_token,
        })
        .then((response) => {
          expect(response.status).to.be.equal(200);
        });
      bookings_wrapper.get_booking(response.body.bookingid).then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body.bookingdates.checkin).to.be.deep.equal(
          newbooking.bookingdates.checkin,
        );
      });
    });
  });
});
