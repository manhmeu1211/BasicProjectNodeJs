import { dbConfig } from "../../helpers/dbconfig";
import { Sequelize, Model, DataTypes } from 'sequelize'
import { Project } from "../project/project_model";
import { Company } from "../company/company_model";
import { User_Project } from "../relation/user_project";

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
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: "The field cannot be empty"
        }
      },
    }
});

//Relation between User and Project
// User and Project relation many - many select through User_Project
User.belongsToMany(Project, { through: User_Project });
Project.belongsToMany(User, { through: User_Project });

//User has many Project
User.hasMany(User_Project);

//Through from User_Project
User_Project.belongsTo(User);

//Project has many Project
Project.hasMany(User_Project);

//Through from User_Project
User_Project.belongsTo(Project); 