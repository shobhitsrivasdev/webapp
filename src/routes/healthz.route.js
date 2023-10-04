import express from "express";
import healthz from "../controllers/healthz.controller.js";

const router = express.Router();

const methodNotAllowed = (req, res, next) =>
  res.status(405).send({ Message: "Method Not Allowed" });

router.route("/healthz").get(healthz).all(methodNotAllowed);

export default router;
