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
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameString = exports.passWordString = exports.passCodeString = exports.Transport = void 0;
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
function Transport() {
    return __awaiter(this, void 0, void 0, function* () {
        const CLIENT_ID = process.env.CLIENT_ID;
        const CLIENT_SECRET = process.env.CLIENT_SECRET;
        const REDIRECT_URI = process.env.REDIRECT_URI;
        const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
        const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
        oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
        const accessToken = yield oAuth2Client.getAccessToken();
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'bawdicsoft.dev@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
    });
}
exports.Transport = Transport;
function passCodeString() {
    const characters = 'VTV8952DLBQ20JTX350XYCQQWL9S0Y5AS0JTX350XYCQQWL9S0Y5AS71MS9Z565O1FILR2A';
    let token = '';
    for (let i = 0; i < 8; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }
    return token;
}
exports.passCodeString = passCodeString;
function passWordString() {
    const characters = 'd7JL4Gz9^lERD%*zEzMRnaRkqs*MC$dFK$D%*zEzMRnaRkqs*MC$dFK$TFSLD!4BkOy58fYd';
    let token = '';
    for (let i = 0; i < 8; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }
    return token;
}
exports.passWordString = passWordString;
function nameString() {
    const characters = 'Gq07964hC3Iv0ws3sXPUf8Xapj2svrY2jQWD7M4LxaEBz1CIj2svrY2jQWD7M4LxaEBz1CIha';
    let token = '';
    for (let i = 0; i < 8; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }
    return token;
}
exports.nameString = nameString;
