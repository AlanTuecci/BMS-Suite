const { config } = require("dotenv");
config();

module.exports = {
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  SECRET: process.env.SECRET,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PASS: process.env.DB_PASS,
  DB_PORT: process.env.DB_PORT,
};
