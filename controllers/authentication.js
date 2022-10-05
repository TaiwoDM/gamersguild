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

    // send token as jwt
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
      ),
    });

    // hide password from response
    user.password = undefined;

    return res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(500).json({
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
      return res.status(401).json({
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
      return res.status(401).json({
        status: 'failed',
        message: 'the user of this token does not exist',
      });
    }

    // grant access
    req.user = tokenUser;
    next();
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: 'failed',
        message: 'input both username and password',
      });
    }

    const user = await User.findOne({ username }).select('+password');

    if (!user || !(await user.passwordCorrect(password, user.password))) {
      return res.status(401).json({
        status: 'failed',
        message: 'Incorrect username or password',
      });
    }

    // sign jwt
    const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // send token as jwt -- not httpsOnly yet
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
      ),
    });

    // hide password
    user.password = undefined;

    return res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'currentPassword or newPassword cannot be empty',
      });
    }

    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.passwordCorrect(currentPassword, user.password))) {
      return res.status(400).json({
        status: 'fail',
        message: 'incorrect current password',
      });
    }
    console.log('1');
    user.password = newPassword;
    await user.save();
    console.log('1');

    // sign and send token
    const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
      ),
    });

    user.password = undefined;

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};
export { signup, secure, login, updatePassword };
