var {map, reduce} = require('algos');

function merge(...objs) {
  var result = reduce(objs, (p, c) => {
    var keys = Object.keys(c);
    keys.forEach(key => {
      if (isObject(c[key])) {
        p[key] = merge(isObject(p[key]) ? p[key] : {}, c[key]);
      }
      else if (Array.isArray(c[key])) {
        p[key] = arrayMerge(c[key]);
      }
      else {
        p[key] = c[key];
      }
    }, []);
    return p;
  }, {});
  return result;
};

function arrayMerge(obj) {
  var obj1 = map(obj, item => {
    if (Array.isArray(item)) {
      return arrayMerge(item);
    }
    else if (typeof obj === 'object' && obj !== null && (obj instanceof Date) === false) {
      return merge(item);
    }
    else {
      return item;
    }
  });
  return obj1;
};
