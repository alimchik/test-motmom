const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: String, default: null },
  count: { type: Number, default: null },
  price: { type: Number, default: null },
  date_add: { type: Date, default: null }
});

module.exports = model('Product', schema);