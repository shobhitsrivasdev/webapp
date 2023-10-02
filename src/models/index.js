import Sequelize from "sequelize";
import * as dotenv from 'dotenv'
dotenv.config()

export const sequelize = new Sequelize(
  "postgres",
  "shobhitsrivastava",
  "password",
  {
    host: "localhost",
    operatorsAliases: false,
    port: 5433,
    dialect: "postgres",
    dialectOptions: {},
  }
);

var db = {};

db.connectionTest = () => {
  return sequelize.authenticate();
};

export default db;
