const { Pool } = require("pg");
const { DB_USER, DB_HOST, DB_DATABASE, DB_PASS, DB_PORT } = require("../constants");

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASS,
  port: DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
