const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../../src/app');

// Assertion style
chai.should();
chai.use(chaihttp);

describe('tester', () => {
  if ('should return the array', (done) => {
    chai.request(app)
        .get('/test')
        .end(( _, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.be.eq(3);
          done();
        });
  });
});
