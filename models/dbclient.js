const Client = require("pg")["Client"];

const DBConfig = {
  user: process.env.USER || "postgres", 
  password: process.env.PGPASSWORD || "admin",
  database: "test",
  host: process.env.PGHOST || "localhost",
  port: process.env.PGPORT || 5433
}

const client = new Client(DBConfig);

module.exports = client;
