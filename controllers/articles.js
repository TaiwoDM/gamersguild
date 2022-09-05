import Article from '../models/Article.js';

const createArticle = async (req, res, next) => {
  try {
    // add logged in user id to the req body
    req.body.author = req.user.id;

    const article = await Article.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        article,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find();

    // JSend
    res.status(200).json({
      status: 'success',
      data: {
        articles,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export { createArticle, getAllArticles };
