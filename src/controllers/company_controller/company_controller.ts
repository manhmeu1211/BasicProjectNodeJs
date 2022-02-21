import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../../helpers/jwtConfig"
import { User } from "../../models-sequelize/user/user_model";
import { errorHandler, StatusCodeException } from "../../middleware/error_middleware";
import HttpException from "../../common/http-exception";
import Ultils from "../../common/ultils";
import { Project } from "../../models-sequelize/project/project_model";
import * as _ from 'lodash';
import { Company } from "../../models-sequelize/company/company_model";

class CompanyController {
    //Get all Company and Project of user
    static getAllCompany = async (req: Request, res: Response) => {
        let authUser = <any>jwt.verify(Ultils.getToken(req), config.jwtSecret);
        try {
            if (authUser.role === 1) {
                const companies = await Company.findAll({
                    include: {
                        model: User,
                        attributes: ['id', 'name', 'address', 'birthday', 'avatar_url', 'role']
                    }
                })
                if (companies.length === 0) {
                    errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, 'List user is empty'), req, res)
                } else {
                    res.status(StatusCodeException.SUCESS).send({ status: StatusCodeException.SUCESS, companies: companies })
                }
            } else {
                errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, "You have not permission"), req, res)
            }
        } catch (e) {
            errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, e.message), req, res)
        }
    }

    //Get one Company and User of company
    static getCompany = async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        try {
            const company = await Company.findOne({
                where: {
                    id: id
                },
                include: {
                    model: User,
                    attributes: ['id', 'name', 'address', 'birthday', 'avatar_url', 'role']
                }
            });
            if (!company) {
                errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, 'Cannot find company'), req, res)
            } else {
                res.status(StatusCodeException.SUCESS).send({ status: StatusCodeException.SUCESS, company: company })
            }
        } catch (e) {
            errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, e.message), req, res)
        }
    }

    static createCompany = async (req: Request, res: Response) => {
        try {
            const companyExits = await Company.findOne({ where: { username: req.body.username } })
            if (!companyExits) {
                const company = await Company.create(
                    {
                        name: req.body.name,
                        address: req.body.address
                    });
                res.status(StatusCodeException.SUCESS).send({ status: StatusCodeException.SUCESS, company: company })
            } else {
                errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, 'Company exits'), req, res)
            }
        } catch (e) {
            errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, e.message), req, res)
        }
    }

    static updateCompany = async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        try {
            const updateCompany = await Company.update(
                {
                    name: req.body.name,
                    address: req.body.address
                }, {
                where: {
                    id: id
                }
            });
            if (_.first(updateCompany) === 1) {
                const company = await User.findOne({ where: { id: id } });
                res.status(StatusCodeException.SUCESS).send({ status: StatusCodeException.SUCESS, message: "Sucess", company: company })
            } else {
                errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, "Update company fail"), req, res)
            }
        } catch (e) {
            errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, e.message), req, res)
        }
    }

    static deleteCompany = async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        try {
            const company = await Company.destroy({
                where: {
                    id: id
                }
            });
            res.status(StatusCodeException.SUCESS).send({ status: StatusCodeException.SUCESS, message: "Success" })
        } catch (e) {
            errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, e.message), req, res)
        }
    }
}
export default CompanyController;
