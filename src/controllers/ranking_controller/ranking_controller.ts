import { errorHandler, StatusCodeException } from "../../middleware/error_middleware";
import HttpException from "../../common/http-exception";
import { Request, Response } from "express";
import { Project } from "../../models/project/project_model";
import { User } from "../../models/user/user_model";
import { Sequelize } from "sequelize";
import { getToken } from "../../common/ultils";
import config from "../../helpers/jwtConfig"
import * as jwt from "jsonwebtoken";
import { Colums } from "../../common/strings";

export default class RankingController {
    //Ranking for user with project closed
    static getRankingCompany = async (req: Request, res: Response) => {
        let authUser = <any>jwt.verify(getToken(req), config.jwtSecret);
        const companyId = req.query.companyId;
        try {
            const users = await User.findAll({
                attributes: [Colums.id, Colums.name, Colums.address, Colums.birthday, Colums.avatarUrl, Colums.role],
                include: {
                    model: Project,
                    as: "projects",
                    attributes: [Colums.id, Colums.name, Colums.createdAt, Colums.updatedAt, Colums.status],
                    where: {
                        status: ProjectStatus.CLOSE
                    }
                },
                where: {
                    company_id: companyId ?? authUser.company_id,
                },
                order: [[Sequelize.literal('`projects->UserProjects`.`projectId`'), 'DESC']]
            })
            if (users.length === 0) {
                errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, 'List user is empty'), req, res)
            } else {
                res.status(StatusCodeException.SUCESS).send({ status: StatusCodeException.SUCESS, users: users })
            }
        } catch (e) {
            errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, e.message), req, res)
        }
    }
}
enum ProjectStatus { NOT_CLOSE = 2, CLOSE = 1 }