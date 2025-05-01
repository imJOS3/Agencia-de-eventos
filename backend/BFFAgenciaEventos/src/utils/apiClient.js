const axios = require('axios');
require('dotenv').config();

const apiClient = axios.create({
  baseURL: process.env.GATEWAY_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

module.exports = apiClient;
