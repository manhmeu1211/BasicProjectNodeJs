import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import HttpException from "../../common/http-exception";
import config from "../../helpers/jwtConfig"
import { errorHandler, StatusCodeException } from "../../middleware/error_middleware";

// Check Bearer token
export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.header('Authorization').replace('Bearer ', '');
  let jwtPayload;

  //Try to validate the token and get data.
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized).
    errorHandler(new HttpException(StatusCodeException.UNAUTHORIZED, error.message), req, res)
    return;
  }

  //Call the next middleware or controller.
  next();
}; 