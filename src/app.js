import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { router } from './handlers'

dotenv.config()

const port = 8000
const app = express()

app.use(cors())
app.use(express.json())
app.use(noteRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error: "))


app.listen(port, () => {
  db.once("open", function () {
    console.log("connected to the db successfully")
    console.log(`App running at http://localhost/${port}/`)
  })
})