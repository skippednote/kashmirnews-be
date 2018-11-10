const LRU = require('lru-cache');
const cache = LRU();
cache.set('news', []);

module.exports = cache;
