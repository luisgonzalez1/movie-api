const { Before, Given, Then, When } = require('cucumber');
const chai = require('chai');
const expect = chai.expect;
const incrementer = require('../incrementer');

let variable = 0;

Given('I have a variable with value {int}', function (input) {
  variable = input;
})

When('I increment by {int}', (input) => {
  variable = incrementer(variable, input);
})

Then('I should get {int}', (input) => {
  expect(variable).to.equal(input);
})