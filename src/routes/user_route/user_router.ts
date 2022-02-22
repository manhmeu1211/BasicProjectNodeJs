/**
 * Required External Modules and Interfaces
 */
 import express, { Request, Response } from "express";
 import { checkJwt } from "../../middleware/auth_middleware/auth_middleware";
 import UserController from "../../controllers/user_controller/user_controller";
 /**
  * Router Definition
  */
 export const usersRouter = express.Router();
 
 /**
  * Routes Definitions
  */
 
 // GET List Users/
usersRouter.get("/", [checkJwt], UserController.getAllUser);
 
// GET Detail User/:id
usersRouter.get("/:id", [checkJwt], UserController.getUser);

 // Create User/
 usersRouter.post("/", [checkJwt], UserController.createUser);
 