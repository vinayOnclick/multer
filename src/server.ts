import * as express from "express";
import * as  dotenv from "dotenv";
import * as mongoose from "mongoose";

import { getEnvironment } from "./environments/env";
import bodyParser = require("body-parser");
import UserRouter from "../src/src/user/router";

export class Server {
  public app: express.Application = express();

  constructor() {
    dotenv.config()

    this.setConfigurations();
    this.setRoutes();
    this.error404Handler();
    this.HandleErrors();
    this.setHeaders();
  }
  
  setConfigurations() {
    this.ConnectMongoDB();
    this.Configurations();
  }

  ConnectMongoDB() {
    const database_url = getEnvironment().db_url;
    mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log("mongodb is connected");
    });
  }

  Configurations() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    
  }

  setRoutes() {
    this.app.use("/src/uploads", express.static("src/uploads"));
     this.app.use("/user", UserRouter);
     

    
  }

  error404Handler() {
    this.app.use((req, res) => {
      console.log("error not found 404");
      res.status(404).json({
        message: "Not Found",
        Status_code: 404,
      });
    });
  }

  setHeaders() {
    this.app.use(function (req, res, next) {
      // Website you wish to allow to connect
      res.setHeader("Access-Control-Allow-Origin", "*");
      // Request methods you wish to allow
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      // Request headers you wish to allow
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,content-type"
      );
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      next();
    });
  }

  HandleErrors() {
    this.app.use((error, req, res, next) => {
      const errorstatus = req.errorStatus || 400;
      console.log(errorstatus);
      res.status(errorstatus).json({
        message: error.message || "Something Went Wrong. Please try Again!",
        status_code: errorstatus,
      });
    });
  }
}
