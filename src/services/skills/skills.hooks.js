const CacheMap = require('@feathers-plus/cache');
const { cache } = require('feathers-hooks-common');

var cacheMap = CacheMap({ max: 100 }); // Keep the 100 most recently used.

module.exports = {
  before: {
    all: [],
    find: [cache(cacheMap)],
    get: [cache(cacheMap)],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [cache(cacheMap)],
    get: [cache(cacheMap)],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
