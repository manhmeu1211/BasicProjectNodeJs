import { errorHandler, StatusCodeException } from "../../middleware/error_middleware";
import HttpException from "../../common/http-exception";
import { Request, Response } from "express";
import { Project } from "../../models/project/project_model";
import { User } from "../../models/user/user_model";
import { Op } from "sequelize";
import { Colums } from "../../common/strings";


export default class ProjectController {
    //Get all project (with user in project) with filter and search name project
    static getAllProject = async (req: Request, res: Response) => {
        let { status, keyWords } = req.query
        let where = {}
        if (status && keyWords) {
            where = {
                status: status,
                name: {
                    [Op.like]: '%' + keyWords + '%'
                }
            }
        } else if (status && !keyWords) {
            where = {
                status: status
            }
        } else {
            where = {
                name: {
                    [Op.like]: '%' + keyWords + '%'
                }
            }
        }
        try {
            let projects = await Project.findAll({
                include: {
                    model: User,
                    attributes: [Colums.id, Colums.name, Colums.address, Colums.birthday, Colums.avatarUrl, Colums.role],
                },
                where
            })
            if (projects.length === 0) {
                errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, "List project is empty"), req, res)
            } else {
                res.status(200).send({ status: StatusCodeException.SUCESS, projects: projects })
            }
        } catch (e) {
            errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, e.message), req, res)
        }
    }

    //Get one project (with user in project)
    static getProject = async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        try {
            let project = await Project.findOne({
                include: {
                    model: User,
                    attributes: [Colums.id, Colums.name, Colums.address, Colums.birthday, Colums.avatarUrl, Colums.role],
                },
                where: {
                    id: id
                }
            })
            if (!project) {
                errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, "Cannot find project"), req, res)
            } else {
                res.status(200).send({ status: StatusCodeException.SUCESS, projects: project })
            }
        } catch (e) {
            errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, e.message), req, res)
        }
    }

    //Create project with user in project
    static createProject = async (req: Request, res: Response) => {
        try {
            let project = await Project.findOne({
                include: {
                    model: User,
                    attributes: [Colums.id, Colums.name, Colums.address, Colums.birthday, Colums.avatarUrl, Colums.role],
                },
                where: {
                    name: req.body.name,
                }
            })
            if (!project) {
                const createProject = await Project.create({
                    name: req.body.name,
                    company_id: req.body.company_id,
                    user_id: req.body.user_id,
                    description: req.body.description,
                    User_Project: {
                        selfGranted: true
                    }
                },
                    {
                        include: User
                    })
                if (createProject) {
                    res.status(200).send({ status: StatusCodeException.SUCESS, project: createProject })
                }
            } else {
                errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, "Cannot find project"), req, res)
            }
        } catch (e) {
            errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, e.message), req, res)
        }
    }

    //Create project with user in project
    static updateProject = async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        try {
            let project = await Project.findOne({
                include: {
                    model: User,
                    attributes: [Colums.id, Colums.name, Colums.address, Colums.birthday, Colums.avatarUrl, Colums.role],
                },
                where: {
                    name: req.body.name,
                }
            })
            if (project) {
                const updateProject = await Project.update(
                    {
                        name: req.body.name,
                        company_id: req.body.company_id,
                        user_id: req.body.user_id,
                        description: req.body.description,
                        User_Project: {
                            selfGranted: true
                        }
                    }, {
                    where: {
                        id: id
                    }
                });
                if (updateProject) {
                    res.status(200).send({ status: StatusCodeException.SUCESS, project: updateProject })
                }
            } else {
                errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, "Cannot find project"), req, res)
            }
        } catch (e) {
            errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, e.message), req, res)
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        try {
          const user = await Project.destroy({
            where: {
              id: id
            }
          });
          res.status(StatusCodeException.SUCESS).send({ status: StatusCodeException.SUCESS, message: "Success"})
        } catch (e) {
          errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, e.message), req, res)
        }
      }
}