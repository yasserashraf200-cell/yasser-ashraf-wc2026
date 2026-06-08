require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const cron = require('node-cron');

const matchesRouter = require('./routes/matches');
const teamsRouter = require('./routes/teams');
const usersRouter = require('./routes/users');
const notificationsRouter = require('./routes/notifications');
const { trackMatches } = require('./services/matchTracker');
const { seedTeams } = require('./seed/teams');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await seedTeams();
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/matches', matchesRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/users', usersRouter);
app.use('/api/notifications', notificationsRouter);

app.get('/api/config/vapid-key', (req, res) => {
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

setInterval(() => {
  trackMatches();
}, 30000);

setInterval(() => {
  trackMatches(true);
}, 60000);

setInterval(() => {
  trackMatches(false, true);
}, 300000);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
