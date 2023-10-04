import { Sequelize } from "sequelize";
import dbConfig from "../configs/dbConfig.js";
import * as dotenv from "dotenv";
dotenv.config();

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

export const handleErrorResponse = (error, response) => {
  //console.log("HERE----", error);
  let errorCode = 400;
  if (error && error.message) {
    response.status(errorCode).json({ message: error.message });
    return;
  }
  if (
    error == "ID and username do not match" ||
    error == "Provide Basic Auth Credentials" ||
    error == "Assignment with mentioned ID does not exist for this user"
  ) {
    errorCode = 403;
    response.status(errorCode).json({ message: error });
    return;
  } else if (
    error == "Provided Credentials do not match" ||
    error == "Username does not exist"
  ) {
    errorCode = 401;
    response.status(errorCode).json({ message: error });
    return;
  } else if (error == "Invalid input fields" || error == "Bad Request") {
    errorCode = 400;
    response.status(errorCode).json({ message: error });
    return;
  } else if (error == "Assignment not found" || error == "Token not found") {
    errorCode = 404;
    response.status(errorCode).json({ message: error });
    return;
  }
  if (error == "SequelizeConnectionRefusedError") {
    errorCode = 503;
    response.status(503).json({ message: "Service Unavailable" });
    return;
  }
  if (error == "Assignment with mentioned ID does not exist") {
    response.status(400).json({ message: "Bad Request" });
  } else {
    response.status(errorCode).json({ message: error });
    return;
  }
  /*   console.log("THERE");
  console.log(Date().toString() + " :: Returned " + errorCode + " :: " + error); */
};
