// sms-messagebird-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const smsMessagebird = new Schema(
    {
      text: { type: String, required: true },
      sender: { type: String, required: true },
      recipients: { type: String, required: true },
      response: { type: Object },
      createdBy: { type: Object }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('smsMessagebird', smsMessagebird);
};
