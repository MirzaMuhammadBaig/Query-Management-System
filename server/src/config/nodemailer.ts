const nodemailer = require('nodemailer');
const { google } = require('googleapis');

export async function Transport() {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  const accessToken = await oAuth2Client.getAccessToken();

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
}

export function passCodeString() {
  const characters = 'VTV8952DLBQ20JTX350XYCQQWL9S0Y5AS0JTX350XYCQQWL9S0Y5AS71MS9Z565O1FILR2A';
  let token = '';
  for (let i = 0; i < 8; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }

  return token;
}

export function passWordString() {
  const characters = 'd7JL4Gz9^lERD%*zEzMRnaRkqs*MC$dFK$D%*zEzMRnaRkqs*MC$dFK$TFSLD!4BkOy58fYd';
  let token = '';
  for (let i = 0; i < 8; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }

  return token;
}

export function nameString() {
  const characters = 'Gq07964hC3Iv0ws3sXPUf8Xapj2svrY2jQWD7M4LxaEBz1CIj2svrY2jQWD7M4LxaEBz1CIha';
  let token = '';
  for (let i = 0; i < 8; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }

  return token;
}
