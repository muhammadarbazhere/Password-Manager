const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passOpSchema = new Schema({
  site: String,
  username: String,
  password: String,
}, { timestamps: true });

module.exports = mongoose.model('passOp', passOpSchema);
