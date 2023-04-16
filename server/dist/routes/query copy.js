"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("../middleware/auth.js");
const query_1 = require("../controllers/query");
const templateRouter = express_1.default.Router();
/* create task */
templateRouter.post('/add', auth_js_1.verifyToken, query_1.addQuery);
templateRouter.post('/get', auth_js_1.verifyToken, query_1.getQuery);
exports.default = templateRouter;
