//
// https://shouldjs.github.io/
var should = require("should")

var shorty = require("../shorty")

describe("Shorty", function(){
  it("should create a unique url and be able to retrieve and delete the url", function(done){
    var s = shorty.getShortUrl("http://www.freecodecamp.com")
    // console.log(s)
    s.short_url.length.should.equal(4)
    shorty.isValidShortUrl(s.short_url).should.equal(true)
    shorty.getRealUrl(s.short_url).original_url.should.equal("http://www.freecodecamp.com")
    shorty.deleteShortUrl(s.short_url).should.equal(true)
    shorty.isValidShortUrl(s.short_url).should.equal(false)
    done()
  })

  it("should save the data and retrieve it", (done) => {
    shorty.empty()
    shorty.saveDb().then(()=>{
      var s = shorty.getShortUrl("http://www.freecodecamp.com")
      shorty.saveDb().then(()=>{
        shorty.empty()
        shorty.isValidShortUrl(s.short_url).should.equal(false)
        shorty.loadDb().then(()=>{
          shorty.isValidShortUrl(s.short_url).should.equal(true)
          done()
        })
      })
    })
  })

  it("should validate that the provided URL is a valid web URL", (done) => {
    var url1 = "http://www.freecodecamp.com"
    var url2 = "www.freecodecamp.com"
    var url3 = "freecodecamp.com"
    var url4 = "freecodecamp"
    var url5 = "http://freecodecamp.com"
    shorty.isValidWebUrl(url1).should.equal(true)
    shorty.isValidWebUrl(url2).should.equal(true)
    shorty.isValidWebUrl(url3).should.equal(false)
    shorty.isValidWebUrl(url4).should.equal(false)
    shorty.isValidWebUrl(url5).should.equal(true)
    done()
  })
})
