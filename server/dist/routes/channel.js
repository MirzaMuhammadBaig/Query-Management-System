"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("../middleware/auth.js");
const channel_js_1 = require("../controllers/channel.js");
const channelRouter = express_1.default.Router();
/* create task */
channelRouter.post('/add', auth_js_1.verifyToken, channel_js_1.addChannel);
channelRouter.get('/get', channel_js_1.getChannel);
exports.default = channelRouter;
