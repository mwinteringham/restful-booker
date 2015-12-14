var express = require('express');
var router  = express.Router(),
    parse   = require('../helpers/parser'),
    crypto = require('crypto'),
    Booking = require('../models/booking'),
    globalLogins = {};

router.get('/ping', function(req, res, next) {
  res.sendStatus(201);
});

router.get('/booking', function(req, res, next) {
  var query = {};

  if(typeof(req.query.firstname) != 'undefined'){
    query.firstname = req.query.firstname
  }

  if(typeof(req.query.lastname) != 'undefined'){
    query.lastname = req.query.lastname 
  }

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
      res.send(parse.booking(req.headers.accept, record));
    } else {
      res.sendStatus(404)
    }
  })
});

router.post('/booking', function(req, res, next) {
  newBooking = req.body;

  if(req.headers['content-type'] === 'text/xml') newBooking = newBooking.booking;

  Booking.create(newBooking, function(err, booking){
    if(err)
      res.sendStatus(500);
    else {
      res.send(parse.bookingWithId(req.headers.accept, booking));
    }
  })
});

router.put('/booking/:id', function(req, res, next) {
  if(globalLogins[req.cookies.token]){
    Booking.update(req.params.id, req.body, function(err){
      Booking.get(req.params.id, function(err, record){
        if(record){
          res.send(parse.booking(req.headers.accept, record));
        } else {
          res.sendStatus(404)
        }
      })
    })
  } else {
    res.sendStatus(403);
  }
});

router.delete('/booking/:id', function(req, res, next) {
  if(globalLogins[req.cookies.token]){
    Booking.get(req.params.id, function(err, record){
      if(record){
        Booking.delete(req.params.id, function(err){
            res.sendStatus(201);
        });
      } else {
        res.sendStatus(404);
      }
    });
  } else {
    res.sendStatus(403);
  }
});

router.post('/auth', function(req, res, next){
  if(req.body.username === "admin" && req.body.password === "password123"){
    var token = crypto.randomBytes(Math.ceil(15/2))
                    .toString('hex')
                    .slice(0,15);

    globalLogins[token] = true;

    res.send({'token': token});
  } else {
    res.send({'reason': 'Bad credentials'});
  }
})

module.exports = router;
