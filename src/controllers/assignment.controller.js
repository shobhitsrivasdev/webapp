import * as assignmentService from "../services/assignmentService.js";
import { handleErrorResponse } from "../utils/utils.js";

export const getAll = async (request, response) => {
  try {
    console.log("Received GET: /v1/assignments");
    const doc = await assignmentService.getAll(request);
    response.status(200).send(doc);
  } catch (error) {
    handleErrorResponse(error, response);
  }
};

export const post = async (request, response) => {
  try {
    const doc = await assignmentService.create(request, response);
    response.status(200).send(doc);
    console.log(Date().toString() + " :: Returned 201 :: Document Created ");
  } catch (error) {
    handleErrorResponse(error, response);
  }
};

export const getOne = async (request, response) => {
  try {
    const doc = await assignmentService.getSingleAssignment(request);
    response.status(200).send(doc);
    console.log(Date().toString() + " :: Returned 200 :: Document Fetched ");
  } catch (error) {
    handleErrorResponse(error, response);
  }
};

export const deleteOne = async (request, response) => {
  try {
    await assignmentService.deleteSingleAssignment(request);
    response.sendStatus(204);
  } catch (error) {
    handleErrorResponse(error, response);
  }
};

export const updateOne = async (request, response) => {
    try {
      const doc = await assignmentService.updateSingleAssignment(request, response);
      response.status(200).send(doc);
    } catch (error) {
      handleErrorResponse(error, response);
    }
  };