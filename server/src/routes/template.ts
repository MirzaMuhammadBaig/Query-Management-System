import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  addTemplate,
  getAllTemplate,
  getAllTemplateByCategory,
  getTemplate,
} from '../controllers/template.js';

const templateRouter = express.Router();

/* create task */
templateRouter.post('/add', addTemplate);
templateRouter.get('/get/:id', getTemplate);
templateRouter.get('/get-by-category/:category', getAllTemplateByCategory);
templateRouter.get('/get', getAllTemplate);

export default templateRouter;
