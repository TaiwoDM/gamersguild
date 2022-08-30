import User from '../models/User.js';

import jwt from 'jsonwebtoken';

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
    res.status(200).json({
      status: 'fail',
      err: err.message,
    });
  }
};

export { signup };
