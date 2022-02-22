/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import { verifyUser } from "../../middleware/auth_middleware/auth_middleware";
import UserController from "../../controllers/user_controller/user_controller";
/**
 * Router Definition
 */
export const usersRouter = express.Router();

/**
 * Routes Definitions
 */

// GET List Users/
usersRouter.get("/", [verifyUser], UserController.getAllUser);

// GET Detail User/:id
usersRouter.get("/:id", [verifyUser], UserController.getUser);

// Create User/
usersRouter.post("/", [verifyUser], UserController.createUser);

// Update Employee/
usersRouter.put("/:id", [verifyUser], UserController.updateUser);

// DELETE Employee/:id
usersRouter.delete("/:id", [verifyUser], UserController.deleteUser); 