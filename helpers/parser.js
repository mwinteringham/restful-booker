const js2xmlparser = require("js2xmlparser"),
    formurlencoded = require('form-urlencoded').default,
    date = require('date-and-time');

exports.bookingids = function(req, rawBooking){
  const payload = [];

  rawBooking.forEach(function(b){
    const tmpBooking = {
      bookingid: b.bookingid,
    };

    payload.push(tmpBooking);
  });

  return payload;
}

exports.booking = function(accept, rawBooking){
  try {
    const booking = {
      'firstname': rawBooking.firstname,
      'lastname': rawBooking.lastname,
      'totalprice': parseInt(rawBooking.totalprice),
      'depositpaid': Boolean(rawBooking.depositpaid),
      'bookingdates': {
        'checkin': date.format(new Date(rawBooking.bookingdates.checkin), 'YYYY-MM-DD'),
        'checkout': date.format(new Date(rawBooking.bookingdates.checkout), 'YYYY-MM-DD'),
      }
    };

    if(typeof(rawBooking.additionalneeds) !== 'undefined'){
      booking.additionalneeds = rawBooking.additionalneeds;
    }

    switch(accept){
      case 'application/xml':
        return js2xmlparser.parse('booking', booking);
      case 'application/json':
        return booking;
      case 'application/x-www-form-urlencoded':
        return formurlencoded(booking);
      case '*/*':
        return booking;
      default:
        return null;
    }
  } catch(err) {
    return err.message;
  }
}

exports.bookingWithId = function(req, rawBooking){
  try {
    const booking = {
      'firstname': rawBooking.firstname,
      'lastname': rawBooking.lastname,
      'totalprice': parseInt(rawBooking.totalprice),
      'depositpaid': Boolean(rawBooking.depositpaid),
      'bookingdates': {
        'checkin': date.format(new Date(rawBooking.bookingdates.checkin), 'YYYY-MM-DD'),
        'checkout': date.format(new Date(rawBooking.bookingdates.checkout), 'YYYY-MM-DD'),
      }
    };

    if(typeof(rawBooking.additionalneeds) !== 'undefined'){
      booking.additionalneeds = rawBooking.additionalneeds;
    }

    const payload = {
      "bookingid": rawBooking.bookingid,
      "booking": booking
    };

    switch(req.headers.accept){
      case 'application/xml':
        return js2xmlparser.parse('created-booking', payload);
      case 'application/json':
        return payload;
      case 'application/x-www-form-urlencoded':
        return formurlencoded(payload);
      case '*/*':
        return payload;
      default:
        return null;
    }
  } catch(err) {
    return err.message;
  }
}
