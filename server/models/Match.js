const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  apiMatchId: { type: Number, required: true, unique: true },
  homeTeamId: { type: Number, required: true },
  awayTeamId: { type: Number, required: true },
  homeTeamName: { type: String },
  awayTeamName: { type: String },
  homeTeamNameAr: { type: String },
  awayTeamNameAr: { type: String },
  homeScore: { type: Number, default: 0 },
  awayScore: { type: Number, default: 0 },
  status: { type: String, default: 'SCHEDULED' },
  utcDate: { type: Date, required: true },
  matchday: { type: Number },
  group: { type: String },
  stage: { type: String, default: 'GROUP_STAGE' },
  events: [{
    type: { type: String, enum: ['GOAL', 'YELLOW_CARD', 'RED_CARD', 'SUBSTITUTION'] },
    teamId: Number,
    player: String,
    assist: String,
    minute: Number,
    extraTime: Number
  }],
  lastChecked: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', matchSchema);
