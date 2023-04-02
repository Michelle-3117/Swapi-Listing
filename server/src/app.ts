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
database.sync()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Database connected successfully");
  })
  // eslint-disable-next-line no-console
    .catch((error: any) => console.log(error));
  

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', commentRouter);
app.use('/movie', movieRouter);
app.use('/people', characterRouter)


export default app;
