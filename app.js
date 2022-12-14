window.addEventListener("DOMContentLoaded", fetchNotes);

const formButton = document.querySelector("#formBtn");
let noteForm = document.querySelector("#ourForm");

formButton.addEventListener("click", () => {
  noteForm.style.display = "flex";
});

function fetchNotes() {
  fetch("https://project-backend-production.up.railway.app/notePad")
    .then((response) => response.json())
    .then(iterateNoteDetails);
}

// write a function that takes in the data from our fetch
function iterateNoteDetails(notes) {
  // console.log("I am, executed")
  notes.forEach(displayNoteDetail);
}

function displayNoteDetail(note) {
  // console.log("I am, executed")
  const parentNotesDiv = document.querySelector("#mainNote");
  const singleNoteDiv = document.createElement("div");
  singleNoteDiv.innerText = "";
  singleNoteDiv.setAttribute("id", "note");
  parentNotesDiv.appendChild(singleNoteDiv);

  const noteTitle = document.createElement("h2");
  noteTitle.innerHTML = note.title;
  singleNoteDiv.appendChild(noteTitle);

  const noteTextArea = document.createElement("p");
  noteTextArea.innerHTML = note.notes;
  singleNoteDiv.appendChild(noteTextArea);

  const buttonDIv = document.createElement("div");
  buttonDIv.setAttribute("id", "editBtn");
  singleNoteDiv.appendChild(buttonDIv);

  const deleteButtonParagraph = document.createElement("p");
  const deleteButton = document.createElement("Button");
  deleteButtonParagraph.setAttribute("id", "paragraph");
  deleteButton.setAttribute("id", "deleteBtn");
  deleteButton.innerHTML = "Delete";
  deleteButtonParagraph.appendChild(deleteButton);
  buttonDIv.appendChild(deleteButtonParagraph);

  const updateButtonParagraph = document.createElement("p");
  const updateButton = document.createElement("Button");
  updateButtonParagraph.setAttribute("id", "paragraph");
  updateButton.setAttribute("id", "updateBtn");
  updateButton.innerHTML = "Update";
  updateButtonParagraph.appendChild(updateButton);
  buttonDIv.appendChild(updateButtonParagraph);

  let divId = parseInt(note.id);

  if (divId % 2 !== 1) {
    singleNoteDiv.style.background =
      "linear-gradient(90deg, rgba(239, 233, 240, 1), rgba(219, 169, 180, 1))";
  } else {
    singleNoteDiv.style.background =
      "linear-gradient(90deg, rgba(179, 204, 217, 1), rgba(189, 238, 248, 1))";
  }

  // add an addEventListener to our delete button because this is where we can access note.id
  deleteButton.addEventListener("click", () => {
    deleteNote(note);
  });

  updateButton.addEventListener("click", () => {
    updateNote(note);
  });
}

noteForm.addEventListener("submit", handleSubmitFormEvent);

function handleSubmitFormEvent(e) {
  e.preventDefault();

  let notesData = {
    title: document.getElementById("notepadTitle").value,
    notes: document.getElementById("noteList").value,
  };

  notesToBePosted(notesData);
  // form.reset()
}
// post the data we input in the form to our db.json file using POST Crud operations
function notesToBePosted(notesInfo) {
  fetch("https://project-backend-production.up.railway.app/notePad", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(notesInfo),
  })
    .then((response) => response.json())
    .then((res) => {
      document.getElementById("notepadTitle").value = "";
      document.getElementById("noteList").value = "";
      document.querySelector("#mainNote").innerHTML = "";
      fetchNotes();
    });
    fetchNotes();
    // location.reload();
}

// Delete
function deleteNote(note) {
  fetch(
    `https://project-backend-production.up.railway.app/notePad/${note.id}`,
    {
      method: "DELETE",
    }
  ).then((res) => {
    document.querySelector("#mainNote").innerHTML = "";
    fetchNotes();
  });
}

// Patching function 
function updateNote(note) {

  const updateDiv = document.querySelector("#patchForm");
  updateDiv.innerHTML = `
    <form action="" id="ourUpdateForm" >
    <label for="Id"></label>
    <input type="number" name="Id" id="notepadUpdateId" style="display:none" value="${note.id}">
    <input type="text" name="title" id="notepadUpdateTitle" placeholder="Title" value="${note.title}">
    <textarea name="list" id="noteUpdateList" cols="40" rows="1" > ${note.notes} </textarea>
    <button id="postUpdateButton">update</button>
    </form>`;

  ourUpdateForm.addEventListener("submit", handleUpdateSubmitFormEvent);

  function handleUpdateSubmitFormEvent(e) {
    e.preventDefault();

    let title = document.getElementById("notepadUpdateTitle").value;
    let id = parseInt(document.getElementById("notepadUpdateId").value);
    let notes = document.getElementById("noteUpdateList").value;

    notesToBeUpdated(title, id, notes);
    // form.reset()
  }
}

function notesToBeUpdated(title, id, notes) {
  fetch(`https://project-backend-production.up.railway.app/notePad/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ title: title, notes: notes }),
  })
    .then((response) => response.json())
    .then((res) => {
      document.getElementById("notepadUpdateTitle").value = "";
      document.getElementById("noteUpdateList").value = "";
      document.querySelector("#mainNote").innerHTML = "";
      fetchNotes();
    });
}
