import { User } from '../models/userModel.js';

// create a new user
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
    res.status(500).send(error)
    
  }
}

const UserHandler = (app) => {
  app.post('/api/v1/users', create)
}

export default UserHandler