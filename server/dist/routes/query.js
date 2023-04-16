"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const query_1 = require("../controllers/query");
const queryRouter = express_1.default.Router();
queryRouter.post('/add', query_1.addQuery);
queryRouter.post('/delivered/:id', query_1.deliveredQuery);
queryRouter.post('/add-query-by-admin', query_1.addQueryByAdmin);
queryRouter.get('/get', query_1.getAllQuery);
queryRouter.get('/get/:id', query_1.getQuery);
exports.default = queryRouter;
