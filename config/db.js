const sql = require("mssql");

const config = {
  port: Number(process.env.RDS_PORT),
  server: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  options: {
    trustServerCertificate: true,
    connectTimeout: 30000, 
  },
};

function runQuery(query) {
  // sql.connect() will return the existing global pool if it exists or create a new one if it doesn't
  return sql.connect(config).then((pool) => {
    if (pool.connecting) {
      console.log("Database connecting");
    }
    if (pool.connected) {
      console.log("Database Connected");
      return pool.query(query);
    }
  });
}
module.exports = { runQuery };
