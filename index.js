// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// (2) Request to /api/:date? return JSON object with unix key and Unix timestamp of input date in milliseconds
// (3) Request to /api/:date? return JSON object with utc key and input date with UTC formatting
// (4) Request to /api/1451001600000 returns JSON { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT"}
// (5) Your project can handle dates that can be successfully parsed by new Date(date_string)
// (6) If the input date string is invalid, the API returns an object having the structure { error: "Invalid Date" }
app.get("/api/:date", function(req, res) {
	var theDate = req.params.date;
	var dateObject = new Date(theDate);

	if (/\d{5,}/.test(theDate)) {
		let dateInt = parseInt(theDate);
		res.json({unix: dateInt, utc: (new Date(dateInt)).toUTCString()});

	} else if(dateObject.toString() == "Invalid Date") {
		res.json({error: "Invalid Date"});

	}  else {
		res.json({unix: dateObject.getTime(), utc: dateObject.toUTCString()});
	}
	
})

// (7) An empty date parameter should return the current time in a JSON object with a unix key
// (8) An empty date parameter should return the current time in a JSON object with a utc key
app.get("/api/", function(req, res) {
	const current = new Date();
	res.json({unix: current.getTime(), utc: current.toUTCString()});
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
