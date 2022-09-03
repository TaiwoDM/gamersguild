import User from '../models/User.js';

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

export { getMe, getAllUsers };
