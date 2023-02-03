import { Note } from '../models/NoteModel.js'

// create note
const create = async (req, res) => {
  try {
    const note = new Note(req.body)
    console.log(note)
    await note.save()
    res.send(note)
  } catch (error) {
    res.status(500).send(error)
  }
}

// get all notes
const index = async (req, res) => {
  try {
    const notes = await Note.find({})
    res.send(notes)

  } catch (error) {
    res.status(500).send(error)

  }
}

// get a specific note
const show = async (req, res) => {
  try {
    const id = req.params.id
    const note = await Note.findById({ _id: id })
    res.send(note)
  } catch (error) {
    res.status(500).send(error)
  }
}

// delete a note
const remove = async (req, res) => {
  try {
    const id = req.params.id
    const note = await Note.findByIdAndRemove({ _id: id })
    res.send({})
    console.log(note + 'has been deleted')
  } catch (error) {

    res.status(500).send(error)
  }
}


// edit note
const edit = async (req, res) => {
  try {
    const id = req.params.id
    const note = await Note.findById({ _id: id })
    const { title, content } = req.body

    if (title) {
      note.title = title
    }
    if (content) {
      note.content = content
    }
    note.save()
    console.log(res.status)
    res.send(note)
  } catch (error) {
    res.status(500).send(error)
  }
}

const NoteHandler = (app) => {
  app.post('/api/v1/notes', create)
  app.get('/api/v1/notes', index)
  app.get('/api/v1/note/:id', show)
  app.delete('/api/v1/note/:id', remove)
  app.put('/api/v1/note/:id', edit)
}

export default NoteHandler