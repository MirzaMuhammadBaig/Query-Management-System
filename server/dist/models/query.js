"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const querySchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    adminId: {
        type: String,
    },
    templateId: {
        type: String,
        required: true,
    },
    projectId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    driveLink: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'delivered'],
        default: 'pending',
    },
}, { timestamps: true });
exports.QUERY = mongoose_1.default.model('QUERY', querySchema);
