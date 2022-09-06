import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Provide title for article.'],
    minlength: 2,
  },

  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },

  publishedDate: {
    type: Date,
    default: Date.now(),
  },

  thumbnail: String,

  content: {
    type: String,
    required: [true, 'Provide content for article.'],
  },

  category: {
    type: String,
    required: true,
    enum: {
      values: ['Action', 'Fantasy', 'Scifi', 'Sports', 'Adventure', 'Arcade'],
      message: '{VALUE} is not a valid category.',
    },
  },

  tags: [String],

  published: {
    type: Boolean,
    default: false,
  },

  // comments

  // likes
});

// query middleware to populate author
articleSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'username',
  });
  next();
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
