import mongoose from "mongoose";
import bcrypt from "bcrypt";
import isEmail from 'validator/lib/isEmail.js';
import dotenv from 'dotenv'
dotenv.config()

const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'invalid email'],
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', function(next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          console.log(user.password)
          next();
      });
  });
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

const User = mongoose.model('User', UserSchema)

export { User }