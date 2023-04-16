"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("../middleware/auth.js");
const task_js_1 = require("../controllers/task.js");
const taskRouter = express_1.default.Router();
/* create task */
taskRouter.post('/create', auth_js_1.verifyToken, task_js_1.createTask);
taskRouter.get('/get', auth_js_1.verifyToken, task_js_1.getTasks);
exports.default = taskRouter;
