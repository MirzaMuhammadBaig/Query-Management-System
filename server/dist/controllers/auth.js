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
exports.getAllUsers = exports.AddAdmin = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const token_1 = __importDefault(require("../models/token"));
const nodemailer_1 = require("../config/nodemailer");
/* REGISTER USER */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, token, email, password } = req.body;
        const savedToken = yield token_1.default.findOne({ token });
        if (!savedToken)
            return res.status(400).json({ error: 'please add valid token. ' });
        if (savedToken.email !== email)
            return res.status(400).json({ error: 'you are not owner of that token. ' });
        const salt = yield bcrypt_1.default.genSalt();
        const passwordHash = yield bcrypt_1.default.hash(password, salt);
        const newUser = new User_1.User({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });
        const savedUser = yield newUser.save();
        const jToken = jsonwebtoken_1.default.sign({ id: savedUser._id }, String(process.env.JWT_SECRET));
        res.status(201).json({
            token: jToken,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                _id: savedUser._id,
            },
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.register = register;
/* LOGGING IN */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.User.findOne({ email });
        if (!user)
            return res.status(400).json({ error: 'User does not exist. ' });
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ error: 'Invalid credentials. ' });
        const jToken = jsonwebtoken_1.default.sign({ id: user._id }, String(process.env.JWT_SECRET));
        res.status(200).json({
            token: jToken,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                _id: user._id,
            },
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.login = login;
/* Add Admin */
const AddAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, email } = req.body;
        const password = (0, nodemailer_1.passWordString)();
        const salt = yield bcrypt_1.default.genSalt();
        const passwordHash = yield bcrypt_1.default.hash(password, salt);
        const newUser = new User_1.User({
            firstName: 'unknown',
            lastName: 'unknown',
            email,
            password: passwordHash,
            roll: 'admin',
        });
        const savedUser = yield newUser.save();
        const transport = yield (0, nodemailer_1.Transport)();
        const mailOptions = {
            from: 'bawdicsoft.dev@gmail.com',
            to: email,
            subject: 'admin password information',
            html: `<h1>User Token</h1>
        <h2>Dear User,</h2>
        <p>Your password is: ${password}</p>`,
        };
        yield transport.sendMail(mailOptions);
        res.status(201).json({
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
            _id: savedUser._id,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.AddAdmin = AddAdmin;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find({});
        const allUsers = users.map((user) => {
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roll: user.roll,
            };
        });
        res.status(201).json(allUsers);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getAllUsers = getAllUsers;
