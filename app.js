import express from "express";
const app = express();
//import healthz from "./routes/healthz.route.js";
import routes from "./src/routes/index.js";
import { create } from "./src/services/userService.js";
import  logger from "./configs/logger.config.js";
app.use(express.json());
app.disable("x-powered-by");

//app.use("/healthz", healthz);
routes(app);
create();
//createUser();
const port = process.env.PORT || 8080;

app.listen(port, () => {
  logger.info(`Server running at ${port}`);
  console.log(`Server running at ${port}`);
});
