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
  this.client.get(key, cb);
}

CacherMemJS.prototype.set = function(key, cacheObject, ttl, cb) {
  cb = cb || function() {};
  this.client.set(key, cacheObject, ttl, cb);
}

CacherMemJS.prototype.invalidate = function(key, cb) {
  cb = cb || function() {};
  this.client.del(key, cb);
}

module.exports = CacherMemJS;
