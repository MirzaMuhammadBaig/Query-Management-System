import express from 'express';
import { addToken, getToken } from '../controllers/token.js';

const tokenRoutes = express.Router();

tokenRoutes.post('/add', addToken);
tokenRoutes.get('/get', getToken);

export default tokenRoutes;
