import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { addCategory, getAllCategory, getCategory } from '../controllers/category.js';

const categoryRouter = express.Router();

/* create task */
categoryRouter.post('/add', addCategory);
categoryRouter.get('/get/:id', getCategory);
categoryRouter.get('/get', getAllCategory);

export default categoryRouter;
