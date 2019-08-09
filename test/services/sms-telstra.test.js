const assert = require('assert');
const app = require('../../src/app');

describe('\'sms-telstra\' service', () => {
  it('registered the service', () => {
    const service = app.service('sms-telstra');

    assert.ok(service, 'Registered the service');
  });
});
