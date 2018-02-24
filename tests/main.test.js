const objectAssign = require('../lib');

const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;

// @todo compare arrays too.
// dates .getTime() instanceof Date
// what happens when given no params or just one.
// rename js-package-name
function deepEqual(...objs) {
  var equal = true;
  function compareArrays(obj, obj1) {
    let equal = true;
    obj[key].forEach((item, i) => {
      if (isObject(obj[key])) {
        if (!deepEqual(obj[key], obj1[key])) {
          equal = false;
        }
      }
      else if (obj[key] !== obj1[key]) {
        equal = false;
      }
    });
  }
  function compareObjects(obj, obj1) {
    for (let key in obj) {
      if (obj1[key] === undefined) {
        return false;
      }
      if (isArray(obj[key])) {
        if (!compareArrays(obj[key], obj1[key])) {
          return false;
        }
      }
      else if (isDate(obj[key])) {
        if (!(obj1[key] instanceof Date) || obj[key].getTime() !== obj1[key].getTime()) {
          return false;
        }
      }
      else if (isObject(obj[key])) {
        if (!compareObjects(obj[key], obj1[key])) {
          return false;
        }
      }
      else if (obj[key] !== obj1[key]) {
        return false;
      }
    }
    for (let key in obj1) {
      if (obj[key] === undefined) {
        return false;
      }
    }
    return true;
  }
  objs.forEach((obj, i) => {
    if (objs[i+1] !== undefined) {
      if (isArray(objs[i])) {
        if (!isArray(objs[i+1]) || !compareArrays(objs[i], objs[i+1]) {
          equal = false;
        }
      }
      else if (isObject(objs[i])) {
        if (!isObject(objs[i+1]) || !compareObjects(objs[i], objs[i+1]) {
          equal = false;
        }
      }
      equal = false;
    }
  });
  return equal;
};

function isArray(obj) {
  return Array.isArray(obj);
}

function isObject(obj) {
  return typeof obj === 'object' && obj !== null && Array.isArray(obj) == false;
}

// console.log(deepEqual({a: 1, b: 2}, {a: 1, b: 2}));
// return;





















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

describe('functional-object-assign tests', () => {
  it ('should properly assign new values', () => {
    expect(deepEqual(actual, expected)).to.be.true;
  });
  // it ('should not reference the src objects - when a src obj is mutated', () => {
  //   obj.a = 99;
  //   expect(deepEqual(actual, expected)).to.be.true;
  //   obj1.a = 99;
  //   expect(deepEqual(actual, expected)).to.be.true;
  // });
  // it ('should not reference the src objects - when a src array is mutated', () => {
  //   obj2.h.push(99);
  //   expect(deepEqual(actual, expected)).to.be.true;
  //   array.push(99);
  //   expect(deepEqual(actual, expected)).to.be.true;
  //
  // });
  // it ('should not reference the src objects - when a nested src array is mutated', () => {
  //   nestedArray.push(99);
  //   expect(deepEqual(actual, expected)).to.be.true;
  //   obj2.h[1].push(99);
  //   expect(deepEqual(actual, expected)).to.be.true;
  // });
});
