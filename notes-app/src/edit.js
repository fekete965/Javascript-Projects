import { initializeEditPage, generateLastEdited } from './views'
import { updateNote, removeNote } from './notes'

const noteTitle = document.querySelector('#note-title')
const noteLastEdited = document.querySelector('#note-last-edited')
const noteBody = document.querySelector('#note-body')
const removeButton = document.querySelector('#remove-note')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

noteTitle.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    noteLastEdited.textContent = generateLastEdited(note.updatedAt)
})

noteBody.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    noteLastEdited.textContent = generateLastEdited(note.updatedAt)
})

removeButton.addEventListener('click', () => {
    removeNote(noteId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        initializeEditPage(noteId)
    }
})