// Initializes the `channels` service on path `/channels`
const createService = require('./channels.class.js');
const hooks = require('./channels.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'channels',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/channels', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('channels');

  service.hooks(hooks);
};
