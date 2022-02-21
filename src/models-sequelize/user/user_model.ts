import { dbConfig } from "../../helpers/dbconfig";
import { Sequelize, Model, DataTypes } from 'sequelize'

//User table
export const User = dbConfig.define("users", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: "The field cannot be empty"
        }
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: "The field cannot be empty"
        }
      },
    },
    name: DataTypes.TEXT,
    address: DataTypes.TEXT,
    birthday: DataTypes.TEXT,
    avatar_url: DataTypes.TEXT,
    company_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate:{
        notEmpty: {
          msg: "The field cannot be empty"
        }
      },
    },
    project_id: {
      type: DataTypes.INTEGER,
    }
});