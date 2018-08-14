var express = require('express');
var router  = express.Router(),
    parse   = require('../helpers/parser'),
    crypto = require('crypto'),
    Booking = require('../models/booking'),
    validator = require('../helpers/validator'),
    creator = require('../helpers/bookingcreator'),
    fs      = require('fs'),
    globalLogins = {};

if(process.env.SEED === 'true'){
  var count = 1;

  (function createBooking(){
    var newBooking = creator.createBooking()

    Booking.create(newBooking, function(err, result){
      if(err) return console.error(err);

      if(count < 10){
        count++;
        createBooking();
      }
    });
  })()
};

/**
 * @api {get} /ping Health check
 * @apiName Ping
 * @apiGroup Ping
 * @apiVersion 1.0.0
 * @apiDescription A simple health check endpoint to confirm whether the API is up and running.
 *
 * @apiExample Example usage:
 * curl -i https://restful-booker.herokuapp.com/ping
 * 
 * @apiSuccess {String} OK Default HTTP 201 response
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 */
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
    var booking = parse.bookingids(req, record);

    if(!booking){
      res.sendStatus(418);
    } else {
      res.send(booking);
    }
  })
});

router.get('/booking/:id',function(req, res, next){
  Booking.get(req.params.id, function(err, record){
    if(record){
      var booking = parse.booking(req.headers.accept, record);

      if(!booking){
        res.sendStatus(418);
      } else {
        res.send(booking);
      }
    } else {
      res.sendStatus(404)
    }
  })
});

router.post('/booking', function(req, res, next) {
  newBooking = req.body;
  if(req.headers['content-type'] === 'text/xml') newBooking = newBooking.booking;

  validator.scrubAndValidate(newBooking, function(payload, msg){
    if(!msg){


      Booking.create(newBooking, function(err, booking){
        if(err)
          res.sendStatus(500);
        else {
          var record = parse.bookingWithId(req, booking);

          if(!record){
            res.sendStatus(418);
          } else {
            res.send(record);
          }
        }
      })
    } else {
      res.sendStatus(500);
    }
  })
});

router.put('/booking/:id', function(req, res, next) {
  if(globalLogins[req.cookies.token] || req.headers.authorization == 'Basic YWRtaW46cGFzc3dvcmQxMjM='){
    updatedBooking = req.body;
    if(req.headers['content-type'] === 'text/xml') updatedBooking = updatedBooking.booking;

    validator.scrubAndValidate(updatedBooking, function(payload, msg){
      if(!msg){
        Booking.update(req.params.id, updatedBooking, function(err){
          Booking.get(req.params.id, function(err, record){
            if(record){
              var booking = parse.booking(req.headers.accept, record);

              if(!booking){
                res.sendStatus(418);
              } else {
                res.send(booking);
              }
            } else {
              res.sendStatus(405);
            }
          })
        })
      } else {
        res.sendStatus(400);
      }
    });
  } else {
    res.sendStatus(403);
  }
});

router.delete('/booking/:id', function(req, res, next) {
  if(globalLogins[req.cookies.token] || req.headers.authorization == 'Basic YWRtaW46cGFzc3dvcmQxMjM='){
    Booking.get(req.params.id, function(err, record){
      if(record){
        Booking.delete(req.params.id, function(err){
            res.sendStatus(201);
        });
      } else {
        res.sendStatus(405);
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
