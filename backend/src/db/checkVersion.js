const pool = require("./index.js");

exports.checkVersion = async (version) => {
  const { rows } = await pool.query("select * from schema_version");
  if (rows.length == 0) {
    console.log(
      "Database schema version incompatible with server version! Update database schema to match the one found in the 'database.sql' file!\n"
    );
    process.exit(1);
  }
  const db_version = rows[0].version;
  if (db_version != version) {
    console.log(
      "Database schema version incompatible with server version! Update database schema to match the one found in the 'database.sql' file!\n"
    );
    process.exit(1);
  }
};
