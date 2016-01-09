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
})
