/**
 * Required External Modules and Interfaces
 */
 import express, { Request, Response } from "express";
 import { checkJwt } from "../../middleware/auth_middleware/auth_middleware";
 import CompanyController from "../../controllers/company_controller/company_controller";
 /**
  * Router Definition
  */
 export const companyRouter = express.Router();
 
 /**
  * Routes Definitions
  */
 
 // GET all company/
 companyRouter.get("/", [checkJwt], CompanyController.getAllCompany);
 
 // GET company/:id
 companyRouter.get("/:id", [checkJwt], CompanyController.getCompany);
 
 // Create company/
 companyRouter.post("/", [checkJwt], CompanyController.createCompany);
 
 // Update company/:id
 companyRouter.put("/:id", [checkJwt], CompanyController.updateCompany);
 
 // DELETE company/:id
 companyRouter.delete("/:id", [checkJwt], CompanyController.deleteCompany);