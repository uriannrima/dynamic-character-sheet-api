// Initializes the `feats` service on path `/feats`
const createService = require('feathers-mongodb');
const hooks = require('./feats.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/feats', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('feats');

  mongoClient.then(db => {
    service.Model = db.collection('feats');
  });

  service.hooks(hooks);
};
