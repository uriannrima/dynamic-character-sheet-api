// Initializes the `spells` service on path `/spells`
const createService = require('feathers-mongodb');
const hooks = require('./spells.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/spells', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('spells');

  mongoClient.then(db => {
    service.Model = db.collection('spells');
  });

  service.hooks(hooks);
};
