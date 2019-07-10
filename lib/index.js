module.exports = assign;

function assign(...objs) {
  var result = objs
    .reduce((p, c) => {
      var keys = Object.keys(c);
      keys.forEach(key => {
        if (isObject(c[key])) {
          p[key] = assign(isObject(p[key]) ? p[key] : {}, c[key]);
        }
        else if (Array.isArray(c[key])) {
          p[key] = arrayAssign(c[key]);
        }
        else {
          p[key] = c[key];
        }
      });
      return p;
  }, {});
  return result;
};

function arrayAssign(obj) {
  var obj1 = obj.map(item => {
    if (isObject(item)) {
      return assign(item);
    }
    else if (Array.isArray(item)) {
      return arrayAssign(item);
    }
    else {
      return item;
    }
  });
  return obj1;
};

function isObject(obj) {
  return typeof obj === 'object' && obj !== null && Array.isArray(obj) === false && !(obj instanceof Date);
};
