exports.returnRuleSet = function(){
  var constraints = {
    firstname : {presence: true},
    lastname : {presence: true},
    totalprice : {presence: true},
    depositpaid : {presence: true},
    'bookingdates.checkin' : {presence: true},
    'bookingdates.checkout' : {presence: true},
  };

  return constraints
}
