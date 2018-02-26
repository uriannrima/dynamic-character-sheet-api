const assert = require('assert');
const app = require('../../src/app');

describe('\'teste\' service', () => {
  it('registered the service', () => {
    const service = app.service('teste');

    assert.ok(service, 'Registered the service');
  });
});
