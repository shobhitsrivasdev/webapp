import * as assignmentService from "../services/assignmentService.js";
import client from "../../configs/statsd.config.js";
import logger from "../../configs/logger.config.js";
import {
  handleErrorResponse,
  validateAssignmentObject,
  setResponseHeader,
} from "../utils/utils.js";

export const getAll = async (request, response) => {
  client.increment("endpoint.v1.assignments.getAll");
  logger.info("Hitting endpoint.v1.assignments.getAll");
  setResponseHeader(response);
  try {
    console.log("Received GET: /v1/assignments");
    const doc = await assignmentService.getAll(request, response);
    response.status(200).send(doc);
  } catch (error) {
    handleErrorResponse(error, response);
  }
};

export const post = async (request, response) => {
  client.increment("endpoint.v1.assignments.post");
  logger.info("Hitting endpoint.v1.assignments.post");
  setResponseHeader(response);
  try {
    if (!validateAssignmentObject(request.body, "POST")) {
      response.status(400).json({ message: "Bad Request" });
      return;
    }
    const doc = await assignmentService.create(request, response);
    response.status(201).send(doc);
    console.log(Date().toString() + " :: Returned 201 :: Document Created ");
  } catch (error) {
    handleErrorResponse(error, response);
  }
};

export const getOne = async (request, response) => {
  client.increment("endpoint.v1.assignments.getOne");
  logger.info("Hitting endpoint.v1.assignments.getOne");
  setResponseHeader(response);
  try {
    const doc = await assignmentService.getSingleAssignment(request, response);
    response.status(200).send(doc);
    console.log(Date().toString() + " :: Returned 200 :: Document Fetched ");
  } catch (error) {
    handleErrorResponse(error, response);
  }
};

export const deleteOne = async (request, response) => {
  client.increment("endpoint.v1.assignments.delete");
  logger.info("Hitting endpoint.v1.assignments.delete");
  setResponseHeader(response);
  try {
    await assignmentService.deleteSingleAssignment(request, response);
    response.sendStatus(204);
  } catch (error) {
    handleErrorResponse(error, response);
  }
};

export const updateOne = async (request, response) => {
  client.increment("endpoint.v1.assignments.update");
  logger.info("Hitting endpoint.v1.assignments.update");
  setResponseHeader(response);
  if (!request.body || Object.keys(request.body).length === 0) {
    return response.status(400).json({ message: "Bad Request" });
  }
  if (!validateAssignmentObject(request.body, "PUT")) {
    response.status(400).json({ message: "Bad Request" });
    return;
  }
  try {
    const doc = await assignmentService.updateSingleAssignment(
      request,
      response
    );
     response.status(204).send();
  } catch (error) {
    handleErrorResponse(error, response);
  }
};

export const submitAssignment = async (request, response) => {
  client.increment("endpoint.v1.assignments.submit");
  logger.info("Hitting endpoint.v1.assignments.submit");
  setResponseHeader(response);
  try {
    const doc = await assignmentService.submitAssignment(request, response);
    response.status(201).send(doc);
  } catch (error) {
    handleErrorResponse(error, response);
  }
};
