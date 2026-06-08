const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  code: { type: String, required: true },
  flag: { type: String },
  group: { type: String },
  confederation: { type: String }
});

module.exports = mongoose.model('Team', teamSchema);
