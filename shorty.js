var fs = require("fs")
var RSVP = require("rsvp")
var Promise = RSVP.Promise

// Go this from "http://stackoverflow.com/a/1349426".
function getRandomCharSeq(length) {
	var text = ""
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	for(var i=0; i < length; i++ ) {
			text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

// The db file must be created and have "[]" in it before starting this service.
var _dbFilename = "url.json"
// {original_url: "", short_url: ""}
var _urls = []

var _hostUrl = process.env.SHORTY_HOST_URL || ""

// Takes a given url and creates a new short URL. Ensures that the ID is
// available.
exports.getShortUrl = function(originalUrl){
	if (_urls.length > 1000) {
		throw "Exceeded short URL limit."
	}
	// First get a random unused short URL.
	var shortUrl = getRandomCharSeq(4)
	var currentShortUrls = _urls.map(function(url){
		return url.short_url
	})
	while (currentShortUrls.indexOf(shortUrl) > -1) {
		shortUrl = getRandomCharSeq(4)
	}
	var newItem = {original_url: originalUrl, short_url: shortUrl}
	_urls.push(newItem)
	newItem.short_url = _hostUrl + shortUrl
	return newItem
}

// Saves the JSON database to a file.
exports.saveDb = () => {
	// console.log(JSON.stringify(_urls))
	var p = new Promise((resolve,reject) => {
		fs.writeFile(_dbFilename, JSON.stringify(_urls, null, "  "), {}, (err) => {
			if (err) {
				// throw err
				reject(err)
			}
			// console.log("Saved URL DB.")
			resolve()
		})
	})
	return p
}

exports.saveDbSync = () => {
	fs.writeFileSync(_dbFilename, JSON.stringify(_url, null, " "), {})
}

// Loads the JSON database from a file.
exports.loadDb = function(){
	var p = new Promise((resolve,reject) => {
		fs.readFile(_dbFilename, function(err, data){
			if (err) {
				// throw err
				reject(err)
			}
			_urls = JSON.parse(data);
			resolve()
		})
	})
	return p
}

// Checks to see if the URL is valid in our database if it is it returns true.
exports.isValidShortUrl = function(shortUrl){
	var currentShortUrls = _urls.map(function(url){
		return url.short_url
	})
	if (currentShortUrls.indexOf(shortUrl) > -1) {
		return true
	}
	return false
}

exports.getRealUrl = function(shortUrl){
	var currentShortUrls = _urls.map(function(url){
		return url.short_url
	})
	if (currentShortUrls.indexOf(shortUrl) > -1) {
		return _urls[currentShortUrls.indexOf(shortUrl)]
	}
	return undefined
}

exports.deleteShortUrl = function(shortUrl){
	var currentShortUrls = _urls.map(function(url){
		return url.short_url
	})
	if (currentShortUrls.indexOf(shortUrl) > -1) {
		delete _urls[currentShortUrls.indexOf(shortUrl)]
		return true
	}
	return false
}

// Clears the database of URLs.
exports.empty = () => {
	_urls = []
}

module.exports = exports
