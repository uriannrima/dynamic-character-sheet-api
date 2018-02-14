const removeSubValues = require('../../hooks/remove.sub-values.hook');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [removeSubValues],
    update: [removeSubValues],
    patch: [removeSubValues],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
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
