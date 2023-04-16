'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.sendConfirmationEmail = void 0;
const nodemailer_1 = __importDefault(require('nodemailer'));
const transport = nodemailer_1.default.createTransport({
  service: 'Gmail',
  auth: {
    user: 'bawdicsoft.dev@gmail.com',
    pass: 'EyY^5m79RoNr',
  },
});
const sendConfirmationEmail = (name, email, confirmationCode) => {
  try {
    transport.sendMail({
      from: 'bawdicsoft.dev@gmail.com',
      to: email,
      subject: 'Please confirm your account',
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=https://query-management-system.vercel.app/confirm/${confirmationCode}> Click here</a>
        </div>`,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.sendConfirmationEmail = sendConfirmationEmail;
