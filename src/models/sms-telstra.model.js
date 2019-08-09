// sms-telstra-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const smsTelstra = new Schema(
    {
      text: { type: String, required: true },
      sender: { type: String },
      recipients: { type: String, required: true },
      response: { type: Object },
      authtoken: { type: Object },
      createdBy: { type: Object }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('smsTelstra', smsTelstra);
};
