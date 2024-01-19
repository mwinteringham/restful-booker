const bookings_wrapper = {
  create_booking: function (newbooking, options = { failOnStatusCode: true }) {
    return cy.request({
      method: "POST",
      url: "/booking",
      failOnStatusCode: options.failOnStatusCode,
      body: newbooking,
    });
  },

  get_booking: function (bookingid, options = { failOnStatusCode: true }) {
    return cy.request({
      url: `/booking/${bookingid}`,
      failOnStatusCode: options.failOnStatusCode,
    });
  },

  delete_booking: function (bookingid, options = { token: null }) {
    return cy.request({
      method: "DELETE",
      url: `/booking/${bookingid}`,
      headers: {
        Cookie: `token=${options.token}`,
      },
    });
  },

  create_auth: function (username, password) {
    return cy.request({
      method: "POST",
      url: "/auth",
      body: {
        username: username,
        password: password,
      },
    });
  },
};

export default bookings_wrapper;
