import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Provide fullname.'],
  },

  email: {
    type: String,
    required: [true, 'Provide email.'],
    lowercase: true,
    validate: [validator.isEmail, 'Provide valid email.'],
  },

  username: {
    type: String,
    validate: [validator.isAlphanumeric, 'Invalid characters in username.'],
    required: [true, 'Provide username.'],
  },

  profilePicture: String,

  bio: String,

  // articles

  socialLinks: {
    type: [String],
    // validate: [validator.isURL, 'Provide valid links.'],/
  },

  // bookmarks

  password: {
    type: String,
    required: [true, 'Provide password.'],
    minLength: 8,
  },

  confirmPassword: {
    type: String,
    required: [true, 'Please Confirm password.'],
    validate: {
      validator: function (cPassword) {
        return cPassword === this.password;
      },
      message: 'Provided passwords are not the same.',
    },
  },
});

// compound unique indexing
userSchema.index(
  {
    email: 1,
    username: 1,
  },
  {
    unique: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
