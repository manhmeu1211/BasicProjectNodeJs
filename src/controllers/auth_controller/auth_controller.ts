import { Request, Response } from "express";
import { md5, signToken } from "../../common/ultils"
import { User } from "../../models-sequelize/user/user_model";
import { errorHandler, StatusCodeException } from "../../middleware/error_middleware";
import HttpException from "../../common/http-exception";
import * as _ from 'lodash';
import { Colums } from "../../common/strings";

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
                attributes: [Colums.id,
                Colums.name,
                Colums.address,
                Colums.birthday,
                Colums.avatarUrl,
                Colums.role,
                Colums.companyId],
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
                    id: _.first(users).getDataValue(Colums.id),
                    name: _.first(users).getDataValue(Colums.name),
                    address: _.first(users).getDataValue(Colums.address),
                    birthday: _.first(users).getDataValue(Colums.birthday),
                    company_id: _.first(users).getDataValue(Colums.companyId),
                    role: _.first(users).getDataValue(Colums.role)
                })
                res.status(StatusCodeException.SUCESS).send({ status: StatusCodeException.SUCESS, token: token })
            }
        } catch {
            errorHandler(new HttpException(StatusCodeException.SOMETHIMG_WRONG, 'Something went wrong'), req, res)

        }
    }
}
export default AuthController;