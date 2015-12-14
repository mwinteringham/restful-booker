var request      = require('supertest-as-promised'),
    expect       = require('chai').expect,
    should       = require('chai').should(),
    mongoose     = require('mongoose'),
    js2xmlparser = require("js2xmlparser"),
    assert       = require('assert'),
    chai         = require('chai').should();

mongoose.createConnection('mongodb://localhost/restful-booker2');

var generatePayload = function(firstname, lastname, totalprice, depositpaid, additionalneeds, checkin, checkout){
  var payload = {
      'firstname': firstname,
      'lastname': lastname,
      'totalprice': totalprice,
      'depositpaid': depositpaid,
      'bookingdates': {
        'checkin': checkin,
        'checkout': checkout
      }
    }

  if(typeof(additionalneeds) !== 'undefined'){
    payload.additionalneeds = additionalneeds;
  }

  return payload
}

var payload  = generatePayload('Sally', 'Brown', 111, true, 'Breakfast', '2013-02-01', '2013-02-04'),
    payload2 = generatePayload('Geoff', 'White', 111, true, 'Breakfast', '2013-02-02', '2013-02-05'),
    payload3 = generatePayload('Bob', 'Brown', 111, true, 'Breakfast', '2013-02-03', '2013-02-06');

var server = require('../app')

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

  it('should startup with 10 records', function testRandomGenerator(done){
    request(server)
      .get('/booking')
      .send(payload)
      .expect(function(res){
        assert.equal(res.body.length, 10)
      })
      .end(done);
  })
});

describe('restful-booker - GET /booking', function () {

  beforeEach(function(){
    mongoose.connection.db.dropDatabase();
  })

  it('responds with all booking ids when GET /booking', function testGetAllBookings(done){
    request(server)
      .post('/booking')
      .send(payload)
      .then(function(){
        return request(server)
          .post('/booking')
          .send(payload2)
      }).then(function(){
        request(server)
          .get('/booking')
          .expect(200)
          .expect([{"bookingid": 1},{"bookingid": 2}], done)
      });
  });

  it('responds with a subset of booking ids when searching by firstname date', function testQueryString(done){
    request(server)
      .post('/booking')
      .send(payload)
      .then(function(){
        return request(server)
          .post('/booking')
          .send(payload2)
      }).then(function(){
        request(server)
          .get('/booking?firstname=Geoff')
          .expect(200)
          .expect([{"bookingid": 2}], done)
      })
  });

  it('responds with a subset of booking ids when searching by lastname date', function testQueryString(done){
    request(server)
      .post('/booking')
      .send(payload)
      .then(function(){
        return request(server)
          .post('/booking')
          .send(payload2)
      }).then(function(){
        request(server)
          .get('/booking?lastname=White')
          .expect(200)
          .expect([{"bookingid": 2}], done)
      })
  });

  it('responds with a subset of booking ids when searching for checkin date', function testQueryString(done){
    request(server)
      .post('/booking')
      .send(payload)
      .then(function(){
        return request(server)
          .post('/booking')
          .send(payload2)
      }).then(function(){
        request(server)
          .get('/booking?checkin=2013-02-01')
          .expect(200)
          .expect([{"bookingid": 2}], done)
      })
  });

  it('responds with a subset of booking ids when searching for checkout date', function testQueryString(done){
    request(server)
      .post('/booking')
      .send(payload)
      .then(function(){
        return request(server)
          .post('/booking')
          .send(payload2)
      }).then(function(){
        request(server)
          .get('/booking?checkout=2013-02-05')
          .expect(200)
          .expect([{"bookingid": 1}], done)
      })
  });

  it('responds with a subset of booking ids when searching for checkin and checkout date', function testQueryString(done){
    request(server)
      .post('/booking')
      .send(payload)
      .then(function(){
        return request(server)
          .post('/booking')
          .send(payload2)
      }).then(function(){
        return request(server)
          .post('/booking')
          .send(payload3)
      }).then(function(){
        request(server)
          .get('/booking?checkin=2013-02-01&checkout=2013-02-06')
          .expect(200)
          .expect([{"bookingid": 2}], done)
      });
  });

  it('responds with a subset of booking ids when searching for name, checkin and checkout date', function testQueryString(done){
    request(server)
      .post('/booking')
      .send(payload)
      .then(function(){
        return request(server)
          .post('/booking')
          .send(payload2)
      }).then(function(){
        return request(server)
          .post('/booking')
          .send(payload3)
      }).then(function(){
        request(server)
          .get('/booking?firstname=Geoff&lastname=White&checkin=2013-02-01&checkout=2013-02-06')
          .expect(200)
          .expect([{"bookingid": 2}], done)
      })
  });

  it('responds with a 500 error when GET /booking with a bad date query string', function testGetWithBadDate(done){
    request(server)
      .get('/booking?checkout=2013-02-0')
      .expect(500, done)
  });

  it('responds with a payload when GET /booking/{id}', function testGetOneBooking(done){
    request(server)
      .post('/booking')
      .send(payload)
      .then(function(){
        request(server)
          .get('/booking/1')
          .expect(200)
          .expect(payload, done)
      });
  });

  it('responds with an XML payload when GET /booking/{id} with accept application/xml', function testGetWithXMLAccept(done){
    xmlPayload = js2xmlparser('booking', payload)

    request(server)
      .post('/booking')
      .send(payload)
      .then(function(){
        request(server)
          .get('/booking/1')
          .set('Accept', 'application/xml')
          .expect(200)
          .expect(xmlPayload, done)
      });
  });

});

