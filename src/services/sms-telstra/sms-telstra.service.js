// Initializes the `sms-telstra` service on path `/sms-telstra`
const createService = require('feathers-mongoose');
const createModel = require('../../models/sms-telstra.model');
const hooks = require('./sms-telstra.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sms-telstra', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('sms-telstra');

  service.hooks(hooks);
};
