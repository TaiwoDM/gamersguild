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
    select: false,
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
// userSchema.index(
//   {
//     email: 1,
//     username: 1,
//   },
//   {
//     unique: true,
//   }
// );

// pre-save doc mddwr
userSchema.pre('save', async function (next) {
  // encrypt and save pword in db
  this.password = await bcrypt.hash(this.password, 12);

  // don't save confirmPword
  this.confirmPassword = undefined;

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
