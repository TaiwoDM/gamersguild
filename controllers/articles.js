import Article from '../models/Article.js';

const createArticle = async (req, res, next) => {
  try {
    // add logged in user id to the req body
    req.body.author = req.user.id;

    const article = await Article.create(req.body);

    return res.status(201).json({
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
    const articles = await Article.find({ published: { $ne: false } }).populate(
      { path: 'author', select: 'username profilePicture' }
    );

    // JSend
    return res.status(200).json({
      status: 'success',
      data: {
        articles,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id)
      .where('published')
      .ne(false)
      .populate({
        path: 'author',
        select: 'profilePicture socialLinks username fullname',
      });
    return res.status(200).json({
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

const publishArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!(req.user.id === article.author.id)) {
      return res.status(401).json({
        status: 'fail',
        message: "you don't have access to this resource",
      });
    }

    article.published = true;
    article.publishedDate = Date.now();
    await article.save();

    return res.status(200).json({
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

export { createArticle, getAllArticles, getArticle, publishArticle };
