/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import ProjectController from "../../controllers/project_controller/project_controller";
import { checkJwt } from "../../middleware/auth_middleware/auth_middleware";

/**
 * Router Definition
 */
export const projectRouter = express.Router();

/**
 * Routes Definitions
 */
// Get all project with filter and search
projectRouter.get("/", ProjectController.getAllProject);

//Get detail project
projectRouter.get("/:id", ProjectController.getProject)

//Create project
projectRouter.post("/", ProjectController.createProject)

// Update Project
projectRouter.put("/:id", [checkJwt], ProjectController.updateProject);

// DELETE Project/:id
projectRouter.delete("/:id", [checkJwt], ProjectController.deleteProject);

