const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const processTelstraSmsAndSend = require('../../src/hooks/process-telstra-sms-and-send');

describe('\'process-telstra-sms-and-send\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: processTelstraSmsAndSend()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
