import StatsD from "node-statsd";
import * as dotenv from "dotenv";
dotenv.config();

const client = new StatsD({
  host: "localhost",
  port: 8125,
});

export default client;
