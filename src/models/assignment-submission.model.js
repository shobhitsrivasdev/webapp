import { DataTypes } from "sequelize";
import { sequelize } from "../utils/utils.js";
import Assignment from "../models/assignment.model.js";

const AssignmentSubmission = sequelize.define(
  "assignmentSubmission",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      readOnly: true,
      allowNull: false,
    },
    assignment_id: {
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
    submission_url: {
      type: DataTypes.STRING,
      readOnly: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Submission Url cannot be an empty string.",
        },
      },
    },
    submission_date: {
      type: DataTypes.DATE,
      readOnly: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Submission Date cannot be an empty",
        },
        isDate: {
          args: true,
          msg: 'Invalid date format.Please use format (e.g., "2016-08-29T09:12:33.001Z").',
        },
      },
    },
  },
  {
    updatedAt: "submission_updated",
  }
);

try {
  AssignmentSubmission.belongsTo(Assignment, {
    foreignKey: "assignment_id",
    onDelete: "CASCADE",
  });
  await sequelize.authenticate();
  console.log("Database connection has been established successfully.");
  await AssignmentSubmission.sync({ alter: true });
  console.log("Documents model was synchronized successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default AssignmentSubmission;
