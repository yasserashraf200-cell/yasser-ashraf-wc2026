# Yasser Ashraf FIFA WORLD CUP 2026

Track FIFA World Cup 2026 matches and get notifications when your team scores or concedes.

## Features

- 48 teams from all confederations
- Live match tracking
- Push notifications for goals
- Arabic and English support
- PWA (installable on mobile)
- Beautiful World Cup 2026 themed design

## Tech Stack

- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Frontend:** HTML/CSS/JavaScript
- **PWA:** Service Worker + Web Push API
- **API:** football-data.org

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Create MongoDB Atlas Account

1. Go to [mongodb.com](https://www.mongodb.com)
2. Create free account
3. Create cluster
4. Get connection string
5. Update `.env` file

### 3. Get API Key

1. Go to [football-data.org](https://www.football-data.org)
2. Register for free
3. Get API key
4. Update `.env` file

### 4. Generate VAPID Keys

```bash
npx web-push generate-vapid-keys
```

5. Update `.env` file with keys

### 5. Run Server

```bash
npm start
```

### 6. Open Browser

Go to `http://localhost:3000`

## Environment Variables

```
PORT=3000
MONGODB_URI=your_mongodb_uri
FOOTBALL_API_KEY=your_api_key
VAPID_PUBLIC_KEY=your_public_key
VAPID_PRIVATE_KEY=your_private_key
```

## Deploy to Render.com

1. Push to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repo
5. Set environment variables
6. Deploy

## License

MIT
