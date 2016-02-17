var js2xmlparser = require("js2xmlparser"),
    dateFormat = require('dateformat');

exports.bookingids = function(req, rawBooking){
  var payload = [];

  rawBooking.forEach(function(b){
    var tmpBooking = {
      bookingid: b.bookingid,
    }

    payload.push(tmpBooking);
  });

  return payload;
}

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

  switch(accept){
    case 'application/xml':
      return js2xmlparser('booking', booking);
      break;
    case 'application/json':
      return booking;
      break;
    case '*/*':
      return booking;
      break;
    default:
      return null;
  }
}

exports.bookingWithId = function(req, rawBooking){
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

  switch(req.headers.accept){
    case 'application/xml':
      return js2xmlparser('created-booking', payload);
      break;
    case 'application/json':
      return payload;
      break;
    case '*/*':
      return payload;
      break;
    default:
      return null;
  }
}
