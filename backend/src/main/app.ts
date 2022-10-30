import * as dotenv from 'dotenv';
import path from 'path';
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
const envPath = path.resolve(__dirname, `../../${envFile}`);
dotenv.config({ path: envPath });
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { router } from './routes/index.routes';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);

const errorLogger = (error: Error, request: Request, response: Response, next: NextFunction) => {
  console.log( `[error]: ${error.message}`);
  next(error);
}

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return response.status(400).json({
      message: error.message,
    });
  }
  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${error}`,
  });
}

app.use(errorLogger);
app.use(errorHandler);
