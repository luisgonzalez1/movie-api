const { Before, Given, Then, When } = require('cucumber');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../../../dist/index');

chai.use(chaiHttp);
chai.should();

let url = '';
let resp = null;

Given('The url is {string}', function (input) {
  url = input;
})

When('Method is GET', () => {
  resp = chai.request(server).get(url);
})

Then('Status should be {int} and content should be {string}', (status, content) => {
  expect(resp).to.not.equal(null);
  return resp &&
    resp.then(res => {
      res.status.should.equal(status); // can use should or expect or asser, but BDD typically would use should or expect
      expect(res.body.content).to.equal(content);
    },
      err => {
        console.log(err);
      })

})