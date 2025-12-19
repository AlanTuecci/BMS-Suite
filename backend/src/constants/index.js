const { config } = require("dotenv");
const path = require("path");

config();

const NODE_ENV = process.env.NODE_ENV || "development";

const isProduction = NODE_ENV === "production";

module.exports = {
  NODE_ENV: NODE_ENV,
  SERVER_PORT: isProduction ? process.env.PROD_SERVER_PORT : process.env.DEV_SERVER_PORT,
  CLIENT_URL: isProduction ? process.env.PROD_CLIENT_URL : process.env.DEV_CLIENT_URL,
  CLIENT_PORT: isProduction ? process.env.PROD_CLIENT_PORT : process.env.DEV_CLIENT_PORT,
  SECRET: isProduction ? process.env.PROD_SECRET : process.env.DEV_SECRET,
  TIME_SECRET: isProduction ? process.env.PROD_TIME_SECRET : process.env.DEV_TIME_SECRET,
  DB_USER: process.env.POSTGRES_USER,
  DB_HOST: process.env.DB_HOST,
  DB_DATABASE: process.env.POSTGRES_DB,
  DB_PASS: process.env.POSTGRES_PASSWORD,
  DB_PORT: process.env.POSTGRES_PORT,
  SERVER_EMAIL: process.env.SERVER_EMAIL,
  SERVER_EMAIL_PASSWORD: process.env.SERVER_EMAIL_PASSWORD,
};
