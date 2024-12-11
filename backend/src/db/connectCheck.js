const { Client } = require("pg");
const { DB_USER, DB_HOST, DB_DATABASE, DB_PASS, DB_PORT } = require("../constants");

const client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASS,
  port: DB_PORT,
});

const checkConnect = async () => {
  try {
    await client.connect();
    console.log(
      `Connected to PostgreSQl database as: ${client.user}@${client.host}:${client.port}/${client.database}\n`
    );
    await client.end();
  } catch (error) {
    throw new Error("Could not connect to database", error);
  }
};

module.exports = checkConnect;
