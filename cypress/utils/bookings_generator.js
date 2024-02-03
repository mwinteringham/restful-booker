import { use } from "chai";
import bookings_helpers from "../utils/bookings_helpers";
import { faker } from "@faker-js/faker";

let firstNames = [
  "Emily",
  "Michael",
  "Jessica",
  "Matthew",
  "Ashley",
  "Jacob",
  "Sarah",
  "Christopher",
  "Samantha",
  "Joshua",
  "Taylor",
  "Nicholas",
  "Hannah",
  "Tyler",
  "Alexis",
  "Brandon",
  "Rachel",
  "Austin",
  "Elizabeth",
  "Andrew",
];

let lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Jones",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "Garcia",
  "Martinez",
  "Robinson",
];

let needs = ["breakfast", "lunch", "early checkin", "late checkout", null];

const bookings_generator = {
  generate_firstname: function (useFaker = false) {
    return useFaker
      ? faker.person.firstName()
      : firstNames[Cypress._.random(firstNames.length - 1)];
  },

  generate_lastname: function (useFaker = false) {
    return useFaker
      ? faker.person.lastName()
      : lastNames[Cypress._.random(lastNames.length - 1)];
  },

  generate_price: function (useFaker = false) {
    return useFaker
      ? faker.number.int({ min: 50, max: 250 })
      : Cypress._.random(50, 250);
  },

  generate_boolean: function (useFaker = false) {
    return useFaker ? faker.datatype.boolean() : Cypress._.random(1) === 1;
  },

  generate_bookingdates: function (useFaker = false) {
    const checkin = new Date();
    checkin.setDate(
      checkin.getDate() +
        (useFaker
          ? faker.number.int({ min: 1, max: 180 })
          : Cypress._.random(1, 180)),
    );
    cy.log("checkin: " + checkin.toDateString());
    let checkinString = bookings_helpers.convertToBookingDateString(checkin);
    cy.log("checkinString: " + checkinString);
    const checkout = new Date(
      checkin.setDate(
        checkin.getDate() +
          (useFaker
            ? faker.number.int({ min: 1, max: 14 })
            : Cypress._.random(1, 14)),
      ),
    );
    cy.log("checkout: " + checkout.toDateString());
    let checkoutString = bookings_helpers.convertToBookingDateString(checkout);
    cy.log("checkoutString: " + checkoutString);
    const bookingdates = {
      checkin: checkinString,
      checkout: checkoutString,
    };
    console.log(bookingdates);
    return bookingdates;
  },

  generate_additionalneeds: function (useFaker = false) {
    return useFaker
      ? faker.helpers.arrayElement(needs)
      : needs[Cypress._.random(needs.length - 1)];
  },

  generate_booking: function (useFaker = false) {
    const booking = {
      firstname: this.generate_firstname(useFaker),
      lastname: this.generate_lastname(useFaker),
      depositpaid: this.generate_boolean(useFaker),
      totalprice: this.generate_price(useFaker),
      bookingdates: this.generate_bookingdates(useFaker),
      additionalneeds: this.generate_additionalneeds(useFaker),
    };
    return booking;
  },
};

export default bookings_generator;
