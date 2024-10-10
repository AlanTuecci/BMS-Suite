const { config } = require("dotenv");
config();

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT,
  CLIENT_PORT: process.env.CLIENT_PORT,
  SERVER_URL: process.env.SERVER_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  SECRET: process.env.SECRET,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PASS: process.env.DB_PASS,
  DB_PORT: process.env.DB_PORT,
  SERVER_EMAIL: process.env.SERVER_EMAIL,
  SERVER_EMAIL_PASSWORD: process.env.SERVER_EMAIL_PASSWORD
};
