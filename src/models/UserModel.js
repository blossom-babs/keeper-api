import mongoose from "mongoose";
import bcrypt from "bcrypt";
import isEmail from 'validator/lib/isEmail.js';

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

UserSchema.pre('save', async function save(next) {
  console.log('hit')
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(String(SALT_ROUNDS));
    console.log(salt, typeof salt)
    this.password = bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

const User = mongoose.model('User', UserSchema)

export { User }