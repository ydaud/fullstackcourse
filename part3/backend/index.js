require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
var mongodb = require('mongodb');
const Note = require('./models/note')

app.use(cors())
app.use(express.json())

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes.map(note => note.toJSON()))
    })
})

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id).then(note => {
        res.json(note.toJSON())
    })
})

app.delete('/api/notes/:id', (req, res) => {
    Note.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
        .catch(err => console.log(err));

    res.status(204).send()
})


app.post('/api/notes', (req, res) => {
    const body = req.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        res.json(savedNote.toJSON())
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
