// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const messagebird = require('messagebird');
const util = require('util');

module.exports = function(options = {}) {
  return async context => {
    const { data } = context;

    // Throw an error if we didn't get a text
    if (!data.text) {
      throw new Error('A message is required');
    }
    // Throw an error if we didn't get a sender
    if (!data.sender) {
      throw new Error('A message sender is required');
    }
    // Throw an error if we didn't get a reciever
    if (!data.recipients) {
      throw new Error('A message recipient/s is required');
    }
    // The sms recipient
    const recipients = context.data.recipients;
    // The sms sender
    const sender = context.data.sender;
    // The actual message text
    const text = context.data.text;

    const { app } = context;
    const { apiAccessKey } = app.get('messagebird');

    const params = {
      originator: sender,
      recipients: recipients,
      body: text
    };

    const sendMessage = util.promisify(messagebird(apiAccessKey).messages.create);
    await sendMessage(params)
      .then(response => {
        context.data = {
          text,
          // Set the sender
          sender,
          // Set the recipient
          recipients,

          response: response,
          createdBy: context.params.user,
          // Add the current date
          createdAt: new Date().getTime()
        };
      })
      .catch(error => {
        context.data = {
          text,
          // Set the sender
          sender,
          // Set the recipient
          recipients,

          response: error,
          // Add the current date
          createdAt: new Date().getTime()
        };
      });
    return context;
  };
};
