const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const processMessagebirdSmsAndSend = require('../../src/hooks/process-messagebird-sms-and-send');

describe('\'process-messagebird-sms-and-send\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: processMessagebirdSmsAndSend()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
