//Global
const time = localStorage.getItem('time');
document.getElementById('time').innerHTML = time? time : '- - : - - : - -';

const fetchArray = localStorage.getItem('notes');
const noteArray = fetchArray? JSON.parse(fetchArray) : [];

class Note {
    static order = 0;
    constructor() {
        this.order = Note.order++;
        this.content = '';

        this.noteDiv = document.createElement('div');
        this.noteDiv.className = 'row align-items-center pb-3';

        this.noteTextArea = document.createElement('textarea');
        this.noteTextArea.className = 'note col-8';
        this.noteTextArea.style = "height: 100px"
        this.noteTextArea.placeholder = 'Write your note here...';
        this.noteTextArea.order = this.order;
        this.noteTextArea.addEventListener('input', () => {
            this.content = this.noteTextArea.value;

            // update the time
            const time = new Date();
            const formattedTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
            document.getElementById('time').innerHTML = formattedTime;

            localStorage.setItem('notes', JSON.stringify(noteArray));
            localStorage.setItem('time', formattedTime);
        });

        this.buttonDiv = document.createElement("div");
        this.buttonDiv.className = "col-2";

        this.removeButton = document.createElement('button');
        this.removeButton.className = 'rm_btn btn btn-secondary';
        this.removeButton.order = this.order;
        this.removeButton.innerHTML = 'Remove';

        // Add event listener to remove the note
        this.removeButton.addEventListener("click", () => {
            this.removeNote();
          });

        // Append the textarea and button to the noteDiv
        this.buttonDiv.appendChild(this.removeButton);
        this.noteDiv.appendChild(this.noteTextArea);
        this.noteDiv.appendChild(this.buttonDiv);
    }

    // Remove the note from the DOM
    removeNote() {
        // remove from local storage
        noteArray.splice(this.order, 1);
        localStorage.setItem('notes', JSON.stringify(noteArray));
        this.noteDiv.remove();
    }   
}

function addNote() {
    let note = new Note();
    document.getElementById('notes').appendChild(note.noteDiv);
    noteArray.push(note);
}

// Add notes from local storage
noteArray.forEach(note => {
    let existedNote = new Note();
    existedNote.noteTextArea.value = note.content;
    document.getElementById('notes').appendChild(existedNote.noteDiv);
});
