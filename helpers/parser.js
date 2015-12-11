exports.booking = function(rawBooking){
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

  return booking;
}