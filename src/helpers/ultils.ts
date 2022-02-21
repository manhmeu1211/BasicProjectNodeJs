import * as crypto from "crypto";
import config from "../helpers/jwtConfig";
import * as jwt from "jsonwebtoken";
import { Request } from "express";

// Some common func
class Ultils {
    static md5 = (data: string) => {
        return crypto.createHash('md5').update(data).digest("hex");
    };

    static verifyToken = (token: string) => {
        try {
            return jwt.verify(token, config.jwtSecret);
        } catch (ex) {
            return null
        }
    };
    static signToken = (data: any) => {
        return jwt.sign({ ...data }, config.jwtSecret, { expiresIn: '24h' });
    };

    static getToken = (req: Request) => {
        const token = <string>req.header('Authorization').replace('Bearer ', '');
        return token;
    }
}

export default Ultils;

