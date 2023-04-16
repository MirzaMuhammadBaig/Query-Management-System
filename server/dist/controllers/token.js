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
exports.getToken = exports.addToken = void 0;
const nodemailer_1 = require("../config/nodemailer");
const token_1 = __importDefault(require("../models/token"));
const User_1 = require("../models/User");
const addToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, email } = req.body;
        const user = yield User_1.User.findById(userId);
        if (!user)
            return res.status(400).json({ msg: 'User does not exist. ' });
        if (user.roll === 'user')
            return res.status(400).json({ msg: 'You are not admin. ' });
        const token = (0, nodemailer_1.passCodeString)();
        const newToken = new token_1.default({
            userId,
            email,
            token,
        });
        const savedUser = yield newToken.save();
        const transport = yield (0, nodemailer_1.Transport)();
        const mailOptions = {
            from: 'bawdicsoft.dev@gmail.com',
            to: email,
            subject: 'User Token',
            html: `<h1>User Token</h1>
        <h2>Dear User,</h2>
        <p>Your token code is: ${token}</p>`,
        };
        yield transport.sendMail(mailOptions);
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.addToken = addToken;
const getToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Queries = yield token_1.default.find({});
        res.status(200).json(Queries);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getToken = getToken;
