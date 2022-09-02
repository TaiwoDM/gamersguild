import User from '../models/User.js';

import { promisify } from 'util';
import jwt from 'jsonwebtoken';

// register user
const signup = async (req, res, next) => {
  try {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const user = await User.create({
      fullname,
      email,
      username,
      password,
      confirmPassword,
    });

    // sign jwt
    const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      err: err.message,
    });
  }
};

// secure routes (actions)
const secure = async (req, res, next) => {
  try {
    let token;

    // check if token is available in header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({
        status: 'failed',
        message: 'You are not logged in, please login to perform this action.',
      });
    }

    // verify token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_PRIVATE_KEY
    );

    // check if token user still exists
    const tokenUser = await User.findById(decoded.id);

    if (!tokenUser) {
      res.status(401).json({
        status: 'failed',
        message: 'the user of this token does not exist',
      });
    }

    // grant access
    req.user = tokenUser;
    next();
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

export { signup, secure };
