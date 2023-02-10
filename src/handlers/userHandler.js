import { User } from '../models/userModel.js';
import bcrypt from "bcrypt";

// sign up
const create = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    await user.save()
    res.send(user)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).send({ Error: 'User with this email already exists' })
    }
    else if (error.errors.email.name === "ValidatorError") {
      return res.status(500).send({ Error: "Invalid email" })
    } else {
      return res.status(500).send(error)
    }

  }
}

// user can sign in
const signin = async (req, res) => {
  try {

    const user = await User.findOne({ email: req.body.email })
    if (user === null) return res.status(201).send({ Message: "User not found" })
    else {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        return res.status(201).send(user)
      } else {
        return res.status(201).send({ Message: "Incorrect password" })
      }

    }
    console.log(user)


  } catch (error) {
    console.log(error)
  }

}


const UserHandler = (app) => {
  app.post('/api/v1/register', create)
  app.post('/api/v1/signin', signin)
}

export default UserHandler