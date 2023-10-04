import * as assignmentService from "../services/assignmentService.js";
import {
  handleErrorResponse,
  validateAssignmentObject,
  setResponseHeader,
} from "../utils/utils.js";

export const getAll = async (request, response) => {
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
  setResponseHeader(response);
  try {
    await assignmentService.deleteSingleAssignment(request, response);
    response.sendStatus(204);
  } catch (error) {
    handleErrorResponse(error, response);
  }
};

export const updateOne = async (request, response) => {
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
