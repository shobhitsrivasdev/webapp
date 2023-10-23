import Sequelize from "sequelize";
import * as dotenv from 'dotenv'
dotenv.config()

const isAwsRDS = process.env.PGHOST && process.env.PGHOST.includes('.rds.amazonaws.com');

const sequelizeConfig = {
  dialect: 'postgres',
  host: process.env.PGHOST,
  operatorsAliases: false,
  port: process.env.PGPORT,
};
 
if (isAwsRDS) {
  sequelizeConfig.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

export const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  sequelizeConfig
);

var db = {};

db.connectionTest = () => {
  return sequelize.authenticate();
};

export default db;
