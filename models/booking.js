var mongoose = require('mongoose'),
    dateFormat = require('dateformat'),
    counter = require('./counters');

mongoose.connect('mongodb://localhost/restful-booker2');

var bookingSchema = mongoose.Schema({
    bookingid: {type: Number},
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    totalprice: { type: Number, required: true},
    depositpaid: { type: Boolean, required: true},
    bookingdates: {
      checkin: { type: Date, required: true},
      checkout: { type: Date, required: true}
    },
    additionalneeds: { type: String, required: false}
  }, { versionKey: false });

var Booking = mongoose.model('Booking', bookingSchema);

bookingSchema.pre('save', function(next) {
    var doc = this;

    counter.bumpId(doc, function(id){
      doc.bookingid = id;
      next();
    });
});

exports.getAll = function(callback){
  var query = {};

  Booking.find(query).select('bookingid -_id').exec(function(err, doc){
    if(err){
      callback(err);
    } else {
      callback(null, doc);
    }
  });
},

exports.get = function(id, callback){
  Booking.find({'bookingid': id}, function(err, doc){
    if(err){
      callback(err, null)
    } else {
      var parsedBooking;

      if (doc.length > 0) parsedBooking = parseBooking(doc[0]);
      callback(null, parsedBooking);
    }
  })
},

exports.create = function(record, callback){
  var newBooking = new Booking(record);

  newBooking.save(function(err, doc){
    if(err){
      callback(err);
    } else {
      var payload = {
        "bookingid" : doc.bookingid,
        "booking" : parseBooking(doc)
      }

      callback(null, payload);
    }
  });
},

exports.update = function(id, record, callback){
  Booking.find({'bookingid': id}).update(record, function(err){
    callback(err);
  });
},

exports.delete = function(id, callback){
  Booking.remove({'bookingid': id}, function(err){
    if(err){
      callback(err);
    } else {  
      callback(null); 
    }
  })
}

var parseBooking = function(rawBooking){ 
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