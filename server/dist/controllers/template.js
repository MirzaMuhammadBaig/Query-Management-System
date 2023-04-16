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
exports.getTemplate = exports.getAllTemplateByCategory = exports.getAllTemplate = exports.addTemplate = void 0;
const template_js_1 = __importDefault(require("../models/template.js"));
const addTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, name, description, category, imageSrc, imageAlt } = req.body;
        console.log('🚀 ~ file: template.ts:7 ~ addTemplate ~ req.body', req.body);
        const newTemplate = new template_js_1.default({
            userId,
            name,
            description,
            category,
            imageSrc,
            imageAlt,
        });
        const savedTemplate = yield newTemplate.save();
        res.status(201).json(savedTemplate);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.addTemplate = addTemplate;
const getAllTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Templates = yield template_js_1.default.find({});
        res.status(200).json(Templates);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getAllTemplate = getAllTemplate;
const getAllTemplateByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        console.log('🚀 ~ file: template.ts:35 ~ getAllTemplateByCategory ~ category', category);
        const Templates = yield template_js_1.default.find({ category });
        res.status(200).json(Templates);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getAllTemplateByCategory = getAllTemplateByCategory;
const getTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const template = yield template_js_1.default.findById(id);
        res.status(200).json(template);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
});
exports.getTemplate = getTemplate;
