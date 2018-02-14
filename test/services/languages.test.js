const assert = require('assert');
const app = require('../../src/app');

describe('\'languages\' service', () => {
  it('registered the service', () => {
    const service = app.service('languages');

    assert.ok(service, 'Registered the service');
  });
});
