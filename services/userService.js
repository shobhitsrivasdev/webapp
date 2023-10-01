import Account from "../models/user.model.js";
import csv from "csv-parser";
import fs from "fs";

export const create = async () => {
  fs.createReadStream("utils/users.csv")
    .pipe(csv())
    .on("data", async (data) => {
      console.log(data);
      const getUser = await Account.findOne({
        where: {
          email: data.email,
        },
      }).catch((err) => {
        console.error("Internal server error while creating user", err);
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
        });
      }
    });
};
