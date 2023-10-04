import Account from "../models/user.model.js";
import csv from "csv-parser";
import fs from "fs";

export const create = async () => {
  fs.createReadStream(process.env.CSVPATH)
    .on("error", () => {
      console.error("Error in reading file");
    })
    .pipe(csv())
    .on("data", async (data) => {
      console.log(data);
      const getUser = await Account.findOne({
        where: {
          email: data.email,
        },
      }).catch((err) => {
        console.error("Service Unavailable");
      });
      if (getUser) {
        console.error("User Already Exists");
      } else {
        console.log("BUILDING");
        Account.create({
          first_name: data.first_name,
          last_name: data.last_name,
          password: data.password,
          email: data.email,
        }).catch((err) => {
          console.error("Service Unavailable");
        });
      }
    });
};
