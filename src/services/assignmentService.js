import Assignment from "../models/assignment.model.js";
import { isUserAuthorized } from "../utils/assignmentUtils.js";

export const create = async (request, response) => {
  const user = await isUserAuthorized(request);
  user.password = undefined;
  const userId = user.id;
  // Insert entries in the Document table for the uploaded files
  console.log("Request-------", request);
  const assignmentCreated = await Assignment.create({
    user_id: userId,
    name: request.body.name,
    points: request.body.points,
    num_of_attempts: request.body.num_of_attempts,
    deadline: new Date(),
  });

  return assignmentCreated;
};

export const updateSingleAssignment = async (request, response) => {
  const user = await isUserAuthorized(request);
  const assignment_id = request.params.id;
  const newReq = {};
  // Insert entries in the Document table for the uploaded files
  console.log("Request-------", request);
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
    throw "Document with mentioned ID does not exist for this user";
  }
};

export const getAll = async (request) => {
  const user = await isUserAuthorized(request);

  const getDocumentsResult = await Assignment.findAll();

  return getDocumentsResult;
};

export const getSingleAssignment = async (request) => {
  const user = await isUserAuthorized(request, "assignment");
  const assignment_id = request.params.id;

  const getDocumentsResult = await Assignment.findOne({
    where: {
      id: assignment_id,
    },
  });

  if (getDocumentsResult == null) {
    throw "Document with mentioned ID does not exist for this user";
  }
  return getDocumentsResult;
};

export const deleteSingleAssignment = async (request) => {
  const user = await isUserAuthorized(request, "assignment");

  const assignment_id = request.params.id;

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
