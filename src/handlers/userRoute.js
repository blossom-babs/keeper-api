import express from 'express';
import { User } from '../models/UserModel';
const router = express.Router()

// create a new user
router.post('/api/v1/sign-up', async (req, res) => {
  const user = new User(req.body)
  console.log(user)

  try {
    await user.save()
    res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }
})