import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { QUERY } from '../models/query.js';
import Token from '../models/token.js';
import { Transport } from '../config/nodemailer.js';

interface values {
  userId: string;
  templateId: string;
  message: string;
  content: string;
  driveLink: string;
  logo: string;
  status?: string;
}

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

function addLeadingZeros(num: number, totalLength: number) {
  return String(num).padStart(totalLength, '0');
}

export const addQuery = async (req: Request, res: Response) => {
  try {
    const { userId, templateId, token, message, content, driveLink, logo } = req.body;

    const savedToken: any = await Token.findOne({ token });
    if (!savedToken) return res.status(400).json({ msg: 'please add valid token. ' });

    const user: any = await User.findById(userId);
    if (!user) return res.status(400).json({ msg: 'User does not exist. ' });

    if (user.email !== savedToken.email)
      return res.status(400).json({ msg: 'you are not owner of that token. ' });

    const allQueries = QUERY.find();
    allQueries.count(async function (err, count) {
      if (err) {
        res.status(400).json({ msg: 'Sorry Try again later. ', error: err });
      } else {
        const d = new Date();
        const projectId = `${monthNames[d.getMonth()]}-${addLeadingZeros(
          d.getMonth() + 1,
          2,
        )}-${addLeadingZeros(count, 3)}`;

        const query = new QUERY({
          userId,
          templateId,
          projectId,
          message,
          content,
          driveLink,
          logo,
        });
        const savedQuery: values = await query.save();
        await savedToken.remove();

        const transport = await Transport();
        const mailOptions = {
          from: 'bawdicsoft.dev@gmail.com',
          to: user.email,
          subject: 'Verification Code',
          html: `<h1>New Query</h1>
        <h2>Dear User you add new Query,</h2>
        <p>${message}<p>`,
        };
        await transport.sendMail(mailOptions);

        res.status(201).json(savedQuery);
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Queries: values[] = await QUERY.find({ userId: id });
    res.status(200).json(Queries);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const addQueryByAdmin = async (req: Request, res: Response) => {
  try {
    const { userId, adminId, templateId, message, content, driveLink, logo } = req.body;

    const user: any = await User.findById(userId);
    if (!user) return res.status(400).json({ msg: 'User does not exist. ' });

    const allQueries = QUERY.find();
    allQueries.count(async function (err, count) {
      if (err) {
        res.status(400).json({ msg: 'Sorry Try again later. ', error: err });
      } else {
        const d = new Date();
        const projectId = `${monthNames[d.getMonth()]}-${addLeadingZeros(
          d.getMonth() + 1,
          2,
        )}-${addLeadingZeros(count, 3)}`;

        const query = new QUERY({
          userId,
          adminId,
          templateId,
          projectId,
          message,
          content,
          driveLink,
          logo,
        });
        const savedQuery: values = await query.save();

        const transport = await Transport();
        const mailOptions = {
          from: 'bawdicsoft.dev@gmail.com',
          to: user.email,
          subject: 'Verification Code',
          html: `<h1>New Query</h1>
        <h2>Dear User admin added new Query for you,</h2>
        <p>${message}<p>`,
        };
        await transport.sendMail(mailOptions);

        res.status(201).json(savedQuery);
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deliveredQuery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const query = await QUERY.findById(id);
    if (!query) return res.status(400).json({ msg: 'Query does not exist. ' });

    const user: any = await User.findById(query.userId);
    if (!user) return res.status(400).json({ msg: 'User does not exist. ' });

    query.status = 'delivered';
    const savedQuery = await query.save();

    const transport = await Transport();
    const mailOptions = {
      from: 'bawdicsoft.dev@gmail.com',
      to: user.email,
      subject: 'Verification Code',
      html: `<h1>Query delivered</h1>
        <h2>Dear User Query was delivered,</h2>
        <p>${savedQuery.message}<p>`,
    };
    await transport.sendMail(mailOptions);

    res.status(200).json(savedQuery);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllQuery = async (req: Request, res: Response) => {
  try {
    const Queries: values[] = await QUERY.find({});
    res.status(200).json(Queries);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
