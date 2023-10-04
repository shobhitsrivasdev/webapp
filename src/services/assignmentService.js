import Assignment from "../models/assignment.model.js";
import { isUserAuthorized } from "../utils/assignmentUtils.js";

export const create = async (request, response) => {
  const user = await isUserAuthorized(request);
  if (
    request.method === "POST" &&
    request.query &&
    Object.values(request.query).length
  ) {
    response.status(400).json({ message: "Bad Request" });
  }

  user.password = undefined;
  const req = request.body;
  const userId = user.id;
  if (req.name && req.points && req.num_of_attempts && req.deadline) {
    if (typeof req.name !== "string") {
      throw "Bad Request";
    }
    if (typeof req.points !== "number") {
      throw "Bad Request";
    }
    if (typeof req.num_of_attempts !== "number") {
      throw "Bad Request";
    }
    if (new Date(req.deadline) == "Invalid Date") {
      throw "Bad Request";
    }
  }

  const assignmentCreated = await Assignment.create({
    user_id: userId,
    name: request.body.name,
    points: request.body.points,
    num_of_attempts: request.body.num_of_attempts,
    deadline: new Date(),
  });

  delete assignmentCreated["dataValues"]?.user_id;
  return assignmentCreated;
};

export const updateSingleAssignment = async (request, response) => {
  const user = await isUserAuthorized(request, "assignment");
  if (
    request.method === "PUT" &&
    request.query &&
    Object.values(request.query).length
  ) {
    response.status(400).json({ message: "Bad Request" });
    return;
  }
  const assignment_id = request.params.id;
  const newReq = {};
  // Insert entries in the Document table for the uploaded files
  if (request.body.name) {
    newReq.name = request.body.name;
  }
  if (request.body.points) {
    newReq.points = request.body.points;
  }
  if (request.body.num_of_attempts) {
    newReq.num_of_attempts = request.body.num_of_attempts;
  }
  if (request.body.deadline) {
    newReq.deadline = request.body.deadline;
  }
  const assignmentUpdated = await Assignment.findOne({
    where: { id: assignment_id },
  });
  if (assignmentUpdated) {
    let updatedAssignment = await Assignment.update(newReq, {
      where: {
        id: assignment_id,
      },
      returning: true,
    });

    return updatedAssignment;
  } else {
    throw "Assignment with mentioned ID does not exist for this user";
  }
};

export const getAll = async (request, response) => {
  await isUserAuthorized(request);
  if (
    (request.method === "GET" &&
      request.body &&
      Object.values(request.body).length) ||
    (request.query && Object.values(request.query).length)
  ) {
    response.status(400).json({ message: "Bad Request" });
    return;
  }
  const getDocumentsResult = await Assignment.findAll();

  return getDocumentsResult.map((data) => {
    return {
      id: data.id,
      name: data.name,
      points: data.points,
      num_of_attempts: data.num_of_attempts,
      deadline: data.deadline,
      assignment_created: data.assignment_created,
      assignment_updated: data.assignment_updated,
    };
  });
};

export const getSingleAssignment = async (request, response) => {
  const user = await isUserAuthorized(request);
  if (
    (request.method === "DELETE" &&
      request.body &&
      Object.values(request.body).length) ||
    (request.query && Object.values(request.query).length)
  ) {
    response.status(400).json({ message: "Bad Request" });
    return;
  }
  const assignment_id = request.params.id;

  const getDocumentsResult = await Assignment.findOne({
    where: {
      id: assignment_id,
    },
  });

  if (getDocumentsResult == null) {
    throw "Assignment with mentioned ID does not exist for this user";
  }
  if (
    getDocumentsResult &&
    getDocumentsResult["dataValues"] &&
    getDocumentsResult["dataValues"].user_id
  ) {
    delete getDocumentsResult["dataValues"].user_id;
  }
  return getDocumentsResult;
};

export const deleteSingleAssignment = async (request, response) => {
  const user = await isUserAuthorized(request, "assignment");
  if (
    (request.method === "DELETE" &&
      request.body &&
      Object.values(request.body).length) ||
    (request.query && Object.values(request.query).length)
  ) {
    response.status(400).json({ message: "Bad Request" });
    return;
  }
  const assignment_id = request.params.id;
  console.log("USERID", user.id);
  console.log("Assingment", assignment_id);

  const getDocumentsResult = await Assignment.findOne({
    where: {
      user_id: user.id,
      id: assignment_id,
    },
  });

  if (getDocumentsResult == null) {
    throw "File not found";
  }

  await Assignment.destroy({
    where: {
      user_id: user.id,
      id: assignment_id,
    },
  });
  return;
};
