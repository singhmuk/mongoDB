const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

module.exports = Contact = mongoose.model('contact', ContactSchema);