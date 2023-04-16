import { Request, Response } from 'express';
import { Transport, passCodeString } from '../config/nodemailer';
import Token from '../models/token';
import { User } from '../models/User';

export const addToken = async (req: Request, res: Response) => {
  try {
    const { userId, email } = req.body;

    const user: any = await User.findById(userId);
    if (!user) return res.status(400).json({ msg: 'User does not exist. ' });
    if (user.roll === 'user') return res.status(400).json({ msg: 'You are not admin. ' });

    const token = passCodeString();
    const newToken = new Token({
      userId,
      email,
      token,
    });
    const savedUser = await newToken.save();

    const transport = await Transport();
    const mailOptions = {
      from: 'bawdicsoft.dev@gmail.com',
      to: email,
      subject: 'User Token',
      html: `<h1>User Token</h1>
        <h2>Dear User,</h2>
        <p>Your token code is: ${token}</p>`,
    };
    await transport.sendMail(mailOptions);

    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(500).json({ error });
  }
};

export const getToken = async (req: Request, res: Response) => {
  try {
    const Queries = await Token.find({});
    res.status(200).json(Queries);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
