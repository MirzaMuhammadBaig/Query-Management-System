import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

/** custom imports */
import authRoutes from './routes/auth.js';
import templateRouter from './routes/template.js';
import tokenRoutes from './routes/token.js';
import queryRouter from './routes/query.js';
import categoryRouter from './routes/category.js';
import { addTemplate } from './controllers/template.js';
import { addCategory } from './controllers/category.js';
import { nameString } from './config/nodemailer.js';

/* CONFIGURATIONS */
dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(cors());

/* ROUTES */
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ massage: 'Express + TypeScript Server' });
});
app.use('/auth', authRoutes);
app.use('/token', tokenRoutes);
app.use('/query', queryRouter);
app.use('/template', templateRouter);
app.use('/category', categoryRouter);

/* MONGOOSE SETUP */
const port = process.env.PORT || 8080;
const MONGO_URL = String(process.env.MONGO_URL);
mongoose.set('strictQuery', true);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    /** running server */
    app.listen(port, () =>
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`),
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
