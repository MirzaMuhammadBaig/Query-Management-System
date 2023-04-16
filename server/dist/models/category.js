"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        required: true,
    },
    imageAlt: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Category = mongoose_1.default.model('Category', categorySchema);
exports.default = Category;
