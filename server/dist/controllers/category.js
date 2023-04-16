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
exports.getCategory = exports.getAllCategory = exports.addCategory = void 0;
const category_js_1 = __importDefault(require("../models/category.js"));
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, name, category, imageSrc, imageAlt } = req.body;
        console.log('🚀 ~ file: category.ts:7 ~ addCategory ~ req.body', req.body);
        const newCategory = new category_js_1.default({
            userId,
            name,
            category,
            imageSrc,
            imageAlt,
        });
        const savedCategory = yield newCategory.save();
        res.status(201).json(savedCategory);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.addCategory = addCategory;
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_js_1.default.find({});
        res.status(200).json(categories);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getAllCategory = getAllCategory;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield category_js_1.default.findById(id);
        res.status(200).json(category);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
});
exports.getCategory = getCategory;
