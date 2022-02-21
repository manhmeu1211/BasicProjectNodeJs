import { dbConfig } from "../../helpers/dbconfig";
import { Sequelize, Model, DataTypes } from 'sequelize'
import { User } from "../user/user_model";
import { Project } from "../project/project_model";

export const Company = dbConfig.define("companies", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: "The field cannot be empty"
        }
      },
    },
    address: DataTypes.TEXT
});

Company.hasMany(User, { foreignKey: "company_id"})