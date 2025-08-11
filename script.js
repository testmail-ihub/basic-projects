const noteContainer = document.getElementById('note-container');
const noteInput = document.getElementById('note-input');
const addNoteButton = document.getElementById('add-note-button');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes() {
    noteContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <p>${note.text}</p>
            <button class="edit-note-button" data-index="${index}">Edit</button>
            <button class="delete-note-button" data-index="${index}">Delete</button>
        `;
        noteContainer.appendChild(noteElement);
    });
}

addNoteButton.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText) {
        notes.push({ text: noteText });
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        renderNotes();
    }
});

noteContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-note-button')) {
        const index = e.target.getAttribute('data-index');
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    } else if (e.target.classList.contains('edit-note-button')) {
        const index = e.target.getAttribute('data-index');
        const currentNote = notes[index];
        const newNoteText = prompt('Edit note:', currentNote.text);
        if (newNoteText) {
            currentNote.text = newNoteText;
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
        }
    }
});

renderNotes();