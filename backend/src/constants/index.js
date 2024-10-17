const { config } = require("dotenv");
const path = require("path");

config();

const NODE_ENV = process.env.NODE_ENV || 'development';

const isProduction = NODE_ENV === 'production';

module.exports = {
  SERVER_PORT: isProduction ? process.env.PROD_SERVER_PORT : process.env.DEV_SERVER_PORT,
  CLIENT_URL: isProduction ? process.env.PROD_CLIENT_URL : process.env.DEV_CLIENT_URL,
  CLIENT_PORT: isProduction ? process.env.PROD_CLIENT_PORT : process.env.DEV_CLIENT_PORT,
  SECRET: isProduction ? process.env.PROD_SECRET : process.env.DEV_SECRET,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_PORT: process.env.DB_PORT,
};