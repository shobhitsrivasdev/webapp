import healthzRouter from "./healthz.route.js";
import assignmentRouter from "./assignments.route.js";

export default (app) => {
  app.use(healthzRouter);
  app.use("/v1/", assignmentRouter);
};
