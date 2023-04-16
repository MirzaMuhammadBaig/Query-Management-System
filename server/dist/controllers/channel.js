"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannel = exports.addChannel = void 0;
const channel_js_1 = __importDefault(require("../models/channel.js"));
const addChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, channelId, channelName, channelType, picturePath, channelAccessToken } = req.body;
        const newChannel = new channel_js_1.default({
            userId,
            channelId,
            channelName,
            channelType,
            picturePath,
            channelAccessToken,
        });
        const savedChannel = yield newChannel.save();
        delete savedChannel.channelAccessToken;
        res.status(201).json(savedChannel);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.addChannel = addChannel;
const getChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const channel = yield channel_js_1.default.find({ userId });
        const newChannel = channel.map((channel) => {
            delete channel.channelAccessToken;
            return channel;
        });
        res.status(200).json(newChannel);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getChannel = getChannel;
