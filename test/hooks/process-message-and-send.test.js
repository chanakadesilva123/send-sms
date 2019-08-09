const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const processMessageAndSend = require('../../src/hooks/process-message-and-send');

describe('\'process-message-and-send\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: processMessageAndSend()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
