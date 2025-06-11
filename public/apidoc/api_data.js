define({ "api": [
  {
    "type": "post",
    "url": "auth",
    "title": "CreateToken",
    "name": "CreateToken",
    "group": "Auth",
    "version": "1.0.0",
    "description": "<p>Creates a new auth token to use for access to the PUT and DELETE /booking</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "defaultValue": "admin",
            "description": "<p>Username for authentication</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "defaultValue": "password123",
            "description": "<p>Password for authentication</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": "<p>Sets the format of payload you are sending</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example 1:",
        "content": "curl -X POST \\\n  https://restful-booker.herokuapp.com/auth \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    \"username\" : \"admin\",\n    \"password\" : \"password123\"\n}'",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token to use in future requests</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n    \"token\": \"abc123\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "booking",
    "title": "CreateBooking",
    "name": "CreateBooking",
    "group": "Booking",
    "version": "1.0.0",
    "description": "<p>Creates a new booking in the API</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname for the guest who made the booking</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname for the guest who made the booking</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "totalprice",
            "description": "<p>The total price for the booking</p>"
          },
          {
            "group": "Request body",
            "type": "Boolean",
            "optional": false,
            "field": "depositpaid",
            "description": "<p>Whether the deposit has been paid or not</p>"
          },
          {
            "group": "Request body",
            "type": "Date",
            "optional": false,
            "field": "bookingdates.checkin",
            "description": "<p>Date the guest is checking in</p>"
          },
          {
            "group": "Request body",
            "type": "Date",
            "optional": false,
            "field": "bookingdates.checkout",
            "description": "<p>Date the guest is checking out</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "additionalneeds",
            "description": "<p>Any other needs the guest has</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": "<p>Sets the format of payload you are sending. Can be application/json or text/xml</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Sets what format the response body is returned in. Can be application/json or application/xml</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "JSON example usage:",
        "content": "curl -X POST \\\n  https://restful-booker.herokuapp.com/booking \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    \"firstname\" : \"Jim\",\n    \"lastname\" : \"Brown\",\n    \"totalprice\" : 111,\n    \"depositpaid\" : true,\n    \"bookingdates\" : {\n        \"checkin\" : \"2018-01-01\",\n        \"checkout\" : \"2019-01-01\"\n    },\n    \"additionalneeds\" : \"Breakfast\"\n}'",
        "type": "json"
      },
      {
        "title": "XML example usage:",
        "content": "curl -X POST \\\n  https://restful-booker.herokuapp.com/booking \\\n  -H 'Content-Type: text/xml' \\\n  -d '<booking>\n    <firstname>Jim</firstname>\n    <lastname>Brown</lastname>\n    <totalprice>111</totalprice>\n    <depositpaid>true</depositpaid>\n    <bookingdates>\n      <checkin>2018-01-01</checkin>\n      <checkout>2019-01-01</checkout>\n    </bookingdates>\n    <additionalneeds>Breakfast</additionalneeds>\n  </booking>'",
        "type": "json"
      },
      {
        "title": "URLencoded example usage:",
        "content": "curl -X POST \\\n  https://restful-booker.herokuapp.com/booking \\\n  -H 'Content-Type: application/x-www-form-urlencoded' \\\n  -d 'firstname=Jim&lastname=Brown&totalprice=111&depositpaid=true&bookingdates%5Bcheckin%5D=2018-01-01&bookingdates%5Bcheckout%5D=2018-01-02'",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bookingid",
            "description": "<p>ID for newly created booking</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "booking",
            "description": "<p>Object that contains</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "booking.firstname",
            "description": "<p>Firstname for the guest who made the booking</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "booking.lastname",
            "description": "<p>Lastname for the guest who made the booking</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "booking.totalprice",
            "description": "<p>The total price for the booking</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "booking.depositpaid",
            "description": "<p>Whether the deposit has been paid or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "booking.bookingdates",
            "description": "<p>Sub-object that contains the checkin and checkout dates</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "booking.bookingdates.checkin",
            "description": "<p>Date the guest is checking in</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "booking.bookingdates.checkout",
            "description": "<p>Date the guest is checking out</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "booking.additionalneeds",
            "description": "<p>Any other needs the guest has</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "JSON Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n    \"bookingid\": 1,\n    \"booking\": {\n        \"firstname\": \"Jim\",\n        \"lastname\": \"Brown\",\n        \"totalprice\": 111,\n        \"depositpaid\": true,\n        \"bookingdates\": {\n            \"checkin\": \"2018-01-01\",\n            \"checkout\": \"2019-01-01\"\n        },\n        \"additionalneeds\": \"Breakfast\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "XML Response:",
          "content": "HTTP/1.1 200 OK\n\n<?xml version='1.0'?>\n<created-booking>\n    <bookingid>1</bookingid>\n    <booking>\n        <firstname>Jim</firstname>\n        <lastname>Brown</lastname>\n        <totalprice>111</totalprice>\n        <depositpaid>true</depositpaid>\n        <bookingdates>\n            <checkin>2018-01-01</checkin>\n            <checkout>2019-01-01</checkout>\n        </bookingdates>\n        <additionalneeds>Breakfast</additionalneeds>\n    </booking>\n</created-booking>",
          "type": "xml"
        },
        {
          "title": "URL Response:",
          "content": "HTTP/1.1 200 OK\n\nbookingid=1&booking%5Bfirstname%5D=Jim&booking%5Blastname%5D=Brown&booking%5Btotalprice%5D=111&booking%5Bdepositpaid%5D=true&booking%5Bbookingdates%5D%5Bcheckin%5D=2018-01-01&booking%5Bbookingdates%5D%5Bcheckout%5D=2019-01-01",
          "type": "url"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Booking"
  },
  {
    "type": "delete",
    "url": "booking/1",
    "title": "DeleteBooking",
    "name": "DeleteBooking",
    "group": "Booking",
    "version": "1.0.0",
    "description": "<p>Deletes a booking from the API. Requires an authorization token to be set in the header or a Basic auth header.</p>",
    "parameter": {
      "fields": {
        "Url Parameter": [
          {
            "group": "Url Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID for the booking you want to update</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "Cookie",
            "defaultValue": "token=&lt;token_value&gt;",
            "description": "<p>Sets an authorization token to access the DELETE endpoint, can be used as an alternative to the Authorization</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "Authorization",
            "defaultValue": "Basic",
            "description": "<p>YWRtaW46cGFzc3dvcmQxMjM=]   Basic authorization header to access the DELETE endpoint, can be used as an alternative to the Cookie header</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example 1 (Cookie):",
        "content": "curl -X DELETE \\\n  https://restful-booker.herokuapp.com/booking/1 \\\n  -H 'Content-Type: application/json' \\\n  -H 'Cookie: token=abc123'",
        "type": "json"
      },
      {
        "title": "Example 2 (Basic auth):",
        "content": "curl -X DELETE \\\n  https://restful-booker.herokuapp.com/booking/1 \\\n  -H 'Content-Type: application/json' \\\n  -H 'Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM='",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "OK",
            "description": "<p>Default HTTP 201 response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 201 Created",
          "type": "json"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Booking"
  },
  {
    "type": "get",
    "url": "booking/:id",
    "title": "GetBooking",
    "name": "GetBooking",
    "group": "Booking",
    "version": "1.0.0",
    "description": "<p>Returns a specific booking based upon the booking id provided</p>",
    "parameter": {
      "fields": {
        "Url Parameter": [
          {
            "group": "Url Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the booking you would like to retrieve</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Sets what format the response body is returned in. Can be application/json or application/xml</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example 1 (Get booking):",
        "content": "curl -i https://restful-booker.herokuapp.com/booking/1",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname for the guest who made the booking</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname for the guest who made the booking</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalprice",
            "description": "<p>The total price for the booking</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "depositpaid",
            "description": "<p>Whether the deposit has been paid or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "bookingdates",
            "description": "<p>Sub-object that contains the checkin and checkout dates</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "bookingdates.checkin",
            "description": "<p>Date the guest is checking in</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "bookingdates.checkout",
            "description": "<p>Date the guest is checking out</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "additionalneeds",
            "description": "<p>Any other needs the guest has</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "JSON Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n    \"firstname\": \"Sally\",\n    \"lastname\": \"Brown\",\n    \"totalprice\": 111,\n    \"depositpaid\": true,\n    \"bookingdates\": {\n        \"checkin\": \"2013-02-23\",\n        \"checkout\": \"2014-10-23\"\n    },\n    \"additionalneeds\": \"Breakfast\"\n}",
          "type": "json"
        },
        {
          "title": "XML Response:",
          "content": "HTTP/1.1 200 OK\n\n<booking>\n    <firstname>Sally</firstname>\n    <lastname>Brown</lastname>\n    <totalprice>111</totalprice>\n    <depositpaid>true</depositpaid>\n    <bookingdates>\n        <checkin>2013-02-23</checkin>\n        <checkout>2014-10-23</checkout>\n    </bookingdates>\n    <additionalneeds>Breakfast</additionalneeds>\n</booking>",
          "type": "xml"
        },
        {
          "title": "URL Response:",
          "content": "HTTP/1.1 200 OK\n\nfirstname=Jim&lastname=Brown&totalprice=111&depositpaid=true&bookingdates%5Bcheckin%5D=2018-01-01&bookingdates%5Bcheckout%5D=2019-01-01",
          "type": "url"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Booking"
  },
  {
    "type": "get",
    "url": "booking",
    "title": "GetBookingIds",
    "name": "GetBookings",
    "group": "Booking",
    "version": "1.0.0",
    "description": "<p>Returns the ids of all the bookings that exist within the API. Can take optional query strings to search and return a subset of booking ids.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstname",
            "description": "<p>Return bookings with a specific firstname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastname",
            "description": "<p>Return bookings with a specific lastname</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": true,
            "field": "checkin",
            "description": "<p>Return bookings that have a checkin date greater than or equal to the set checkin date. Format must be CCYY-MM-DD</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": true,
            "field": "checkout",
            "description": "<p>Return bookings that have a checkout date greater than or equal to the set checkout date. Format must be CCYY-MM-DD</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example 1 (All IDs):",
        "content": "curl -i https://restful-booker.herokuapp.com/booking",
        "type": "json"
      },
      {
        "title": "Example 2 (Filter by name):",
        "content": "curl -i https://restful-booker.herokuapp.com/booking?firstname=sally&lastname=brown",
        "type": "json"
      },
      {
        "title": "Example 3 (Filter by checkin/checkout date):",
        "content": "curl -i https://restful-booker.herokuapp.com/booking?checkin=2014-03-13&checkout=2014-05-21",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "object",
            "description": "<p>Array of objects that contain unique booking IDs</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "object.bookingid",
            "description": "<p>ID of a specific booking that matches search criteria</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n\n[\n  {\n    \"bookingid\": 1\n  },\n  {\n    \"bookingid\": 2\n  },\n  {\n    \"bookingid\": 3\n  },\n  {\n    \"bookingid\": 4\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Booking"
  },
  {
    "type": "patch",
    "url": "booking/:id",
    "title": "PartialUpdateBooking",
    "name": "PartialUpdateBooking",
    "group": "Booking",
    "version": "1.0.0",
    "description": "<p>Updates a current booking with a partial payload</p>",
    "parameter": {
      "fields": {
        "Url Parameter": [
          {
            "group": "Url Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID for the booking you want to update</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "firstname",
            "description": "<p>Firstname for the guest who made the booking</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "lastname",
            "description": "<p>Lastname for the guest who made the booking</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "totalprice",
            "description": "<p>The total price for the booking</p>"
          },
          {
            "group": "Request body",
            "type": "Boolean",
            "optional": true,
            "field": "depositpaid",
            "description": "<p>Whether the deposit has been paid or not</p>"
          },
          {
            "group": "Request body",
            "type": "Date",
            "optional": true,
            "field": "bookingdates.checkin",
            "description": "<p>Date the guest is checking in</p>"
          },
          {
            "group": "Request body",
            "type": "Date",
            "optional": true,
            "field": "bookingdates.checkout",
            "description": "<p>Date the guest is checking out</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "additionalneeds",
            "description": "<p>Any other needs the guest has</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": "<p>Sets the format of payload you are sending. Can be application/json or text/xml</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Sets what format the response body is returned in. Can be application/json or application/xml</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "Cookie",
            "defaultValue": "token=&lt;token_value&gt;",
            "description": "<p>Sets an authorization token to access the PUT endpoint, can be used as an alternative to the Authorization</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "Authorization",
            "defaultValue": "Basic",
            "description": "<p>YWRtaW46cGFzc3dvcmQxMjM=]   Basic authorization header to access the PUT endpoint, can be used as an alternative to the Cookie header</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "JSON example usage:",
        "content": "curl -X PUT \\\n  https://restful-booker.herokuapp.com/booking/1 \\\n  -H 'Content-Type: application/json' \\\n  -H 'Accept: application/json' \\\n  -H 'Cookie: token=abc123' \\\n  -d '{\n    \"firstname\" : \"James\",\n    \"lastname\" : \"Brown\"\n}'",
        "type": "json"
      },
      {
        "title": "XML example usage:",
        "content": "curl -X PUT \\\n  https://restful-booker.herokuapp.com/booking/1 \\\n  -H 'Content-Type: text/xml' \\\n  -H 'Accept: application/xml' \\\n  -H 'Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=' \\\n  -d '<booking>\n    <firstname>James</firstname>\n    <lastname>Brown</lastname>\n  </booking>'",
        "type": "json"
      },
      {
        "title": "URLencoded example usage:",
        "content": "curl -X PUT \\\n  https://restful-booker.herokuapp.com/booking/1 \\\n  -H 'Content-Type: application/x-www-form-urlencoded' \\\n  -H 'Accept: application/x-www-form-urlencoded' \\\n  -H 'Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=' \\\n  -d 'firstname=Jim&lastname=Brown'",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname for the guest who made the booking</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname for the guest who made the booking</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalprice",
            "description": "<p>The total price for the booking</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "depositpaid",
            "description": "<p>Whether the deposit has been paid or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "bookingdates",
            "description": "<p>Sub-object that contains the checkin and checkout dates</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "bookingdates.checkin",
            "description": "<p>Date the guest is checking in</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "bookingdates.checkout",
            "description": "<p>Date the guest is checking out</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "additionalneeds",
            "description": "<p>Any other needs the guest has</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "JSON Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n    \"firstname\" : \"James\",\n    \"lastname\" : \"Brown\",\n    \"totalprice\" : 111,\n    \"depositpaid\" : true,\n    \"bookingdates\" : {\n        \"checkin\" : \"2018-01-01\",\n        \"checkout\" : \"2019-01-01\"\n    },\n    \"additionalneeds\" : \"Breakfast\"\n}",
          "type": "json"
        },
        {
          "title": "XML Response:",
          "content": "HTTP/1.1 200 OK\n\n<booking>\n    <firstname>James</firstname>\n    <lastname>Brown</lastname>\n    <totalprice>111</totalprice>\n    <depositpaid>true</depositpaid>\n    <bookingdates>\n      <checkin>2018-01-01</checkin>\n      <checkout>2019-01-01</checkout>\n    </bookingdates>\n    <additionalneeds>Breakfast</additionalneeds>\n</booking>",
          "type": "xml"
        },
        {
          "title": "URL Response:",
          "content": "HTTP/1.1 200 OK\n\nfirstname=Jim&lastname=Brown&totalprice=111&depositpaid=true&bookingdates%5Bcheckin%5D=2018-01-01&bookingdates%5Bcheckout%5D=2019-01-01",
          "type": "url"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Booking"
  },
  {
    "type": "put",
    "url": "booking/:id",
    "title": "UpdateBooking",
    "name": "UpdateBooking",
    "group": "Booking",
    "version": "1.0.0",
    "description": "<p>Updates a current booking</p>",
    "parameter": {
      "fields": {
        "Url Parameter": [
          {
            "group": "Url Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID for the booking you want to update</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname for the guest who made the booking</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname for the guest who made the booking</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "totalprice",
            "description": "<p>The total price for the booking</p>"
          },
          {
            "group": "Request body",
            "type": "Boolean",
            "optional": false,
            "field": "depositpaid",
            "description": "<p>Whether the deposit has been paid or not</p>"
          },
          {
            "group": "Request body",
            "type": "Date",
            "optional": false,
            "field": "bookingdates.checkin",
            "description": "<p>Date the guest is checking in</p>"
          },
          {
            "group": "Request body",
            "type": "Date",
            "optional": false,
            "field": "bookingdates.checkout",
            "description": "<p>Date the guest is checking out</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "additionalneeds",
            "description": "<p>Any other needs the guest has</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": "<p>Sets the format of payload you are sending. Can be application/json or text/xml</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Sets what format the response body is returned in. Can be application/json or application/xml</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "Cookie",
            "defaultValue": "token=&lt;token_value&gt;",
            "description": "<p>Sets an authorization token to access the PUT endpoint, can be used as an alternative to the Authorization</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "Authorization",
            "defaultValue": "Basic",
            "description": "<p>YWRtaW46cGFzc3dvcmQxMjM=]   Basic authorization header to access the PUT endpoint, can be used as an alternative to the Cookie header</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "JSON example usage:",
        "content": "curl -X PUT \\\n  https://restful-booker.herokuapp.com/booking/1 \\\n  -H 'Content-Type: application/json' \\\n  -H 'Accept: application/json' \\\n  -H 'Cookie: token=abc123' \\\n  -d '{\n    \"firstname\" : \"James\",\n    \"lastname\" : \"Brown\",\n    \"totalprice\" : 111,\n    \"depositpaid\" : true,\n    \"bookingdates\" : {\n        \"checkin\" : \"2018-01-01\",\n        \"checkout\" : \"2019-01-01\"\n    },\n    \"additionalneeds\" : \"Breakfast\"\n}'",
        "type": "json"
      },
      {
        "title": "XML example usage:",
        "content": "curl -X PUT \\\n  https://restful-booker.herokuapp.com/booking/1 \\\n  -H 'Content-Type: text/xml' \\\n  -H 'Accept: application/xml' \\\n  -H 'Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=' \\\n  -d '<booking>\n    <firstname>James</firstname>\n    <lastname>Brown</lastname>\n    <totalprice>111</totalprice>\n    <depositpaid>true</depositpaid>\n    <bookingdates>\n      <checkin>2018-01-01</checkin>\n      <checkout>2019-01-01</checkout>\n    </bookingdates>\n    <additionalneeds>Breakfast</additionalneeds>\n  </booking>'",
        "type": "json"
      },
      {
        "title": "URLencoded example usage:",
        "content": "curl -X PUT \\\n  https://restful-booker.herokuapp.com/booking/1 \\\n  -H 'Content-Type: application/x-www-form-urlencoded' \\\n  -H 'Accept: application/x-www-form-urlencoded' \\\n  -H 'Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=' \\\n  -d 'firstname=Jim&lastname=Brown&totalprice=111&depositpaid=true&bookingdates%5Bcheckin%5D=2018-01-01&bookingdates%5Bcheckout%5D=2018-01-02'",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname for the guest who made the booking</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname for the guest who made the booking</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalprice",
            "description": "<p>The total price for the booking</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "depositpaid",
            "description": "<p>Whether the deposit has been paid or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "bookingdates",
            "description": "<p>Sub-object that contains the checkin and checkout dates</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "bookingdates.checkin",
            "description": "<p>Date the guest is checking in</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "bookingdates.checkout",
            "description": "<p>Date the guest is checking out</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "additionalneeds",
            "description": "<p>Any other needs the guest has</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "JSON Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n    \"firstname\" : \"James\",\n    \"lastname\" : \"Brown\",\n    \"totalprice\" : 111,\n    \"depositpaid\" : true,\n    \"bookingdates\" : {\n        \"checkin\" : \"2018-01-01\",\n        \"checkout\" : \"2019-01-01\"\n    },\n    \"additionalneeds\" : \"Breakfast\"\n}",
          "type": "json"
        },
        {
          "title": "XML Response:",
          "content": "HTTP/1.1 200 OK\n\n<booking>\n    <firstname>James</firstname>\n    <lastname>Brown</lastname>\n    <totalprice>111</totalprice>\n    <depositpaid>true</depositpaid>\n    <bookingdates>\n      <checkin>2018-01-01</checkin>\n      <checkout>2019-01-01</checkout>\n    </bookingdates>\n    <additionalneeds>Breakfast</additionalneeds>\n</booking>",
          "type": "xml"
        },
        {
          "title": "URL Response:",
          "content": "HTTP/1.1 200 OK\n\nfirstname=Jim&lastname=Brown&totalprice=111&depositpaid=true&bookingdates%5Bcheckin%5D=2018-01-01&bookingdates%5Bcheckout%5D=2019-01-01",
          "type": "url"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Booking"
  },
  {
    "type": "get",
    "url": "ping",
    "title": "HealthCheck",
    "name": "Ping",
    "group": "Ping",
    "version": "1.0.0",
    "description": "<p>A simple health check endpoint to confirm whether the API is up and running.</p>",
    "examples": [
      {
        "title": "Ping server:",
        "content": "curl -i https://restful-booker.herokuapp.com/ping",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "OK",
            "description": "<p>Default HTTP 201 response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 201 Created",
          "type": "json"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Ping"
  }
] });
