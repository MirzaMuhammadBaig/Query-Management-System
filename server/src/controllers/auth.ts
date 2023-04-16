import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Request, Response } from 'express';
import Token from '../models/token';
import { Transport, passCodeString, passWordString } from '../config/nodemailer';

/* REGISTER USER */
export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, token, email, password } = req.body;

    const savedToken: any = await Token.findOne({ token });
    if (!savedToken) return res.status(400).json({ error: 'please add valid token. ' });
    if (savedToken.email !== email)
      return res.status(400).json({ error: 'you are not owner of that token. ' });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();

    const jToken = jwt.sign({ id: savedUser._id }, String(process.env.JWT_SECRET));

    res.status(201).json({
      token: jToken,
      user: {
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        _id: savedUser._id,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: any = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User does not exist. ' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials. ' });

    const jToken = jwt.sign({ id: user._id }, String(process.env.JWT_SECRET));

    res.status(200).json({
      token: jToken,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* Add Admin */
export const AddAdmin = async (req: Request, res: Response) => {
  try {
    const { userId, email } = req.body;

    const password = passWordString();
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName: 'unknown',
      lastName: 'unknown',
      email,
      password: passwordHash,
      roll: 'admin',
    });
    const savedUser = await newUser.save();

    const transport = await Transport();
    const mailOptions = {
      from: 'bawdicsoft.dev@gmail.com',
      to: email,
      subject: 'admin password information',
      html: `<h1>User Token</h1>
        <h2>Dear User,</h2>
        <p>Your password is: ${password}</p>`,
    };
    await transport.sendMail(mailOptions);

    res.status(201).json({
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      _id: savedUser._id,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: any[] = await User.find({});
    res.status(201).json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
