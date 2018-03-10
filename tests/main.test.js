const objectAssign = require('../lib');
const isEqual = require('js-isequal');

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

var nestedArray = [1, obj];
var array = [obj1, nestedArray];
var obj2 = {
  h: array,
};

var actual = objectAssign(obj, obj1, obj2);

var expectedArray = [{
  b: 3,
  c: {
    e: 4,
    f: 5,
  },
  g: 6,
}, [1, {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 1,
  }
}]];

var expected = {
  a: 1,
  b: 3,
  c: {
    d: 3,
    e: 4,
    f: 5,
  },
  g: 6,
  h: expectedArray,
};

describe('js-object-assign tests', () => {
  it ('should ignore non-object values', () => {
    var result = objectAssign({a: 1}, null, {}, [], false, 1, '', 'str', () => {});
    expect(isEqual(result, {a: 1})).to.be.true;
  });
  it ('should properly assign new values', () => {
    expect(isEqual(actual, expected)).to.be.true;
  });
  it ('should not reference the src objects - when a src obj is mutated', () => {
    obj.a = 99;
    expect(isEqual(actual, expected)).to.be.true;
    obj1.a = 99;
    expect(isEqual(actual, expected)).to.be.true;
  });
  it ('should not reference the src objects - when a src array is mutated', () => {
    obj2.h.push(99);
    expect(isEqual(actual, expected)).to.be.true;
    array.push(99);
    expect(isEqual(actual, expected)).to.be.true;
  });
  it ('should not reference the src objects - when a nested src array is mutated', () => {
    nestedArray.push(99);
    expect(isEqual(actual, expected)).to.be.true;
    obj2.h[1].push(99);
    expect(isEqual(actual, expected)).to.be.true;
  });
});
