// Application hooks that run for every service
const logger = require('./hooks/logger');

const handleVuexData = (context) => {
  // Recover Vuex module/mutation and payload from data.
  const { mutation, payload } = context.data;
  // Persist it on the context for after hook.
  context.mutation = mutation;
  // Reset data to payload data.
  context.data = payload;
};

const addPatchDelta = (context) => {
  context.result = {
    model: context.result,
    delta: context.data,
    mutation: context.mutation
  };
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [handleVuexData],
    remove: []
  },

  after: {
    all: [logger()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [addPatchDelta],
    remove: []
  },

  error: {
    all: [logger()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
