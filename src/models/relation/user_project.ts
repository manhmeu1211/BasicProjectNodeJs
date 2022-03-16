import { dbConfig } from "../../helpers/dbconfig";
import { Sequelize, Model, DataTypes } from 'sequelize'

export const User_Project = dbConfig.define('UserProjects', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    selfGranted: DataTypes.BOOLEAN
  }, { timestamps: false });