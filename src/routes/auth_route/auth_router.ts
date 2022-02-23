/**
 * Required External Modules and Interfaces
 */
 import express, { Request, Response } from "express";
 import AuthController from "../../controllers/auth_controller/auth_controller";
 /**
  * Router Definition
  */
 export const authRouter = express.Router();
 
 /**
  * Routes Definitions
  */
  authRouter.post("/", AuthController.login);
