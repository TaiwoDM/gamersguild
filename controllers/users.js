import User from '../models/User.js';

import reqBodyFilter from '../utils/reqBodyFilter.js';

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

const getMe = async (req, res, next) => {
  try {
    const me = await User.findById(req.user.id);

    res.status(200).json({
      status: 'success',
      data: { user: me },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

const updateMe = async (req, res, next) => {
  try {
    if (req.body.password) {
      return res.status(400).json({
        status: 'error',
        message: 'This is not the endpoint for password update.',
      });
    }

    const filteredBody = reqBodyFilter(
      req.body,
      'fullname',
      'email',
      'username',
      'socialLinks',
      'bio'
    );

    const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

export { getMe, getAllUsers, updateMe };
