var express = require('express');
var router = express.Router();

var Booking = require('../models/booking');

router.get('/ping', function(req, res, next) {
  res.sendStatus(201);
});

router.get('/booking', function(req, res, next) {
	Booking.getAll(function(err, record){
		res.send(record);
	})
});

router.get('/booking/:id',function(req, res, next){
  Booking.get(req.params.id, function(err, record){
    if(record){
      res.send(record);
    } else {
      res.sendStatus(404)
    }
  })
});

router.post('/booking', function(req, res, next) {
  Booking.create(req.body, function(err, record){
    res.send(record);
  })
});

router.put('/booking/:id', function(req, res, next) {
  Booking.update(req.params.id, req.body, function(err){
    Booking.get(req.params.id, function(err, record){
      if(record){
        res.send(record);
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
