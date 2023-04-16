"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const channelSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    },
    channelName: {
        type: String,
        required: true,
    },
    channelType: {
        type: String,
        required: true,
    },
    picturePath: {
        type: String,
        required: true,
    },
    channelAccessToken: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Channel = mongoose_1.default.model('Channel', channelSchema);
exports.default = Channel;
