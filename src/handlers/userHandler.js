import { User } from '../models/userModel.js';

// create a new user
const create = async (req, res) => {
  try {
    const user = new User(req.body)
    console.log(user)
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