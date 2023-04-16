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
exports.getAllQuery = exports.deliveredQuery = exports.addQueryByAdmin = exports.getQuery = exports.addQuery = void 0;
const User_js_1 = require("../models/User.js");
const query_js_1 = require("../models/query.js");
const token_js_1 = __importDefault(require("../models/token.js"));
const nodemailer_js_1 = require("../config/nodemailer.js");
const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}
const addQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, templateId, token, message, content, driveLink, logo } = req.body;
        const savedToken = yield token_js_1.default.findOne({ token });
        if (!savedToken)
            return res.status(400).json({ msg: 'please add valid token. ' });
        const user = yield User_js_1.User.findById(userId);
        if (!user)
            return res.status(400).json({ msg: 'User does not exist. ' });
        if (user.email !== savedToken.email)
            return res.status(400).json({ msg: 'you are not owner of that token. ' });
        const allQueries = query_js_1.QUERY.find();
        allQueries.count(function (err, count) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.status(400).json({ msg: 'Sorry Try again later. ', error: err });
                }
                else {
                    const d = new Date();
                    const projectId = `${monthNames[d.getMonth()]}-${addLeadingZeros(d.getMonth() + 1, 2)}-${addLeadingZeros(count, 3)}`;
                    const query = new query_js_1.QUERY({
                        userId,
                        templateId,
                        projectId,
                        message,
                        content,
                        driveLink,
                        logo,
                    });
                    const savedQuery = yield query.save();
                    yield savedToken.remove();
                    const transport = yield (0, nodemailer_js_1.Transport)();
                    const mailOptions = {
                        from: 'bawdicsoft.dev@gmail.com',
                        to: user.email,
                        subject: 'Verification Code',
                        html: `<h1>New Query</h1>
        <h2>Dear User you add new Query,</h2>
        <p>${message}<p>`,
                    };
                    yield transport.sendMail(mailOptions);
                    res.status(201).json(savedQuery);
                }
            });
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.addQuery = addQuery;
const getQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const Queries = yield query_js_1.QUERY.find({ userId: id });
        res.status(200).json(Queries);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getQuery = getQuery;
const addQueryByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, adminId, templateId, message, content, driveLink, logo } = req.body;
        const user = yield User_js_1.User.findById(userId);
        if (!user)
            return res.status(400).json({ msg: 'User does not exist. ' });
        const allQueries = query_js_1.QUERY.find();
        allQueries.count(function (err, count) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.status(400).json({ msg: 'Sorry Try again later. ', error: err });
                }
                else {
                    const d = new Date();
                    const projectId = `${monthNames[d.getMonth()]}-${addLeadingZeros(d.getMonth() + 1, 2)}-${addLeadingZeros(count, 3)}`;
                    const query = new query_js_1.QUERY({
                        userId,
                        adminId,
                        templateId,
                        projectId,
                        message,
                        content,
                        driveLink,
                        logo,
                    });
                    const savedQuery = yield query.save();
                    const transport = yield (0, nodemailer_js_1.Transport)();
                    const mailOptions = {
                        from: 'bawdicsoft.dev@gmail.com',
                        to: user.email,
                        subject: 'Verification Code',
                        html: `<h1>New Query</h1>
        <h2>Dear User admin added new Query for you,</h2>
        <p>${message}<p>`,
                    };
                    yield transport.sendMail(mailOptions);
                    res.status(201).json(savedQuery);
                }
            });
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.addQueryByAdmin = addQueryByAdmin;
const deliveredQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const query = yield query_js_1.QUERY.findById(id);
        if (!query)
            return res.status(400).json({ msg: 'Query does not exist. ' });
        const user = yield User_js_1.User.findById(query.userId);
        if (!user)
            return res.status(400).json({ msg: 'User does not exist. ' });
        query.status = 'delivered';
        const savedQuery = yield query.save();
        const transport = yield (0, nodemailer_js_1.Transport)();
        const mailOptions = {
            from: 'bawdicsoft.dev@gmail.com',
            to: user.email,
            subject: 'Verification Code',
            html: `<h1>Query delivered</h1>
        <h2>Dear User Query was delivered,</h2>
        <p>${savedQuery.message}<p>`,
        };
        yield transport.sendMail(mailOptions);
        res.status(200).json(savedQuery);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deliveredQuery = deliveredQuery;
const getAllQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Queries = yield query_js_1.QUERY.find({});
        res.status(200).json(Queries);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getAllQuery = getAllQuery;
