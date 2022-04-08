const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe("POST request to /add route", () => {
  it("respond with an HTTP 200 status code and an object in the response body", done => {
    chai
      .request(server)
      .post("/add/save")
      .end((err, res) => {
        res.should.have.status(200) 
        res.body.should.be.a("object") 
        done() 
      })
  })
})