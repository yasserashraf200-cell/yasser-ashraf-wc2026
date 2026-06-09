const axios = require('axios');

const API_BASE_URL = process.env.FOOTBALL_API_BASE_URL || 'https://api.football-data.org/v4';
const API_KEY = process.env.FOOTBALL_API_KEY;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'X-Auth-Token': API_KEY }
});

async function getCompetitions() {
  try {
    const response = await apiClient.get('/competitions/2000');
    return response.data;
  } catch (error) {
    console.error('Error fetching competition:', error.message);
    return null;
  }
}

async function getMatches(matchday) {
  try {
    let url = '/competitions/2000/matches';
    if (matchday) url += `?matchday=${matchday}`;
    const response = await apiClient.get(url);
    return response.data.matches || [];
  } catch (error) {
    console.error('Error fetching matches:', error.message);
    return [];
  }
}

async function getLiveMatches() {
  try {
    const response = await apiClient.get('/competitions/2000/matches', {
      params: { status: 'IN_PLAY,PAUSED' }
    });
    return response.data.matches || [];
  } catch (error) {
    console.error('Error fetching live matches:', error.message);
    return [];
  }
}

async function getTeams() {
  try {
    const response = await apiClient.get('/competitions/2000/teams');
    return response.data.teams || [];
  } catch (error) {
    console.error('Error fetching teams:', error.message);
    return [];
  }
}

async function getStandings() {
  try {
    const response = await apiClient.get('/competitions/2000/standings');
    return response.data.standings || [];
  } catch (error) {
    console.error('Error fetching standings:', error.message);
    return [];
  }
}

module.exports = {
  getCompetitions,
  getMatches,
  getLiveMatches,
  getTeams,
  getStandings
};
