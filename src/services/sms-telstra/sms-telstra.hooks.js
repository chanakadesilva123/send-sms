const processTelstraSmsAndSend = require('../../hooks/process-telstra-sms-and-send');
const getTelstraAuthToken = require('../../hooks/get-telstra-auth-token');
const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [authenticate('jwt'), getTelstraAuthToken(), processTelstraSmsAndSend()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
