// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const axios = require('axios');
const Qs = require('qs');

module.exports = function(options = {}) {
  return context => {
    const { data } = context;

    // Throw an error if we didn't get a text
    if (!data.text) {
      throw new Error('A message is required');
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
    const { apiAccessKey, secret, authTokenUrl } = app.get('telstra');

    return axios
      .request({
        url: authTokenUrl,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: Qs.stringify({
          grant_type: 'client_credentials',
          client_id: apiAccessKey,
          client_secret: secret,
          scope: 'NSMS'
        })
      })
      .then(response => response.data)
      .then(response => {
        // update the context with response
        console.log(response);
        context.data = {
          text,
          // Set the sender
          sender,
          // Set the recipient
          recipients,

          authtoken: response,
          // Add the current date
          createdAt: new Date().getTime()
        };
        // only return the proxied response to the client
        context.dispatch = response;
        // Best practice: hooks should always return the context
        return context;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  };
};
