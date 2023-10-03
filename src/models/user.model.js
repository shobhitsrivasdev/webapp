import { DataTypes } from "sequelize";
import { sequelize } from "../utils/utils.js";
import { hash, genSalt } from "bcrypt";

const Account = sequelize.define(
  "accounts",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      readOnly: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "email",
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: "account_created",
    updatedAt: "account_updated",
  }
);

Account.beforeCreate(async (acc) => {
  try {
    const salt = await genSalt();
    console.log(Date().toString() + " :: Hashing password");
    const hashedPassword = await hash(acc.password, salt);
    acc.password = hashedPassword;
  } catch (e) {
    console.log(e);
  }
});

try {
  await sequelize.authenticate();
  console.log("Database connection has been established successfully.");
  await Account.sync({ alter: true });
  console.log("Account model was synchronized successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default Account;
