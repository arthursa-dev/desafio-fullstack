import * as dotenv from 'dotenv';
import path from 'path';
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
const envPath = path.resolve(__dirname, `../../${envFile}`);
dotenv.config({ path: envPath });
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import { router } from './routes/index.routes';

export const app = express();

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Desafio FullStack - Maxxidata",
      version: "0.1.0",
      description:
        "Em todo aplicativo comercial temos um controle dos profissionais envolvidos no processo sejam \
        usuários, responsáveis, gerentes, administradores, operadores, etc. Por isso um ponto importante \
        de qualquer aplicação é permitir designarmos estas funções ou seja categorizar em tipos estes \
        profissionais. Ex.: ProfissionalAna = Médica, José = Professor...\
        \n\
        Essa API permite consultar, criar e editar essas informações, mantendo essa relação \
        entre o profissional e seu tipo.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Arthur Almeida",
        email: "arthurdosantosalmeida@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3333/",
      },
    ],
  },
  apis: ["./src/main/routes/*.routes.ts"],
};

const specs = swaggerJSDoc(options);

app.use(cors());
app.use(express.json());
app.use('/', router);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

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
