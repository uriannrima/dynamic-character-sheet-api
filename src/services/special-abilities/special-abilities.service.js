// Initializes the `specialAbilities` service on path `/special-abilities`
const createService = require('feathers-mongodb');
const hooks = require('./special-abilities.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/special-abilities', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('special-abilities');

  mongoClient.then(db => {
    service.Model = db.collection('special-abilities');
  });

  service.hooks(hooks);
};
