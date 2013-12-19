var MemJS = require("memjs").Client;

function CacherMemJS(host, opts) {
  if (host instanceof MemJS) {
    this.client = host;
    return;
  }
  opts = opts || {};
  //we want to default to a few more connections, 10 is much to small here
  opts.poolSize = opts.poolSize || 35;

  this.client = MemJS.create();
}

CacherMemJS.prototype.get = function(key, cb) {
  // Since memjs uses SlowBuffer, we need to parse value to Object.
  var callback = function(err, val, extras) {
    var value = val !== null ? JSON.parse(val) : '';
    cb(err, value);
  };
  this.client.get(key, callback);
}

CacherMemJS.prototype.set = function(key, cacheObject, ttl, cb) {
  cb = cb || function() {};
  this.client.set(key, JSON.stringify(cacheObject), cb, ttl);
}

CacherMemJS.prototype.invalidate = function(key, cb) {
  cb = cb || function() {};
  this.client.del(key, cb);
}

module.exports = CacherMemJS;
