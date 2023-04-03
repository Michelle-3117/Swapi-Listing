import express from "express";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import database from './db/database.config'

//Routes
import commentRouter from './routes/commentRoute';
import movieRouter from './routes/movieRoute'
import characterRouter from "./routes/characterRoute";

import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", commentRouter);
app.use("/movie", movieRouter);
app.use("/people", characterRouter);

//swagger api documentation
const swaggerDocs = YAML.load("./documentation.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

database.sync()
  .then(() => {
    console.log("Database connected successfully");
  })
    .catch((error: any) => console.log(error));
  
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

export default app;
