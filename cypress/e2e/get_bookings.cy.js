import bookings_generator from "../utils/bookings_generator";
import bookings_wrapper from "../utils/bookings_wrapper";
import bookings_helpers from "../utils/bookings_helpers";

describe("Get Bookings spec", () => {
  const sampleFName = bookings_generator.generate_firstname();
  const sampleLName = bookings_generator.generate_lastname();
  const sampleCheckin = new Date();
  let sampleCheckinStr =
    bookings_helpers.convertToBookingDateString(sampleCheckin);
  const sampleCheckout = new Date();
  let sampleCheckoutStr =
    bookings_helpers.convertToBookingDateString(sampleCheckout);

  before(() => {
    let newbooking = bookings_generator.generate_booking();
    newbooking.firstname = sampleFName;
    newbooking.lastname = sampleLName;
    newbooking.bookingdates.checkin = sampleCheckinStr;
    newbooking.bookingdates.checkout = sampleCheckoutStr;
    bookings_wrapper.create_booking(newbooking);
  });

  it("Get All Bookings", () => {
    bookings_wrapper.get_all_bookings().then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.lengthOf.above(0);
    });
  });

  it("Get Booking by First Name", () => {
    bookings_wrapper
      .get_booking_by({ firstname: sampleFName })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.lengthOf.above(0);
      });
  });

  it("Get Booking by Last Name", () => {
    bookings_wrapper
      .get_booking_by({ lastname: sampleLName })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.lengthOf.above(0);
      });
  });

  it("Get Booking by First and Last Name", () => {
    bookings_wrapper
      .get_booking_by({ firstname: sampleFName, lastname: sampleLName })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.lengthOf.above(0);
      });
  });

  it("Get Booking by Checkin", () => {
    bookings_wrapper
      .get_booking_by({ checkin: sampleCheckinStr })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.lengthOf.above(0);
      });
  });

  it("Get Booking by Checkout", () => {
    bookings_wrapper
      .get_booking_by({ checkout: sampleCheckoutStr })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.lengthOf.above(0);
      });
  });

  it("Get Booking by Non existent First Name should get empty response", () => {
    bookings_wrapper
      .get_booking_by({ firstname: "non_existent_name" })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.lengthOf(0);
      });
  });
});
