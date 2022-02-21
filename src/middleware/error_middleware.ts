import HttpException from "../helpers/http-exception";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response
) => {
  const status = error.statusCode || 500;
  const message =
    error.message || "We are having some problems.";

  response.status(status).send({statusCode: status, message: message});
};

export enum StatusCodeException {
    SUCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    INTERNAL_SEVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 501,
    SOMETHIMG_WRONG = 600
}