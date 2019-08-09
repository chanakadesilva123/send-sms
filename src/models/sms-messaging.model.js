// sms-messaging-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const smsMessaging = new Schema(
    {
      text: { type: String, required: true },
      sender: { type: String, required: true },
      recipients: { type: String, required: true },
      apiprovider: { type: String },
      response: { type: Object },
      authtoken: { type: Object },
      createdBy: { type: Object }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('smsMessaging', smsMessaging);
};
