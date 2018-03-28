// Initializes the `characters` service on path `/characters`
const createService = require('feathers-mongodb');
const hooks = require('./characters.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/characters', Object.assign(createService(options), { events: ['sync', 'connect'] }));

  // Get an array from character.
  // Just for user case, if necessary to do something route specific.
  app.use('/characters/:characterId/:arrayName/:arrayId?', {
    find(params) {
      const { route: { characterId, arrayName, arrayId } } = params;
      const service = app.service('characters');
      return service.get(characterId, params).then(character => {
        const array = character[arrayName];
        return arrayId ? array.find(element => element._id === arrayId) : array;
      });
    },
    // Delete specific element from character
    remove(id, params) {
      const { route: { characterId, arrayName, arrayId } } = params;
      if (!characterId || !arrayName || !arrayId) throw Error('Invalid.');

      const service = app.service('characters');
      return service.get(characterId, params).then(character => {
        const element = character[arrayName].find(el => el._id === arrayId);
        element.deleted = true;
        return service.update(character._id, character, params);
      });
    }
  });

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('characters');

  mongoClient.then(db => {
    service.Model = db.collection('characters');
  });

  service.hooks(hooks);
};
