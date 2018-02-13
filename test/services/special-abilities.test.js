const assert = require('assert');
const app = require('../../src/app');

describe('\'specialAbilities\' service', () => {
  it('registered the service', () => {
    const service = app.service('special-abilities');

    assert.ok(service, 'Registered the service');
  });
});
