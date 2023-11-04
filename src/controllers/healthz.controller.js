import db from "../models/index.js";
import logger from "../../configs/logger.config.js";
const healthz = (req, res) => {
  logger.info("Hitting Healthz API");
  try {
    if (req.method !== "GET") {
      res.status(405).end();
    } else if (
      (req.method === "GET" && req.body && Object.values(req.body).length) ||
      (req.query && Object.values(req.query).length)
    ) {
      res.status(400).end();
    } else {
      db.connectionTest()
        .then(() => {
          res.header("Cache-Control", "no-cache no-store, must-revalidate");
          res.status(200).end();
        })
        .catch(() => {
          res.status(503).end();
        });
    }
  } catch (error) {
    console.error(error);
  }
};

export default healthz;
