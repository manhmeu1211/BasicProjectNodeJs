import * as crypto from "crypto";
import config from "../helpers/jwtConfig";
import * as jwt from "jsonwebtoken";
import { Request } from "express";

// Some common func
export function getToken(req: Request): string {
    const token = <string>req.header('Authorization').replace('Bearer ', '');
     return token;
}

export function md5 (data: string): string {
    return crypto.createHash('md5').update(data).digest("hex");
};

export function verifyToken (token: string) {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (ex) {
        return null
    }
};
export function signToken(data: any) {
    return jwt.sign({ ...data }, config.jwtSecret, { expiresIn: '24h' });
};

export function signRefreshToken(data: any) {
    return jwt.sign({ ...data }, config.jwtSecret, { expiresIn: '48h' });
};
