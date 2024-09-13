class DisplayedNote {
  constructor() {
    this.content = "";

    this.noteDiv = document.createElement("div");
    this.noteDiv.className = "row align-items-center pb-3";

    this.noteTextArea = document.createElement("textarea");
    this.noteTextArea.className = "note col-8";
    this.noteTextArea.style = "height: 100px";
    this.noteTextArea.disabled = true;

    this.noteDiv.appendChild(this.noteTextArea);
  }
}

function loadNotes() {
  const time = localStorage.getItem("time");
  document.getElementById("time").innerHTML = time ? time : "- - : - - : - -";

  const fetchArray = localStorage.getItem("notes");
  const noteArray = fetchArray ? JSON.parse(fetchArray) : [];
  
  if (noteArray.length === 0) {
    document.getElementById("readOnlyNotes").innerHTML = "No notes to display.";
  } else {
    document.getElementById("readOnlyNotes").innerHTML = "";
    noteArray.forEach((note) => {
      let existedNote = new DisplayedNote();
      existedNote.noteTextArea.value = note.content;
      document.getElementById("readOnlyNotes").appendChild(existedNote.noteDiv);
    });
  }
}

loadNotes();

window.addEventListener("storage", () => {
  loadNotes();
});
