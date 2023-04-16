"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_js_1 = require("../controllers/token.js");
const tokenRoutes = express_1.default.Router();
tokenRoutes.post('/add', token_js_1.addToken);
tokenRoutes.get('/get', token_js_1.getToken);
exports.default = tokenRoutes;
