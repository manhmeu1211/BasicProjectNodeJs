/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import RankingController from "../../controllers/ranking_controller/ranking_controller";
import { verifyUser } from "../../middleware/auth_middleware/auth_middleware";

/**
 * Router Definition
 */
export const rankingRouter = express.Router();

/**
 * Routes Definitions
 */
// Get ranking for user in company
rankingRouter.get("/", [verifyUser], RankingController.getRankingCompany);