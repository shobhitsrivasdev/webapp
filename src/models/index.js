import Sequelize from "sequelize";
import * as dotenv from 'dotenv'
dotenv.config()

export const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
    operatorsAliases: false,
    port: process.env.PGPORT,
  }
);

var db = {};

db.connectionTest = () => {
  return sequelize.authenticate();
};

export default db;
