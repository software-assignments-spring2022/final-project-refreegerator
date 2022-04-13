//One-off unit test for recipe function
const assert = require('chai').assert;
const { expect } = require('chai');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const app = require('../app');

var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.request(app)
    .get('/UserList')
    .send({'itemName': 'Bread'})
    .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        console.log(res.text);
        
    });
    chai.request(app)
