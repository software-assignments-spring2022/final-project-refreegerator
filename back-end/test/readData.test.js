const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe("JSON return", () => {
    it("will be accessed", done => {
      chai.request(server)
        .get("/UserList")
        .send("milk")
        .then(function(res){
          expect(res).to.be.json;
        })
        .catch(function (err){
          throw err;
        })
  })
  })