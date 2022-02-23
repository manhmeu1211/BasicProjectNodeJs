import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../../helpers/jwtConfig"
import  { User }  from "../../models/user/user_model";
import { errorHandler, StatusCodeException } from "../../middleware/error_middleware";
import HttpException from "../../common/http-exception";
import { Project } from "../../models/project/project_model";
import * as _ from 'lodash';
import { getToken, md5 } from "../../common/ultils"

class UserController {
  //Get all User and Project of user
  static getAllUser = async (req: Request, res: Response) => {
    let authUser = <any>jwt.verify(getToken(req), config.jwtSecret);

    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'address', 'birthday', 'avatarUrl', 'role'],
        include: {
          model: Project,
          attributes: ['id', 'name', 'createdAt', 'updatedAt', 'status'],
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