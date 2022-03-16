import { Request, Response } from "express";
import { getToken, signToken, md5, signRefreshToken } from "../.././common/ultils"
import { User } from "../../models/user/user_model";
import { errorHandler, StatusCodeException } from "../../middleware/error_middleware";
import HttpException from "../../common/http-exception";
import * as _ from 'lodash';

//Authen and author
class AuthController {
    static login = async (req: Request, res: Response) => {
        //Check if username and password are set
        let { username, password } = req.body;
        if (!(username && password)) {
            res.status(StatusCodeException.BAD_REQUEST).send("Please input user name or password");
        }
        try {
            //Query
            let passwordMd5 = `${md5(`${password}`)}`;
            const users = await User.findAll({
                attributes: ['id', 'name', 'address', 'birthday', 'company_id'],
                where: {
                    username: username,
                    password: passwordMd5
                }
            });
            //Handle data
            if (_.first(users) === undefined) {
                errorHandler(new HttpException(StatusCodeException.BAD_REQUEST, 'Email or password wrong'), req, res)
            } else {
                let token = signToken({
                    id: _.first(users).getDataValue('id'),
                    name: _.first(users).getDataValue('name'),
                    address: _.first(users).getDataValue('address'),
                    birthday: _.first(users).getDataValue('birthday'),
                    company_id: _.first(users).getDataValue('company_id'),
                })

                let refreshToken = signRefreshToken({
                    id: _.first(users).getDataValue('id'),
                    name: _.first(users).getDataValue('name'),
                    address: _.first(users).getDataValue('address'),
                    birthday: _.first(users).getDataValue('birthday'),
                    company_id: _.first(users).getDataValue('company_id'),
                })
                res.status(StatusCodeException.SUCESS).send({ status: StatusCodeException.SUCESS, token: token, refreshToken: refreshToken })
            }
        } catch {
            errorHandler(new HttpException(StatusCodeException.SOMETHIMG_WRONG, 'Something went wrong'), req, res)

        }
    }
}
export default AuthController;