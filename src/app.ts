/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/error_middleware";
import { dbConfig } from './helpers/dbconfig'
import { authRouter } from "./routes/auth_route/auth_route";
import * as _ from 'lodash';

//Load env varriable from file .env to process.env
dotenv.config();
/**
 * App Variables
 */

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express()
//Socket config
let http = require("http").Server(app);
let io = require("socket.io")(http);

/**
 *  App Configuration
 */
//PORT config
 if (!process.env.PORT) {
  process.exit(1);
}
//Middleware Express (Security)
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded())

//Auth Router
app.use("/login", authRouter);

//DB connect
dbConfig.authenticate()
  .then(() => console.log("Connected database"))
  .catch(() => console.log("Cannot connect database"))

dbConfig.sync()
  .then(() => console.log("Sync database"))
  .catch(() => console.log("Cannot sync database"))

/**
 * Server Activation
 */

app.get("/", (_req, res) => {
  res.send("Hello world")
});

//Socket event basic

io.on("connection", function (socket: any) {
  console.log("A client connected", socket.id);

  socket.on("message", (message: string) => {
    socket.broadcast.emit("message", message);
  })
});

//Server listener
const server = http.listen(PORT, function () {
  console.log(`Severt listening on PORT:${PORT}`);
});

//Error handler
app.use(errorHandler);

/**
 * Webpack Hot-Module Replacement Activation
 */
type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}