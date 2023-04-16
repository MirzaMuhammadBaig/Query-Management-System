"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const template_js_1 = require("../controllers/template.js");
const templateRouter = express_1.default.Router();
/* create task */
templateRouter.post('/add', template_js_1.addTemplate);
templateRouter.get('/get/:id', template_js_1.getTemplate);
templateRouter.get('/get-by-category/:category', template_js_1.getAllTemplateByCategory);
templateRouter.get('/get', template_js_1.getAllTemplate);
exports.default = templateRouter;
