/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import { verifyUser } from "../../middleware/auth_middleware/auth_middleware";
import ProjectController from "../../controllers/project_controller/project_controller";
/**
 * Router Definition
 */
export const projectRouter = express.Router();

/**
 * Routes Definitions
 */

// GET List Project/
projectRouter.get("/", [verifyUser], ProjectController.getAllProject);

// GET Detail Project/:id
projectRouter.get("/:id", [verifyUser], ProjectController.getProject);

//Create project
projectRouter.post("/", [verifyUser], ProjectController.createProject)

// Update Project
projectRouter.put("/:id", [verifyUser], ProjectController.updateProject);

// DELETE Project/:id
projectRouter.delete("/:id", [verifyUser], ProjectController.deleteProject);