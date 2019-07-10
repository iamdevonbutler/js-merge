module.exports = merge;

function merge(...objs) {
  var result = objs
    .filter(item => isObject(item))
    .reduce((p, c) => {
      var keys = Object.keys(c);
      keys.forEach(key => {
        if (isObject(c[key])) {
          p[key] = merge(isObject(p[key]) ? p[key] : {}, c[key]);
        }
        else if (isArray(c[key])) {
          p[key] = arrayMerge(c[key]);
        }
        else {
          p[key] = c[key];
        }
      });
      return p;
  }, {});
  return result;
};

function arrayMerge(obj) {
  var obj1 = obj.map(item => {
    if (isObject(item)) {
      return merge(item);
    }
    else if (isArray(item)) {
      return arrayMerge(item);
    }
    else {
      return item;
    }
  });
  return obj1;
};

function isArray(obj) {
  return Array.isArray(obj);
};

function isObject(obj) {
  return typeof obj === 'object' && obj !== null && Array.isArray(obj) === false && !(obj instanceof Date);
};
