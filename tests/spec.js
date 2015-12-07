var request   = require('supertest'),
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

describe('restful-booker', function () {
  var server = 'http://localhost:3000'

  beforeEach(function(){
    mongoose.connection.db.dropDatabase();
  })

  it('responds to /ping', function testPing(done){
    request(server)
      .get('/ping')
      .expect(201, done);
  });

  it('responds with the created booking when POST to /booking', function testCreateBooking(done){
    payload = generatePayload('Sally', 'Brown', 111, true, 'Breakfast', '2013-02-23', '2014-10-23');
    payloadWithId = payload;
    payloadWithId.bookingid = 1;

    request(server)
      .post('/booking')
      .send(payload)
      .expect(200)
      .expect(payloadWithId, done);
  })

  it('responds with a 500 error when a bad payload is POST to /booking', function testCreateBadBooking(done){
    payload = { 'lastname': 'Brown', 'totalprice': 111, 'depositpaid': true, 'additionalneeds': 'Breakfast', 'bookingdates': {
        'checkin' : '2013-02-23',
        'checkout' : '2014-10-23'
      }
    }

    request(server)
      .post('/booking')
      .send(payload)
      .expect(500, done);
  })

  it('responds with a 200 when a payload with too many params is POST to /booking', function testCreateExtraPayload(done){
    payload = generatePayload('Robert', 'Brown', 222, true, 'Breakfast', '2013-02-23', '2014-10-23');
    payload.extra = 'bad'

    request(server)
      .post('/booking')
      .send(payload)
      .expect(200, done);
  })

  it('responds with the correct booking id when POSTing multiple payloads to /booking', function testBookingId(done){
    payload = generatePayload('Robert', 'Brown', 222, true, 'Breakfast', '2013-02-23', '2014-10-23');
    payload2 = generatePayload('Sally', 'Brown', 111, true, 'Breakfast', '2013-02-23', '2014-10-23');

    request(server)
      .post('/booking')
      .send(payload)
      .expect(200, done);

    request(server)
      .post('/booking')
      .send(payload2)
      .expect(function(res) {
        res.body.bookingid = '2'
      })
      .end(done)
  })

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});