var express = require('express');
var logger = require('morgan');
var path = require('path');
var router = express.Router();
var RSVP = require("rsvp")
var Promise = RSVP.Promise
var fs = require("fs")
var path = require("path")
var marked = require("marked")

var shorty = require("./shorty")

shorty.loadDb()

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'))

// Routes
////////////////////////////////////////////////////////////////////////////////

router.get("/", function(req, res, next){
  // Render the README file.
  var p = new Promise(function(res, rej){
    fs.readFile("README.md", "utf8", function(err, data) {
      if (err) throw err
      res(data)
    })
  }).then(function(val){
    res.status(200).send(marked(val.toString()))
  })
})

router.get(/\/new\/(.*)/, function(req, res, next){
  // console.log("here " + req.params[0])
  // res.status(200).send(req.params[0])
  var originalUrl = req.params[0]
  var s = shorty.getShortUrl(originalUrl)
  console.log(s)
  res.status(200).json(s)
})

router.get(/\/(....)/, function(req, res, next){
  var shortUrl = req.params[0]
  console.log(shortUrl)
  if (shorty.isValidShortUrl(shortUrl)) {
    var s = shorty.getRealUrl(shortUrl)
    res.redirect(s.original_url)
  } else {
    res.status(200).send("Not a valid short URL.")
  }
})

app.use(router)

process.on("SIGTERM", () => {
  console.log("Got SIGTERM. Saving DB.")
  shorty.saveDbSync()
})

// Error Handlers
////////////////////////////////////////////////////////////////////////////////

// Development Error Handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production Error Handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
