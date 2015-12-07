var express = require('express');
var router = express.Router();

var Booking = require('../models/booking');

router.get('/ping', function(req, res, next) {
  res.sendStatus(201);
});

router.post('/booking', function(req, res, next) {
  Booking.create(req.body, function(err, record){
    if(err){
      res.sendStatus(500);
    } else {
      res.send(record);
    }
  })
})

module.exports = router;
