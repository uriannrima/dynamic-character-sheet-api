const commonHooks = require('feathers-hooks-common');

module.exports = commonHooks.when(
  hook => hook.data.subValues,
  commonHooks.discard('subValues')
);