// Initializes the `syncing` service on path `/syncing`
const createService = require('./syncing.class.js');
const hooks = require('./syncing.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'syncing',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/syncing', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('syncing');

  service.hooks(hooks);
};
