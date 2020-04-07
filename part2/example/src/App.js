import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("")
    const [showAll, setShowAll] = useState(true)
    const [errorMsg, setErrorMsg] = useState('some error happened...')

    useEffect(() => {
        console.log('effect')
        noteService
            .getAll()
            .then(returnedData => {
                console.log('promise fulfilled')
                setNotes(returnedData)
            })
    }, [])

    const addNote = (event) => {
        event.preventDefault()
        console.log("button clicked", event.target)
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1
        }

        noteService
            .create(noteObject)
            .then(returnedData => {
                console.log(returnedData)
                setNotes(notes.concat(returnedData))
                setNewNote('')
            })
    }

    const handleNoteChange = event => setNewNote(event.target.value)

    const handleShow = () => setShowAll(!showAll)

    const toggleImportance = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedData => {
                setNotes(notes.map(note => note.id !== id ? note : returnedData))
            })
            .catch(error => {
                setErrorMsg("Note " + note.content + " was removed from the server")
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    let notesToShow = showAll ? notes : notes.filter(note => note.important)

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMsg} />
            <div>
                <button onClick={handleShow}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} toggleImportance={toggleImportance} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App
