import express from 'express';
import { AddAdmin, getAllUsers, login, register } from '../controllers/auth.js';

const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);

authRoutes.post('/add-admin', AddAdmin);
authRoutes.get('/get-users', getAllUsers);

export default authRoutes;
