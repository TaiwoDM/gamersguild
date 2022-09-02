import User from '../models/User.js';

const getMe = async (req, res, next) => {
  const me = await User.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    data: { user: me },
  });
};

export { getMe };
