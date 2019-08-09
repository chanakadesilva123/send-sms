const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const getTelstraAuthToken = require('../../src/hooks/get-telstra-auth-token');

describe('\'get-telstra-auth-token\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: getTelstraAuthToken()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
