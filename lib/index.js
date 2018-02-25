module.exports = objectAssign;

function objectAssign(...objs) {
  var result = objs
    .filter(item => isObject(item))
    .reduce((p, c) => {
      var keys = Object.keys(c);
      keys.forEach(key => {
        if (isObject(c[key])) {
          p[key] = objectAssign(isObject(p[key]) ? p[key] : {}, c[key]);
        }
        else if (isArray(c[key])) {
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
      return objectAssign(item);
    }
    else if (isArray(item)) {
      return arrayAssign(item);
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
  return typeof obj === 'object' && obj !== null && Array.isArray(obj) == false && !(obj instanceof Date);
};
