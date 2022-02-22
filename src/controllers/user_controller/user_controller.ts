import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../../helpers/jwtConfig"
import  { User }  from "../../models/user/user_model";
import { errorHandler, StatusCodeException } from "../../middleware/error_middleware";
import HttpException from "../../common/http-exception";
import { Project } from "../../models/project/project_model";
import * as _ from 'lodash';
import { getToken, md5 } from "../../common/ultils"
import { Colums } from "../../common/strings";

class UserController {
  //Get all User and Project of user
  static getAllUser = async (req: Request, res: Response) => {
    let authUser = <any>jwt.verify(getToken(req), config.jwtSecret);

    try {
      const users = await User.findAll({
        attributes: [Colums.id, Colums.name, Colums.address, Colums.birthday, Colums.avatarUrl, Colums.role],
        include: {
          model: Project,
          attributes: [Colums.id, Colums.name, Colums.createdAt, Colums.updatedAt, Colums.status]
        },
        where: {
          company_id: authUser.company_id
        }
      })
      if (users.length === 0) {
        errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, 'List user is empty'), req, res)
      } else {
        res.status(StatusCodeException.SUCESS).send({status: StatusCodeException.SUCESS, users: users})
      }
    } catch (e) {
      errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, e.message), req, res)
    }
  }

 
}
export default UserController;