describe('restful-booker - POST /booking', function () {
  beforeEach(function(){
    mongoose.connection.db.dropDatabase();
  })

  it('responds with the created booking and assigned booking id', function testCreateBooking(done){
    request(server)
      .post('/booking')
      .send(payload)
      .expect(200)
      .expect({"bookingid": 1, "booking" : payload}, done);
  });

  it('responds with the created booking and assigned booking id when sent an XML payload', function testCreateBooking(done){
    var xmlPayload = js2xmlparser('booking', payload)

    request(server)
      .post('/booking')
      .set('Content-type', 'text/xml')
      .send(xmlPayload)
      .expect(200)
      .expect({"bookingid": 1, "booking" : payload}, done);
  });

  it('responds with a 500 error when a bad payload is sent', function testCreateBadBooking(done){
    badpayload = { 'lastname': 'Brown', 'totalprice': 111, 'depositpaid': true, 'additionalneeds': 'Breakfast'}

    request(server)
      .post('/booking')
      .send(badpayload)
      .expect(500, done);
  });

  it('responds with a 200 when a payload with too many params are sent', function testCreateExtraPayload(done){
    var extraPayload = payload
    extraPayload.extra = 'bad'

    request(server)
      .post('/booking')
      .send(payload)
      .expect(200, done);
  });

  it('responds with the correct assigned booking id when multiple payloads are sent', function testBookingId(done){
    request(server)
      .post('/booking')
      .send(payload)
      .then(function(){
        request(server)
          .post('/booking')
          .send(payload2)
          .expect(200)
          .expect(function(res) {
            assert.equal(res.body.bookingid, 2)
          })
          .end(done)
      })
  });

  it('responds with an XML payload when POST /booking/ with accept application/xml', function testGetWithXMLAccept(done){
    var xmlPayload = js2xmlparser('created-booking', { "bookingid": 1, "booking": payload2 })

    request(server)
      .post('/booking')
      .set('Accept', 'application/xml')
      .send(payload2)
      .expect(200)
      .expect(xmlPayload, done);
  });
});

