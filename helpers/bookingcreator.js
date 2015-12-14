var dateFormat = require('dateformat');

var randomiseDate = function(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

var randomiseNumber = function(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
};

var randomiseFirstName = function(){
  var name = ["Mark","Mary","Sally","Jim","Eric","Susan"]

  return name[randomiseNumber(0,name.length - 1)];  
};

var randomiseLastName = function(){
  var surname = ["Jones","Wilson","Jackson","Brown","Smith","Ericsson"]

  return surname[randomiseNumber(0,surname.length - 1)];  
};

var randomiseBool = function(){
  var bool = [true,false]

  return bool[randomiseNumber(0,bool.length - 1)];
};

exports.createBooking = function(){
  var checkInDate = randomiseDate(new Date(2015, 1, 1), new Date())
  var latestDate = new Date()
  latestDate.setDate(latestDate.getDate() + 3)

  var booking = {
    firstname: randomiseFirstName(),
    lastname: randomiseLastName(),
    totalprice: randomiseNumber(100,1000),
    depositpaid: randomiseBool(),
    bookingdates: {
      checkin: dateFormat(checkInDate.setHours(15,0,0,0), "yyyy-mm-dd"),
      checkout: dateFormat(randomiseDate(checkInDate,latestDate).setHours(12,0,0,0), "yyyy-mm-dd")
    }
  }

  if(randomiseBool()){
    booking.additionalneeds = "Breakfast";
  }

  return booking;
}