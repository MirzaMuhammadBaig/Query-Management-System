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
exports.getTasks = exports.createTask = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const Task_js_1 = __importDefault(require("../models/Task.js"));
/* REGISTER USER */
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, channelId, message, time, timeZone } = req.body;
        if (!node_cron_1.default.validate(time))
            return res.status(400).json({ msg: 'time is not correct. ', time: new Date() });
        // const user = await Channel.findById(userId)
        // if (!user) return res.status(400).json({ msg: "User does not exist. " })
        const newTask = new Task_js_1.default({
            userId,
            channelId,
            message,
            time,
            timeZone,
        });
        const savedUser = yield newTask.save();
        res.status(201).json(savedUser);
        node_cron_1.default.schedule(newTask.time, () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // const response = await axios.post(
                //   `https://graph.facebook.com/v15.0/${newTask.chanelId}/feed?message=${newTask.message}&access_token=${channelAccessToken}`
                // )
                // console.log(response.data)
                console.log(newTask.message);
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const tasks = yield Task_js_1.default.find({ userId });
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getTasks = getTasks;
