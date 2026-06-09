const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  type: { type: String, required: true, enum: ['GOAL_SCORED', 'GOAL_CONCEDED', 'MATCH_START', 'MATCH_END', 'RED_CARD'] },
  teamId: { type: Number, required: true },
  teamName: { type: String },
  teamNameAr: { type: String },
  message: { type: String, required: true },
  messageAr: { type: String, required: true },
  matchInfo: {
    homeTeam: String,
    awayTeam: String,
    homeTeamAr: String,
    awayTeamAr: String,
    homeScore: Number,
    awayScore: Number,
    minute: Number
  },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
