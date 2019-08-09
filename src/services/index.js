const smsMessaging = require('./sms-messaging/sms-messaging.service.js');
const smsMessagebird = require('./sms-messagebird/sms-messagebird.service.js');
const smsTelstra = require('./sms-telstra/sms-telstra.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(smsMessaging);
  app.configure(smsMessagebird);
  app.configure(smsTelstra);
  app.configure(users);
};
