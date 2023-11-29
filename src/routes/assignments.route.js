import express from "express";
import * as assignmentsController from "../controllers/assignment.controller.js";
const router = express.Router();

const methodNotAllowed = (req, res, next) => res.status(405).send({"Message":"Method Not Allowed"});

router
  .route("/assignments")
  .get(assignmentsController.getAll)
  .post(assignmentsController.post)
  .all(methodNotAllowed);
router
  .route("/assignments/:id")
  .get(assignmentsController.getOne)
  .delete(assignmentsController.deleteOne)
  .put(assignmentsController.updateOne)
  .all(methodNotAllowed);
router
  .route("/assignments/:id/submission")
  .post(assignmentsController.submitAssignment)
  .all(methodNotAllowed);

export default router;
