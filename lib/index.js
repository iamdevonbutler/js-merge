// fix matrix we dont want to be ussing algos. just use the native stuff.

function merge(...objs) {
  var result = objs.reduce((p, c) => {
    if (!isObject(c)) return p;
    Object.keys(c).forEach(key => {
      if (Array.isArray(c[key])) {
        return p[key] = mergeArray(c[key]);
      }
      if (isObject(c[key])) {
        return p[key] = merge(p[key] || {}, c[key]);
      }
      return p[key] = c[key];
    }, []);
    return p;
  }, {});
  return result;
};

function mergeArray(obj) {
  return obj.map(item => {
    if (Array.isArray(item)) return mergeArray(item);
    if (isObject(item)) return merge(item);
    return item;
  });
};

function isObject(obj) {
  return typeof obj === 'object' && Array.isArray(obj) === false && obj !== null && (obj instanceof Date) === false;
};

module.exports = merge;
