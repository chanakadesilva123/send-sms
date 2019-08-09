const assert = require('assert');
const app = require('../../src/app');

describe('\'sms-messaging\' service', () => {
  it('registered the service', () => {
    const service = app.service('sms-messaging');

    assert.ok(service, 'Registered the service');
  });
});
