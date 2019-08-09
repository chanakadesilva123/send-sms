// Initializes the `sms-messagebird` service on path `/sms-messagebird`
const createService = require('feathers-mongoose');
const createModel = require('../../models/sms-messagebird.model');
const hooks = require('./sms-messagebird.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sms-messagebird', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('sms-messagebird');

  service.hooks(hooks);
};
