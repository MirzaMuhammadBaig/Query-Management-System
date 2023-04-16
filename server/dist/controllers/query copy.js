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
exports.getQuery = exports.addQuery = exports.addQueryAndRegister = void 0;
const query_js_1 = __importDefault(require("../models/query.js"));
const User_js_1 = require("../models/User.js");
const addQueryAndRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, message } = req.body;
        console.log(firstName, lastName, email, message);
        if (!firstName || !lastName || !email || !message)
            return res.status(404).json({ msg: 'Provide all parameters. ' });
        const user = yield User_js_1.User.findOne({ email: email });
        if (!user) {
            const newUser = new User_js_1.User({
                firstName,
                lastName,
                email,
            });
            const savedUser = yield newUser.save();
            const query = new query_js_1.default({
                userId: savedUser._id,
                message,
            });
            const savedQuery = yield query.save();
            res.status(201).json(savedQuery);
        }
        else {
            const query = new query_js_1.default({
                userId: user._id,
                message,
            });
            const savedQuery = yield query.save();
            res.status(201).json(savedQuery);
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.addQueryAndRegister = addQueryAndRegister;
const addQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, message } = req.body;
        const query = new query_js_1.default({
            userId,
            message,
        });
        const savedQuery = yield query.save();
        res.status(201).json(savedQuery);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.addQuery = addQuery;
const getQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const Queries = yield query_js_1.default.find({ userId });
        res.status(200).json(Queries);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getQuery = getQuery;
