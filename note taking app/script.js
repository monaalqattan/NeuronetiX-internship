document.addEventListener('DOMContentLoaded', () => {
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesList = document.getElementById('notes-list');
    const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    renderNotes();

    function renderNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p class="note-tag">${note.tag ? `#${note.tag}` : ''}</p>
                <p>${note.content}</p>
                <button onclick="editNote(${index})">Edit</button>
                <button onclick="deleteNote(${index})">Delete</button>
            `;
            notesList.appendChild(noteElement);
        });
    }

    addNoteBtn.addEventListener('click', () => {
        const title = document.getElementById('note-title').value;
        const tag = document.getElementById('note-tag').value;
        const content = document.getElementById('note-content').value;

        if (title && content) {
            notes.push({ title, tag, content });
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
            clearInputs();
        }
    });

    window.deleteNote = function (index) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    };

    window.editNote = function (index) {
        const note = notes[index];
        document.getElementById('note-title').value = note.title;
        document.getElementById('note-tag').value = note.tag;
        document.getElementById('note-content').value = note.content;
        deleteNote(index);
    };

    toggleDarkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    function clearInputs() {
        document.getElementById('note-title').value = '';
        document.getElementById('note-tag').value = '';
        document.getElementById('note-content').value = '';
    }
});
