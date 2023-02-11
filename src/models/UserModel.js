import mongoose from "mongoose";
import bcrypt from "bcrypt";
import isEmail from 'validator/lib/isEmail.js';
import dotenv from 'dotenv'
dotenv.config()

const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;
const [salt, pepper] = [Number(SALT_ROUNDS), BCRYPT_PASSWORD]

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
  if (!this.isModified('password')) return next();
  try {
    const hashedPassword = await bcrypt.genSalt(salt);
    this.password = await bcrypt.hash(this.password + pepper, hashedPassword);
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model('User', UserSchema)

User.authenticate = async function (data) {
  const user = await User.findOne({ email: data.email })
  if (user === null) {
    return ({ Message: "User not found" })
  }
  else {
    const hashedPassword = data.password + pepper
    const result = await User.validatePassword(hashedPassword, user)
    return result
  }
}

User.validatePassword = function (password, user) {
  const match = bcrypt.compare(password, user.password);
  if (match) {
    let { name, email, _id } = user
    return ({ name, email, _id })
  } else {
    return ({ Message: "Incorrect password" })
  }
};


export { User }