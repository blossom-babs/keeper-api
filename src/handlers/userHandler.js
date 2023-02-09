import { User } from '../models/userModel.js';

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
      res.status(500).send({ Error: 'User with this email already exists' })
    }
    else if (error.errors.email.name === "ValidatorError") {
      res.status(500).send({ Error: "Invalid email" })
    } else {
      res.status(500).send(error)
    }

  }
}

// user can sign in
const signin = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}

const UserHandler = (app) => {
  app.post('/api/v1/users', create)
}

export default UserHandler