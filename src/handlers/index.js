import NoteHandler from './noteHandler.js'
import UserHandler from './userHandler.js'

const IndexHandler = (app) => {
  NoteHandler(app)
  UserHandler(app)
}

export default IndexHandler;