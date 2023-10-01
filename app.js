import express from "express";
const app = express();
//import healthz from "./routes/healthz.route.js";
import routes from "./routes/index.js";
import { create } from "./services/userService.js";

app.use(express.json());
app.disable("x-powered-by");

//app.use("/healthz", healthz);
routes(app);
create();
//createUser();
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
