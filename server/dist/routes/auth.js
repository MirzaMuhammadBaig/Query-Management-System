"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("../controllers/auth.js");
const authRoutes = express_1.default.Router();
authRoutes.post('/register', auth_js_1.register);
authRoutes.post('/login', auth_js_1.login);
authRoutes.post('/add-admin', auth_js_1.AddAdmin);
authRoutes.get('/get-users', auth_js_1.getAllUsers);
exports.default = authRoutes;
