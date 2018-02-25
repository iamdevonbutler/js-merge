# Functional object assign [![Build Status](https://travis-ci.org/iamdevonbutler/js-object-assign.svg?branch=master)](https://travis-ci.org/iamdevonbutler/js-object-assign)

**Requires: node >= 9**

## Installation
```
npm i --save js-object-assign
```

## Example
```javascript
const objectAssign = require('js-object-assign');

var obj = {
  a: 1,
};


var obj1 = {
  a: 1,
  b: 2,
};

var obj2 = {
  a: 1,
  c: [obj, obj1]
};

var result = objectAssign(obj, obj1, obj2, ...);

```

## License
MIT
