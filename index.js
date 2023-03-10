const express = require('express')
const app = express()

// Parses incoming requests with JSON payloads
app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
]

// Routes
// Root Resource
app.get('/', (request, response) => {
  response.send('<h1>Hello From Express Web Server!</h1>')
})

// Post Note Resource
app.post('api/notes', (request, response) => {
  const note = request.body
  console.log(note)
  response.json(note)
})

// Get All Notes Resources
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

// Fetching a single Note Resourse
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => {
    return note.id === id
  })

  if (note) {
    response.json(note)
  } else {
    response.status(400).end()
  }
})

// Deleting Resources
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})