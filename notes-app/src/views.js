import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    
    // Setup the link
    noteEl.setAttribute('href',`/edit.html#${note.id}`)
    noteEl.classList.add('list-item')
    
    // Set up status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')

    noteEl.appendChild(textEl)
    noteEl.appendChild(statusEl)

    return noteEl
}

// Render application notes
const renderNotes = () => {
    const noteDiv = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    
    const filteredNotes = notes.filter( (note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    
    noteDiv.innerHTML = ''
    
    if (filteredNotes.length > 0 ){
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            noteDiv.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        noteDiv.appendChild(emptyMessage)
    }
}

// Generate the last edited message
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`

const initializeEditPage = (noteId) => {
    const noteTitle = document.querySelector('#note-title')
    const noteBody = document.querySelector('#note-body')
    const noteLastEdited = document.querySelector('#note-last-edited')
        
    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)

    if (!note) {
        location.assign('/index.html')
    }

    noteTitle.value = note.title
    noteBody.value = note.body
    noteLastEdited.textContent = generateLastEdited(note.updatedAt)
}

export { renderNotes, generateNoteDOM, generateLastEdited, initializeEditPage }