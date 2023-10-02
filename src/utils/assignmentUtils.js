import Account from "../models/user.model.js";
import Assignment from "../models/assignment.model.js";
import { compare } from "bcrypt";
import * as auth from "basic-auth";
export const isUserAuthorized = async (request, type) => {
  if (
    request.headers.authorization == null ||
    !request.headers.authorization.includes("Basic")
  ) {
    throw "Provide Basic Auth Credentials";
  }
  const acc = await auth.parse(request.headers.authorization);
  const reqUsername = acc.name;
  const reqPass = acc.pass;

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
  if (reqId) {
    try {
      var dbAssignment = await Assignment.findOne({
        where: {
          id: reqId,
        },
      });
    } catch (error) {
      throw "Assignment not found";
    }
    if (dbAssignment == null) {
      throw "Assignment not found";
    }
  }

  const compareResult = await compare(reqPass, dbAcc.password);
  //console.log("USER COMPARE", dbAcc.id, dbAssignment.user_id);
  if (dbAcc.email === reqUsername && compareResult) {
    if (reqId == null) return dbAcc;
    if (dbAcc.id == dbAssignment.user_id) {
      return dbAcc;
    } else throw "ID and username do not match"; // Should return 403
  } else {
    throw "Provided Credentials do not match"; // Should return 401
  }
};
