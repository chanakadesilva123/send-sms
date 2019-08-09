// Initializes the `sms-messaging` service on path `/sms-messaging`
const createService = require('feathers-mongoose');
const createModel = require('../../models/sms-messaging.model');
const hooks = require('./sms-messaging.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sms-messaging', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('sms-messaging');

  service.hooks(hooks);
};
