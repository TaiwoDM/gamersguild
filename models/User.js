import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

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
    unique: true,
  },

  username: {
    type: String,
    validate: [validator.isAlphanumeric, 'Invalid characters in username.'],
    required: [true, 'Provide username.'],
    unique: true,
  },

  profilePicture: {
    type: String,
    default: '',
  },

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
    select: false,
  },
});

// pre-save doc mddwr
userSchema.pre('save', async function (next) {
  // encrypt and save pword in db
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// passowrdcorrect? instance method
userSchema.methods.passwordCorrect = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

export default User;