describe('restful-booker POST /auth', function(){

  it('responds with a 200 and a token to use when POSTing a valid credential', function testAuthReturnsToken(done){
    request(server)
      .post('/auth')
      .send({'username': 'admin', 'password': 'password123'})
      .expect(200)
      .expect(function(res){
        res.body.should.have.property('token').and.to.match(/[a-zA-Z0-9]{15,}/);
      })
      .end(done)
  })

  it('responds with a 200 and a message informing of login failed when POSTing invalid credential', function testAuthReturnsError(done){
    request(server)
      .post('/auth')
      .send({'username': 'nimda', 'password': '321drowssap'})
      .expect(200)
      .expect(function(res){
        res.body.should.have.property('reason').and.to.equal('Bad credentials');
      })
      .end(done)
  })

});

describe('restful-booker - PUT /booking', function () {

  it('responds with a 403 when no token is sent', function testNoLoginForPut(done){
    request(server)
      .put('/booking/1')
      .expect(403, done);
  });

  it('responds with a 403 when not authorised', function testBadLoginForPut(done){
      request(server)
        .post('/auth')
        .send({'username': 'nmida', 'password': '321drowssap'})
        .expect(200)
        .then(function(res){
          request(server)
            .put('/booking/1')
            .set('Cookie', 'token=' + res.body.token)
            .send(payload2)
            .expect(403, done)
        })
  });

  it('responds with a 200 and an updated payload', function testUpdatingABooking(done){
    request(server)
      .post('/booking')
      .send(payload)
      .then(function(){
        return request(server)
          .post('/auth')
          .send({'username': 'admin', 'password': 'password123'})
      })
      .then(function(res){
        request(server)
          .put('/booking/1')
          .set('Cookie', 'token=' + res.body.token)
          .send(payload2)
          .expect(200)
          .expect(payload2, done);
      })
  });

  it('responds with a 200 and an updated payload when requesting with an XML', function testUpdatingABookingWithXML(done){
    var xmlPayload = js2xmlparser('booking', payload2)

    request(server)
      .post('/booking')
      .send(payload)
      .then(function(){
        return request(server)
          .post('/auth')
          .send({'username': 'admin', 'password': 'password123'})
      })
      .then(function(res){
        request(server)
          .put('/booking/1')
          .set('Cookie', 'token=' + res.body.token)
          .set('Content-type', 'text/xml')
          .send(xmlPayload)
          .expect(200)
          .expect(payload2, done);
      })
  });

  it('responds with an XML payload when PUT /booking with accept application/xml', function testPutWithXMLAccept(done){
    xmlPayload = js2xmlparser('booking', payload2)

    request(server)
      .post('/booking')
      .send(payload)
      .then(function(){
        return request(server)
          .post('/auth')
          .send({'username': 'admin', 'password': 'password123'})
      })
      .then(function(res){
        request(server)
          .put('/booking/1')
          .set('Cookie', 'token=' + res.body.token)
          .set('Accept', 'application/xml')
          .send(payload2)
          .expect(200)
          .expect(xmlPayload, done);
      })
  });
});

describe('restful-booker DELETE /booking', function(){

  it('responds with a 403 when not authorised', function testNoLoginForDelete(done){
    request(server)
      .delete('/booking/1')
      .expect(403, done);
  });

  it('responds with a 403 when not authorised', function testBadLoginForDelete(done){
      request(server)
        .post('/auth')
        .send({'username': 'nmida', 'password': '321drowssap'})
        .expect(200)
        .then(function(res){
          request(server)
            .delete('/booking/1')
            .set('Cookie', 'token=' + res.body.token)
            .expect(403, done)
        })
  })

  it('responds with a 201 when deleting an existing booking', function testDeletingAValidBooking(done){
    request(server)
      .post('/booking')
      .send(payload)
      .then(function(){
        return request(server)
          .post('/auth')
          .send({'username': 'admin', 'password': 'password123'})
      })
      .then(function(res){
        return request(server)
          .delete('/booking/1')
          .set('Cookie', 'token=' + res.body.token)
          .expect(201)
      }).then(function(){
        request(server)
          .get('/booking/1')
          .expect(404, done)
      });
  });

});