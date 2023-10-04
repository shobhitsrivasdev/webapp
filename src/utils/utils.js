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
  if (error == "SequelizeConnectionRefusedError") {
    errorCode = 503;
    response.status(503).json({ message: "Service Unavailable" });
    return;
  }
  if (error && error.message) {
    response.status(errorCode).json({ message: error.message });
    return;
  }
  if (error == "Not Found") {
    response.status(404).json({ message: error });
    return;
  }
  if (
    error == "Assignment with mentioned ID does not exist for this user" ||
    error == "User not authorized to access"
  ) {
    errorCode = 403;
    response.status(errorCode).json({ message: error });
    return;
  } else if (
    error == "Provided Credentials do not match" ||
    "Provide Basic Auth Credentials" ||
    error == "Username does not exist" ||
    error == "ID and username do not match"
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
  if (error == "Assignment with mentioned ID does not exist") {
    response.status(404).json({ message: "Not Found" });
  } else {
    response.status(errorCode).json({ message: error });
    return;
  }
};
/*   console.log("THERE");
  console.log(Date().toString() + " :: Returned " + errorCode + " :: " + error); */

export const validateAssignmentObject = (obj, type) => {
  // Define the allowed keys
  const allowedKeys = [
    "name",
    "points",
    "num_of_attempts",
    "deadline",
    "assignment_created",
    "assignment_updated",
  ];
  const requiredKeys = ["name", "points", "num_of_attempts", "deadline"];

  if (type == "POST") {
    // Check if all required keys are present
    for (const key of requiredKeys) {
      if (!(key in obj)) {
        return false; // Object is missing a required key
      }
    }
  }

  // Check if there are any extra keys
  for (const key in obj) {
    if (!allowedKeys.includes(key)) {
      return false; // Object has an unexpected key
    }
  }

  return true; // Object contains only allowed keys
};

export const setResponseHeader = (res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Accept,Origin"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-cache");
  return res;
};
