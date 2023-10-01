import dbConfig from "../configs/dbConfig.js";
import Sequelize from "sequelize";
export const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port: dbConfig.port,
    dialectOptions: {},
    pool: dbConfig.pool,
  }
);

var db = {};

db.connectionTest = () => {
  return sequelize.authenticate();
};

export default db;
