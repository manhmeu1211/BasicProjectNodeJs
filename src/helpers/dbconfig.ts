//DB config
import * as sequelize from "sequelize";
 
export const dbConfig = new sequelize.Sequelize(
    (process.env.DB_NAME = "employee"),
    (process.env.DB_USER = "root"),
    (process.env.DB_PASSWORD = "Manhmeu@1211"),
    {
        port: Number(process.env.DB_PORT) || 3306,
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        pool: {
            min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000,
        },
    }
);

 
