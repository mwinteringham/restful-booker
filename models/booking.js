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

exports.create = function(record, callback){
  var newBooking = new Booking(record);

  newBooking.save(function(err, result){
    if(err){
      callback(err);
    } else {
      var booking = {
        'bookingid' : result.bookingid,
        'firstname' : result.firstname,
        'lastname' : result.lastname,
        'totalprice' : result.totalprice,
        'depositpaid' : result.depositpaid,
        'bookingdates' : {
          'checkin' : dateFormat(result.bookingdates.checkin, "yyyy-mm-dd"),
          'checkout' : dateFormat(result.bookingdates.checkout, "yyyy-mm-dd")
        }
      }

      if(typeof(result.additionalneeds) !== 'undefined'){
        booking.additionalneeds = result.additionalneeds;
      }

      callback(null, booking);
    }
  });
}