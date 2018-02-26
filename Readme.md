# js-object-assign [![Build Status](https://travis-ci.org/iamdevonbutler/js-object-assign.svg?branch=master)](https://travis-ci.org/iamdevonbutler/js-object-assign)

Functional recursive object assign.

**engines: node >= 9.x**

## Installation
```
npm i --save js-object-assign
```

## Example
```javascript
const objectAssign = require('js-object-assign');

var obj = {
  a: 1,
  b: {
    c: 2,
  },
};

var obj1 = {
  a: 1,
  b: {
    c: 3,
  },
};

var obj2 = {
  a: 1,
  d: [obj, obj1] // Breaks Object references.
};

var result = objectAssign(obj, obj1, obj2, ...);
console.log(result);
/*
{ a: 1,
  b: { c: 3 },
  d: [{
    a: 1, b: [{ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }]
  },{
    a: 1, b: [{ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }]
  }]
}
 */

```

## License
MIT
