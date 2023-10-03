import Account from "../models/user.model.js";
import Assignment from "../models/assignment.model.js";
import { compare } from "bcrypt";
import * as auth from "basic-auth";
export const isUserAuthorized = async (request, type) => {
  // Details received via Basic Auth
  if (
    request.headers.authorization == null ||
    !request.headers.authorization.includes("Basic")
  ) {
    throw "Provide Basic Auth Credentials";
  }
  const acc = await auth.parse(request.headers.authorization);
  const reqUsername = acc.name;
  const reqPass = acc.pass;

  // Data fetched from database
  const dbAcc = await Account.findOne({
    where: {
      email: reqUsername,
    },
  });
  if (dbAcc === null) {
    throw "Username does not exist"; // Should return 401
  }

  // Verify credentials
  const reqId = request.params.id;
  const compareResult = await compare(reqPass, dbAcc.password);
  if (dbAcc.email === reqUsername && compareResult) {
    if (reqId == null || type == "assignment") return dbAcc;
    // Verify if request is made for the correct ID
    if (dbAcc.id == reqId) {
      return dbAcc;
    } else throw "ID and username do not match"; // Should return 403
  } else {
    throw "Provided Credentials do not match"; // Should return 401
  }
};
