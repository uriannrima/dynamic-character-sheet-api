const assert = require('assert');
const app = require('../../src/app');

describe('\'syncing\' service', () => {
  it('registered the service', () => {
    const service = app.service('syncing');

    assert.ok(service, 'Registered the service');
  });
});
