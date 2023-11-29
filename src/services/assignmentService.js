import Assignment from "../models/assignment.model.js";
import AssignmentSubmission from "../models/assignment-submission.model.js";
import { isUserAuthorized } from "../utils/assignmentUtils.js";
import logger from "../../configs/logger.config.js";
import AWS from "aws-sdk";
import * as dotenv from "dotenv";
dotenv.config();

AWS.config.update({
  region: process.env.AWS_REGION,
});
const sns = new AWS.SNS();

export const create = async (request, response) => {
  const user = await isUserAuthorized(request);
  if (
    request.method === "POST" &&
    request.query &&
    Object.values(request.query).length
  ) {
    logger.error("endpoint.v1.assignments.getAll || Bad Request");
    throw "Bad Request";
  }
  logger.info("endpoint.v1.assignments.getAll", request.body);
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
    logger.error("Hitting endpoint.v1.assignments.update || Bad Request");
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
  if (
    request.body?.name == null ||
    request.body?.points == null ||
    request.body?.num_of_attempts == null ||
    request.body.deadline == null
  ) {
    throw "Bad Request";
  }
  const assignmentUpdated = await Assignment.findOne({
    where: { id: assignment_id },
  });

  const allSubmissions = await AssignmentSubmission.findAll({
    where: { assignment_id: assignment_id },
  });
  if (allSubmissions.length) {
    response.status(400).json({
      message: "Submissions exist for this assignment, Edit not allowed",
    });
    return;
  }
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
    (request.method === "GET" &&
      request.body &&
      Object.values(request.body).length) ||
    (request.query && Object.values(request.query).length)
  ) {
    logger.error("Hitting endpoint.v1.assignments.getOne + Bad Request");
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
    logger.error("Hitting endpoint.v1.assignments.delete + Bad Request");
    response.status(400).json({ message: "Bad Request" });
    return;
  }
  const assignment_id = request.params.id;

  const allSubmissions = await AssignmentSubmission.findAll({
    where: { assignment_id: assignment_id },
  });
  if (allSubmissions.length) {
    response.status(400).json({
      message: "Submissions exist for this assignment, Edit not allowed",
    });
    return;
  }
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

export const submitAssignment = async (request, response) => {
  const user = await isUserAuthorized(request, "submission");
  const assignmentId = request.params.id;
  if (
    request.method === "POST" &&
    request.query &&
    Object.values(request.query).length
  ) {
    logger.error("Hitting endpoint.v1.assignments.submit + Bad Request");
    response.status(400).json({ message: "BadRequest" });
    return;
  }
  const req = request.body;
  if (req.submission_url && typeof req.submission_url !== "string") {
    response
      .status(400)
      .json({ message: "Bad Request: Invalid submission URL" });
    return;
  }
  if (!req.submission_url || Object.keys(req).length != 1) {
    response
      .status(400)
      .json({ message: "Bad Request: Only Submission Url Allowed" });
    return;
  }
  const allAssignments = await Assignment.findAll();
  const assignment = allAssignments.find((data) => data.id == assignmentId);
  if (!assignment) {
    response.status(400).json({ message: "Assignment not found" });
    return;
  }
  if (new Date() < new Date(assignment.deadline)) {
    console.log("New Date", new Date());
    console.log("New Date", new Date(assignment.deadline));
    response
      .status(400)
      .json({ message: "Submission Deadline Already passed" });
    return;
  }
  const allSubmissions = await AssignmentSubmission.findAll({
    where: { assignment_id: assignmentId, user_id: user.id },
  });
  const totalSubmissions = allSubmissions.length;
  console.log("assignment.retries", assignment.num_of_attempts);
  if (totalSubmissions >= assignment.num_of_attempts) {
    response.status(400).json({ message: "Retry limit Exceeded" });
    return;
  }
  const assignmentCreated = await AssignmentSubmission.create({
    assignment_id: assignment.id,
    submission_url: req.submission_url,
    submission_date: new Date(),
    user_id: user.id,
  });
  const params = {
    Message: JSON.stringify({
      email: user.email,
      releaseUrl: req.submission_url,
      assignment_id: assignment.id,
      user_id: user.id,
    }),
    TopicArn: process.env.TopicArn,
  };
  const snsPromise = sns.publish(params).promise();
  await snsPromise;
  return {
    id: assignmentCreated.id,
    assignment_id: assignmentCreated.assignment_id,
    submission_url: assignmentCreated.submission_url,
    submission_date: assignmentCreated.submission_date,
    submission_updated: assignmentCreated.submission_updated,
  };
};
