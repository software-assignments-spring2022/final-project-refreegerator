const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

// describe("GET request to /UserList route", () => {
//   it("respond with an HTTP 200 status code and an object in the response body", done => {
//     chai
//       .request(server)
//       .get("/UserList")
//       .end((err, res) => {
//         res.should.have.status(200) 
//         res.body.should.be.a('array') 
//         done() 
//       })
//   })
// })