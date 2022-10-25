import * as dotenv from 'dotenv';
import path from 'path';
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
const envPath = path.resolve(__dirname, `../../${envFile}`);
dotenv.config({ path: envPath });
import express from 'express';
import { router } from './routes/index.routes';

export const app = express();

app.use(express.json());
app.use('/', router);
