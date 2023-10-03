import express from "express";
import * as assignmentsController from "../controllers/assignment.controller.js";
const router = express.Router();

router
  .route("/assignments")
  .get(assignmentsController.getAll)
  .post(assignmentsController.post);
router
  .route("/assignments/:id")
  .get(assignmentsController.getOne)
  .delete(assignmentsController.deleteOne)
  .put(assignmentsController.updateOne);;

//router.post("/assignments", upload.any(), assignmentsController.post);

/* router
  .route("/assignments/:id")
  .get(assignmentsController.getOne)
  .delete(assignmentsController.deleteOne); */

export default router;
