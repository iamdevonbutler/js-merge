const objectAssign = require('../lib');

const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;

// what happens when given no params or just one.
// rename js-package-name
// fix all uses of istype for objects. need to not be a date.
function isEqual(...objs) {

  function compare(obj, obj1) {
    for (let i in obj) {
      if (obj1[i] === undefined) {
        return false;
      }
      if (isArray(obj[i])) {
        if (!compareArrays(obj[i], obj1[i])) {
          return false;
        }
      }
      else if (isObject(obj[i])) {
        if (!compareObjects(obj[i], obj1[i])) {
          return false;
        }
      }
      else if (isDate(obj[i])) {
        if (!compareDates(obj[i], obj1[i])) {
          return false;
        }
      }
      else {
        if (obj[i] !== obj1[i]) {
          return false;
        }
      }
    }
    return true;
  };

  function compareArrays(obj, obj1) {
    if (!isArray(obj1)) return false;
    if (obj.length !== obj1.length) return false;
    var equal = compare(obj, obj1);
    return equal;
  };

  function compareObjects(obj, obj1) {
    if (!isObject(obj1)) return false;
    for (let key in obj1) {
      if (obj[key] === undefined) {
        return false;
      }
    }
    var equal = compare(obj, obj1);
    return equal;
  };

  function compareDates(obj, obj1) {
    if (!isDate(obj1[key]) || obj.getTime() !== obj1.getTime()) {
      return false;
    }
    return true;
  };

  for (let i in objs) {
    i = +i;
    if (objs[i+1] !== undefined) {
      if (isArray(objs[i])) {
        if (!compareArrays(objs[i], objs[i+1])) {
          return false;
        }
      }
      else if (isObject(objs[i])) {
        if (!compareObjects(objs[i], objs[i+1])) {
          return false;
        }
      }
      else if (isDate(objs[i])) {
        if (!compateDates(objs[i], objs[i+1])) {
          return false;
        }
      }
      else {
        if (obj[i] !== obj1[i]) {
          return false;
        }
      }
    }
  };

  return true;
};

function isArray(obj) {
  return Array.isArray(obj);
}

function isObject(obj) {
  return typeof obj === 'object' && obj !== null && Array.isArray(obj) == false && !(obj instanceof Date);
}

function isDate(obj) {
  return obj instanceof Date;
}

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

console.log( isEqual([1, {a: [1, {a: 1}]}], [1, {a: [1, {a: 1}]}]) );
return;

describe('functional-object-assign tests', () => {
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
