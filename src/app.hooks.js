// Application hooks that run for every service
const logger = require('./hooks/logger');

const addPatchDelta = (context) => {
  context.result ={
    model: context.result,
    delta: context.data
  }
  console.log(context.result);
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [addPatchDelta],
    remove: []
  },

  error: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

