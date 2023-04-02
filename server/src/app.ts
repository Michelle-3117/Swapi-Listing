import express from "express";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import database from './db/database.config'
import commentRouter from './routes/commentRoute';
import movieRouter from './routes/movieRoute'
import characterRouter from "./routes/characterRoute";
// var usersRouter = require('./routes/users');
const app = express();

app.use("/api", commentRouter);
app.use("/movie", movieRouter);
app.use("/people", characterRouter);

//swagger api documentation
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import bodyParser from "body-parser";

const swaggerDocs = YAML.load("./documentation.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

database.sync()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Database connected successfully");
  })
  // eslint-disable-next-line no-console
    .catch((error: any) => console.log(error));
  
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

export default app;
