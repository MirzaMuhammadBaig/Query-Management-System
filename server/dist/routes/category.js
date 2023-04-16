"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_js_1 = require("../controllers/category.js");
const categoryRouter = express_1.default.Router();
/* create task */
categoryRouter.post('/add', category_js_1.addCategory);
categoryRouter.get('/get/:id', category_js_1.getCategory);
categoryRouter.get('/get', category_js_1.getAllCategory);
exports.default = categoryRouter;
