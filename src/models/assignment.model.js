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
    },
    num_of_attempts: {
      type: DataTypes.INTEGER,
      readOnly: true,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      readOnly: true,
      allowNull: false,
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
