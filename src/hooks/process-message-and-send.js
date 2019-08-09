// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const axios = require('axios');
const Qs = require('qs');

module.exports = function(options = {}) {
  return context => {
    const { data } = context;

    // Throw an error if we didn't get a api provider
    if (!data.apiprovider) {
      throw new Error('A messanger API provider is required');
    }
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
    // The sms api provider
    const apiprovider = context.data.apiprovider;
    // The sms recipient
    const recipients = context.data.recipients;
    // The sms sender
    const sender = context.data.sender;
    // The actual message text
    const text = context.data.text;

    const { app } = context;

    const { apiAccessKey, apiUrl } = app.get(apiprovider);

    let authHeader, messageData;
    if (apiprovider == 'telstra') {
      authHeader = 'Bearer ' + context.data.authtoken.access_token;
      messageData = {
        to: recipients.split(','),
        from: sender,
        body: text
      };
    } else if (apiprovider == 'messagebird') {
      authHeader = 'AccessKey ' + apiAccessKey;
      messageData = Qs.stringify({
        recipients: recipients,
        originator: sender,
        body: text
      });
    }
    console.log('authHeader=' + authHeader);
    console.log('messageData=' + messageData);
    return axios
      .request({
        url: apiUrl,
        method: 'POST',
        headers: { Authorization: `${authHeader}` },
        data: messageData
      })
      .then(response => response.data)
      .then(response => {
        // update the context with response
        context.data = {
          apiprovider,

          text,
          // Set the sender
          sender,
          // Set the recipient
          recipients,

          authtoken: context.data.authtoken,

          response: response,
          createdBy: context.params.user,
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
