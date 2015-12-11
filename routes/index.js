var express = require('express');
var router = express.Router(),
    parse      = require('../helpers/parser')
    dateFormat = require('dateformat');

var Booking = require('../models/booking');

router.get('/ping', function(req, res, next) {
  res.sendStatus(201);
});

router.get('/booking', function(req, res, next) {
  var query = {};

  if(typeof(req.query.checkin) != 'undefined'){
    query["bookingdates.checkin"] = {$gt: new Date(req.query.checkin).toISOString()}
  }

  if(typeof(req.query.checkout) != 'undefined'){
    query["bookingdates.checkout"] = {$lt: new Date(req.query.checkout).toISOString()}
  }

  Booking.getIDs(query, function(err, record){
    res.send(record);
  })
});

router.get('/booking/:id',function(req, res, next){
  Booking.get(req.params.id, function(err, record){
    if(record){
      res.send(parse.booking(record));
    } else {
      res.sendStatus(404)
    }
  })
});

router.post('/booking', function(req, res, next) {
  Booking.create(req.body, function(err, booking){
    if(err)
      res.sendStatus(500);
    else {
      var payload = {
        "bookingid" : booking.bookingid,
        "booking" : parse.booking(booking)
      }

      res.send(payload);
    }
  })
});

router.put('/booking/:id', function(req, res, next) {
  Booking.update(req.params.id, req.body, function(err){
    Booking.get(req.params.id, function(err, record){
      if(record){
        res.send(parse.booking(record));
      } else {
        res.sendStatus(404)
      }
    })
  })
});

router.delete('/booking/:id', function(req, res, next) {
  Booking.get(req.params.id, function(err, record){
    if(record){
      Booking.delete(req.params.id, function(err){
          res.sendStatus(201);
      });
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;
