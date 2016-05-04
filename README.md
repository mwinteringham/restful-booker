# restful-booker
A simple Node booking form for testing RESTful web services.

# Requirements
- Node 5.0.0
- Mongo 2.6.5

# Installation
1. Clone the repo
2. Navigate into the restful-booker root folder
3. Run ```npm install```
4. Run ```npm start```

# API
* [GET    /ping](https://github.com/mwinteringham/restful-booker#get-ping)
* [GET    /booking](https://github.com/mwinteringham/restful-booker#get-booking)
* [GET    /booking/{id}](https://github.com/mwinteringham/restful-booker#get-bookingid)
* [POST   /booking](https://github.com/mwinteringham/restful-booker#post-booking)
* [POST	/auth](https://github.com/mwinteringham/restful-booker#post-auth)
* [PUT    /booking/{id}](https://github.com/mwinteringham/restful-booker#put-bookingid)
* [DELETE /booking/{id}](https://github.com/mwinteringham/restful-booker#delete-bookingid)

## GET /ping

#### Usage
```GET /ping```

#### Response
200 OK - If application is up

## GET /booking
```
GET /booking
GET /booking?firstname=sally&lastname=brown
GET /booking?checkin=2014-03-13&checkout=2014-05-21
```

#### Parameters
* firstname - String - The firstname of the user
* lastname - String - The lastname of the user
* checkin - Date(CCYY-MM-DD) - The day in which person(s) checks in
* checkout - Date(CCYY-MM-DD) - The day in which person(s) checks out

#### Response
```
[
  {
    "bookingid": 1
  },
  {
    "bookingid": 2
  },
  {
    "bookingid": 3
  },
  {
    "bookingid": 4
  }
]
```

## GET /booking/{id}
```
GET /booking/1
```

#### Parameters
* id - String - The unique identifier of the booking

#### Response
##### Accept: application/json
```
{
    "firstname": "Sally",
    "lastname": "Brown",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2013-02-23",
        "checkout": "2014-10-23"
    },
    "additionalneeds": "Breakfast"
}
```
##### Accept: application/xml
```
<booking>
    <firstname>Sally</firstname>
    <lastname>Brown</lastname>
    <totalprice>111</totalprice>
    <depositpaid>true</depositpaid>
    <bookingdates>
        <checkin>2013-02-23</checkin>
        <checkout>2014-10-23</checkout>
    </bookingdates>
    <additionalneeds>Breakfast</additionalneeds>
</booking>
```

## POST /booking
```
POST /booking
```

#### Payload
##### Content-Type: text/xml
```
<booking>
    <firstname>Sally</firstname>
    <lastname>Brown</lastname>
    <totalprice>111</totalprice>
    <depositpaid>true</depositpaid>
    <additionalneeds>Breakfast</additionalneeds>
    <bookingdates>
        <checkin>2013/02/23</checkin>
        <checkout>2014/10/23</checkout>
    </bookingdates>
</booking>
```
##### Content-Type: application/json
```
{
    "firstname" : "Sally",
	"lastname" : "Brown",
	"totalprice" : 111,
	"depositpaid" : true,
	"additionalneeds" : "Breakfast",
	"bookingdates" : {
		"checkin" : "2013-02-23",
		"checkout" : "2014-10-23"
	}
}
```
#### Response
##### Accept: application/json
```
{
    "booking": {
        "firstname": "Sally",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "additionalneeds": "Breakfast",
        "bookingdates": {
            "checkin": "2013-02-23",
            "checkout": "2014-10-23"
        }
    },
    "link": {
        "rel": "self",
        "href": "http://localhost:3001/booking/1"
    }
}
```
##### Accept: application/xml
```
<?xml version="1.0" encoding="UTF-8"?>
<created-booking>
    <booking>
        <firstname>Sally</firstname>
        <lastname>Brown</lastname>
        <totalprice>111</totalprice>
        <depositpaid>true</depositpaid>
        <additionalneeds>Breakfast</additionalneeds>
        <bookingdates>
            <checkin>2013-02-23</checkin>
            <checkout>2014-10-23</checkout>
        </bookingdates>
    </booking>
    <link>
        <rel>self</rel>
        <href>http://localhost:3001/booking/1</href>
    </link>
</created-booking>
```

## POST /auth
```
POST /auth
```

#### Payload
```
{
    "username": "admin",
    "password": "password123"
}
```
#### Response
```
VHgTAuGPxvMsH1p
```

## PUT /booking/{id}
```
PUT /booking/1
```
#### Authorisation requirements
* Cookie: token={token received from /auth}

#### Parameters
* id - String - The unique identifier of the booking

#### Payload
##### Content-Type: text/xml
```
<booking>
    <firstname>Sally</firstname>
    <lastname>Brown</lastname>
    <totalprice>111</totalprice>
    <depositpaid>true</depositpaid>
    <additionalneeds>Breakfast</additionalneeds>
    <bookingdates>
        <checkin>2013/02/23</checkin>
        <checkout>2014/10/23</checkout>
    </bookingdates>
</booking>
```
##### Content-Type: application/json
```
{
    "firstname" : "Sally",
	"lastname" : "Brown",
	"totalprice" : 111,
	"depositpaid" : true,
	"additionalneeds" : "Breakfast",
	"bookingdates" : {
		"checkin" : "2013-02-23",
		"checkout" : "2014-10-23"
	}
}
```
#### Response
##### Accept: application/json
```
{
    "id": "1",
    "firstname": "Sally",
    "lastname": "Brown",
    "totalprice": 111,
    "depositpaid": true,
    "additionalneeds": "Breakfast",
    "bookingdates": {
        "checkin": "2013-02-23",
        "checkout": "2014-10-23"
    }
}
```
##### Accept: application/xml
```
<?xml version="1.0" encoding="UTF-8"?>
<booking>
    <id>1</id>
    <firstname>Sally</firstname>
    <lastname>Brown</lastname>
    <totalprice>111</totalprice>
    <depositpaid>true</depositpaid>
    <additionalneeds>Breakfast</additionalneeds>
    <bookingdates>
        <checkin>2013-02-23</checkin>
        <checkout>2014-10-23</checkout>
    </bookingdates>
</booking>
```

## DELETE /booking/{id}
```
DELETE /booking/1
```
#### Authorisation requirements
* Cookie: token={token received from /auth}

#### Parameters
* id - String - The unique identifier of the booking

#### Response
204 - On successful delete
