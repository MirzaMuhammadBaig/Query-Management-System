import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  addQuery,
  addQueryByAdmin,
  deliveredQuery,
  getAllQuery,
  getQuery,
} from '../controllers/query';

const queryRouter = express.Router();

queryRouter.post('/add', addQuery);
queryRouter.post('/delivered/:id', deliveredQuery);

queryRouter.post('/add-query-by-admin', addQueryByAdmin);

queryRouter.get('/get', getAllQuery);
queryRouter.get('/get/:id', getQuery);

export default queryRouter;
