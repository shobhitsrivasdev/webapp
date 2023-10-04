import express from "express";
import healthz from "../controllers/healthz.controller.js";

const router = express.Router();
router.get("/healthz/", healthz);

export default router;
