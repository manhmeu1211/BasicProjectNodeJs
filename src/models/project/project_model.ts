import { dbConfig } from "../../helpers/dbconfig";
import { Sequelize, Model, DataTypes } from 'sequelize'
import { User } from "../user/user_model";
import { Company } from "../company/company_model";

export const Project = dbConfig.define("projects", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT,
  },
  company_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  status: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 2
  }
});