import { DataTypes } from "sequelize";
import { sequelize } from "../utils/utils.js";

const Assignment = sequelize.define(
  "assignments",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      readOnly: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      readOnly: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name cannot be an empty string.",
        },
      },
    },
    user_id: {
      type: DataTypes.UUID,
      readOnly: true,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      readOnly: true,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: "Points must be an integer.",
        },
        notEmpty: {
          args: true,
          msg: "Points cannot be an empty",
        },
        min: 1,
        max: 100,
      },
    },
    num_of_attempts: {
      type: DataTypes.INTEGER,
      readOnly: true,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: "Number of attempts must be an integer.",
        },
        notEmpty: {
          args: true,
          msg: "Number of attempts cannot be an empty",
        },
        min: {
          args: 1,
          msg: "Number should be greater than 1",
        },
        max: {
          args: 100,
          msg: "Number should be less than 100",
        },
      },
    },
    deadline: {
      type: DataTypes.DATE,
      readOnly: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Deadline cannot be an empty",
        },
        isDate: {
          args: true,
          msg: 'Invalid date format.Please use format (e.g., "2016-08-29T09:12:33.001Z").',
        },
      },
    },
  },
  {
    createdAt: "assignment_created",
    updatedAt: "assignment_updated",
  }
);

try {
  await sequelize.authenticate();
  console.log("Database connection has been established successfully.");
  await Assignment.sync({ alter: true });
  console.log("Documents model was synchronized successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default Assignment;
