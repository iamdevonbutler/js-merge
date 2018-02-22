const lib = require('../lib');

const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;

var obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 1,
  }
};

var obj1 = {
  b: 3,
  c: {
    e: 4,
    f: 5,
  },
  g: 6,
};

var array = [1, obj, obj1];
var array1 = [obj, obj1, array];
var obj2 = {
  h: array,
};

var obj3 = {
  // h: ['hey'],
};

var result = lib(obj, obj1, obj2, obj3);

console.log(result);

describe('functional-object-assign tests', () => {
  it ('should properly assign new values', () => {
    // expect(obj3).to.deep.eql({
    //   a: 1,
    //   b: 3,
    //   f: [obj, obj1],
    // });
  });
  it ('should not modify the src objects', () => {

  });
});
