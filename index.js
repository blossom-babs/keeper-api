import express from 'express'
import cors from 'cors'

const app = express()
const port = 8000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/users', (req, res) => {
  console.log(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})