var request  = require('supertest'),
    expect   = require('chai').expect,
    should   = require('chai').should(),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restful-booker2');

var generatePayload = function(firstname, lastname, totalprice, depositpaid, additionalneeds, checkin, checkout){
  return {
      'firstname': firstname,
      'lastname': lastname,
      'totalprice': totalprice,
      'depositpaid': depositpaid,
      'additionalneeds': additionalneeds,
      'bookingdates': {
        'checkin': checkin,
        'checkout': checkout
      }
    }
}

var server = 'http://localhost:3000'

describe('restful-booker', function () {
  it('responds to /ping', function testPing(done){
    request(server)
      .get('/ping')
      .expect(201, done);
  });

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});

describe('restful-booker - GET /booking', function () {
  beforeEach(function(){
    mongoose.connection.db.dropDatabase();
  })

  it('responds with all booking ids when GET /booking', function testGetAllBookings(done){
    payload  = generatePayload('Sally', 'Brown', 111, true, 'Breakfast', '2013-02-23', '2014-10-23');
    payload2 = generatePayload('Barry', 'Brown', 111, true, 'Breakfast', '2013-02-23', '2014-10-23');

    request(server)
      .post('/booking')
      .send(payload)
      .end(function(){
        request(server)
          .post('/booking')
          .send(payload2)
          .end(function(){
            request(server)
              .get('/booking')
              .expect(200)
              .expect([{"bookingid": 1},{"bookingid": 2}], done);
          })
      });
  });

  it('resposds with a payload when GET /booking/{id}', function testGetOneBooking(done){
    payload  = generatePayload('Sally', 'Brown', 111, true, 'Breakfast', '2013-02-23', '2014-10-23');

    request(server)
      .post('/booking')
      .send(payload)
      .end(function(){
        request(server)
          .get('/booking/1')
          .expect(200)
          .expect(payload, done)
      })
  })

});

describe('restful-booker - POST /booking', function () {
  beforeEach(function(){
    mongoose.connection.db.dropDatabase();
  })

  it('responds with the created booking and assigned booking id', function testCreateBooking(done){
    payload = generatePayload('Sally', 'Brown', 111, true, 'Breakfast', '2013-02-23', '2014-10-23');

    request(server)
      .post('/booking')
      .send(payload)
      .expect(200)
      .expect({"bookingid": 1, "booking" : payload}, done);
  });

  it('responds with a 500 error when a bad payload is sent', function testCreateBadBooking(done){
    payload = { 'lastname': 'Brown', 'totalprice': 111, 'depositpaid': true, 'additionalneeds': 'Breakfast'}

    request(server)
      .post('/booking')
      .send(payload)
      .expect(500, done);
  });

  it('responds with a 200 when a payload with too many params are sent', function testCreateExtraPayload(done){
    payload = generatePayload('Robert', 'Brown', 222, true, 'Breakfast', '2013-02-23', '2014-10-23');
    payload.extra = 'bad'

    request(server)
      .post('/booking')
      .send(payload)
      .expect(200, done);
  });

  it('responds with the correct assigned booking id when multiple payloads are sent', function testBookingId(done){
    payload = generatePayload('Robert', 'Brown', 222, true, 'Breakfast', '2013-02-23', '2014-10-23');
    payload2 = generatePayload('Sally', 'Brown', 111, true, 'Breakfast', '2013-02-23', '2014-10-23');

    request(server)
      .post('/booking')
      .send(payload)
      .end(function(){
        request(server)
          .post('/booking')
          .send(payload2)
          .expect(function(res) {
            res.body.bookingid = '2'
          })
          .end(done)
      })
  });
});

describe('restful-booker - PUT /booking', function () {

  it('responds with a 200 and an updated payload', function testUpdatingABooking(done){
    payload = generatePayload('Robert', 'Brown', 222, true, 'Breakfast', '2013-02-23', '2014-10-23');
    payload2 = generatePayload('Sally', 'Brown', 111, true, 'Breakfast', '2013-02-23', '2014-10-23');

    request(server)
      .post('/booking')
      .send(payload)
      .end(function(){
        request(server)
          .put('/booking/1')
          .send(payload2)
          .expect(200)
          .expect(payload2)
          .end(done)
      })
  })

});

describe('restful-booker DELETE /booking', function(){
  it('responds with a 201 when deleting an existing booking', function testDeletingAValidBooking(done){
    payload = generatePayload('Robert', 'Brown', 222, true, 'Breakfast', '2013-02-23', '2014-10-23');

    request(server)
      .post('/booking')
      .send(payload)
      .end(function(){
        request(server)
          .delete('/booking/1')
          .expect(201, function(){
            request(server)
              .get('/booking/1')
              .expect(404, done)
          })
      })
  });

});