const assert = require('assert');
const app = require('../../src/app');

describe('\'sms-messagebird\' service', () => {
  it('registered the service', () => {
    const service = app.service('sms-messagebird');

    assert.ok(service, 'Registered the service');
  });
});
