import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import router from "../routes/healthz.route.js";

const app = express();
app.use(bodyParser.json());
app.use(router);

console.log("ENV---", process.env);
console.log("PORTTT---", process.env.PGDATABASE);
console.log("ENV---", process.env.NODE_ENV);
describe("Healthz Endpoint", () => {
  it("should return 200 for successful GET requests without body or query", async () => {
    // Mock successful DB connection for this test
    jest.mock("../models/index.js", () => ({
      connectionTest: () => Promise.resolve(),
    }));
    const res = await request(app).get("/healthz");
    expect(res.statusCode).toEqual(200);
  });
});
