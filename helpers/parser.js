var js2xmlparser = require("js2xmlparser"),
    dateFormat = require('dateformat');

exports.booking = function(accept, rawBooking){
	var booking = {
    'firstname' : rawBooking.firstname,
    'lastname' : rawBooking.lastname,
    'totalprice' : rawBooking.totalprice,
    'depositpaid' : rawBooking.depositpaid,
    'bookingdates' : {
      'checkin' : dateFormat(rawBooking.bookingdates.checkin, "yyyy-mm-dd"),
      'checkout' : dateFormat(rawBooking.bookingdates.checkout, "yyyy-mm-dd")
    }
  }

  if(typeof(rawBooking.additionalneeds) !== 'undefined'){
    booking.additionalneeds = rawBooking.additionalneeds;
  }

  if(accept == 'application/xml'){
    return js2xmlparser('booking', booking);
  } else {
    return booking;
  }
}

exports.bookingWithId = function(accept, rawBooking){
  var booking = {
    'firstname' : rawBooking.firstname,
    'lastname' : rawBooking.lastname,
    'totalprice' : rawBooking.totalprice,
    'depositpaid' : rawBooking.depositpaid,
    'bookingdates' : {
      'checkin' : dateFormat(rawBooking.bookingdates.checkin, "yyyy-mm-dd"),
      'checkout' : dateFormat(rawBooking.bookingdates.checkout, "yyyy-mm-dd")
    }
  }

  if(typeof(rawBooking.additionalneeds) !== 'undefined'){
    booking.additionalneeds = rawBooking.additionalneeds;
  }

  var payload = {
    "bookingid" : rawBooking.bookingid,
    "booking" : booking
  }

  if(accept == 'application/xml'){
    return js2xmlparser('created-booking', payload);
  } else {
    return payload;
  }
}