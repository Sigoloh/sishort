import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {router} from "./routes";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    
    // setup express app here
    app.use(router);
    // start express server
    app.listen(3000);
    
    console.log("Express server has started on port 3000");

}).catch(error => console.log(error));
