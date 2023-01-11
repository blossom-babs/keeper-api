import express from 'express'
import { Note } from './models.js'
const router = express.Router()

router.post('/api/v1/notes', async (req, res) => {
  const note = new Note(req.body)
  console.log(note)

  try {
    await note.save()
    res.send(note)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/api/v1/notes', async (req, res) => {
  const notes = await Note.find({})

  try {
    res.send(notes)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router 