import bcrypt from "bcrypt";
import { Sequelize } from 'sequelize'
import dbConfig from "../configs/dbConfig.js";

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



export const handleErrorResponse = (error, response) => {
  let errorCode = 400;
  if (
    error == "ID and username do not match" ||
    error == "Provide Basic Auth Credentials" ||
    error == "Document with mentioned ID does not exist for this user"
  ) {
    errorCode = 403;
    response.sendStatus(errorCode);
  } else if (
    error == "Provided Credentials do not match" ||
    error == "Username does not exist" ||
    error == "Email not verified"
  ) {
    errorCode = 401;
    response.sendStatus(errorCode);
  } else if (error == "Invalid input fields") {
    errorCode = 400;
    response.sendStatus(errorCode);
  } else if (error == "Assignment not found" || error == "Token not found") {
    errorCode = 404;
    response.sendStatus(errorCode);
  }
  console.log(Date().toString() + " :: Returned " + errorCode + " :: " + error);
};