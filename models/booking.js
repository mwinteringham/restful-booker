var Datastore = require('nedb');
var db = new Datastore();
var counter = 0;

var booking = new Datastore();

exports.getIDs = function(query, callback){
  booking.find(query, function(err, booking){
    if(err){
      callback(err);
    } else {
      callback(null, booking);
    }
  });
},

exports.get = function(id, callback){
  booking.findOne({'bookingid': parseInt(id)}, function(err, booking) {
    if(err){
      callback(err, null)
    } else {
      callback(null, booking);
    }
  });
},

exports.create = function(payload, callback){
  counter++;
  payload.bookingid = counter;

  booking.insert(payload, function(err, doc) {
    if(err){
      callback(err);
    } else {
      callback(null, payload);
    }
  });
},

exports.update = function(id, updatedBooking, callback){
  booking.update({'bookingid': parseInt(id)}, { $set: updatedBooking }, {}, function(err){
    if(err){
      callback(err);
    } else {
      callback(null);
    }
  });
},

exports.delete = function(id, callback){
  booking.remove({'bookingid': parseInt(id)}, function(err){
    if(err){
      callback(err);
    } else {
      callback(null);
    }
  })
},

exports.deleteAll = function(callback){
  counter = 0;

  booking.remove({}, function(err){
    callback();
  });
}
