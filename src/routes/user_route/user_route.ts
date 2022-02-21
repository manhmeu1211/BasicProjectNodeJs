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

// GET Employees/
usersRouter.get("/", [checkJwt], UserController.getAllUser);

// GET Employee/:id
usersRouter.get("/:id", [checkJwt], UserController.getUser);

// Create Employee/
usersRouter.post("/", [checkJwt], UserController.createUser);

// Update Employee/
usersRouter.put("/:id", [checkJwt], UserController.updateUser);

// DELETE Employee/:id
usersRouter.delete("/:id", [checkJwt], UserController.deleteUser);