window.addEventListener("DOMContentLoaded", fetchNotes)

const formButton = document.querySelector("#formBtn");
let noteForm = document.querySelector("#ourForm");

formButton.addEventListener("click", ()=>{noteForm.style.display = "flex"})


function fetchNotes(){
    fetch("https://project-backend-production.up.railway.app/notePad")
        .then(response =>response.json())
        .then(iterateNoteDetails)
}


// write a function that takes in the data from our fetch
function iterateNoteDetails (notes){
    // console.log("I am, executed")
    notes.forEach(displayNoteDetail)
}

function displayNoteDetail(note){
    // console.log("I am, executed")
    const parentNotesDiv = document.querySelector("#mainNote")
   const singleNoteDiv = document.createElement("div")
   singleNoteDiv.setAttribute("id", "note")
   parentNotesDiv.appendChild(singleNoteDiv)

   const noteTitle = document.createElement("h2");
   noteTitle.innerHTML = note.title;
   singleNoteDiv.appendChild(noteTitle);

   const noteTextArea = document.createElement("p")
   noteTextArea.innerHTML = note.notes;
   singleNoteDiv.appendChild(noteTextArea)

   const buttonDIv = document.createElement("div")
   buttonDIv.setAttribute("id", "editBtn")
   singleNoteDiv.appendChild(buttonDIv)

   const deleteButtonParagraph = document.createElement("p")
   const deleteButton = document.createElement("Button")
   deleteButton.setAttribute("id", "deleteBtn")
   deleteButton.innerHTML = "Delete"
   deleteButtonParagraph.appendChild(deleteButton)
   buttonDIv.appendChild(deleteButtonParagraph);

   const editButtonParagraph = document.createElement("p")
   const editButton = document.createElement("Button");
   editButton.setAttribute("id", "editNoteButton")
   editButton.innerHTML = "Edit";
   editButtonParagraph.appendChild(editButton)
   buttonDIv.appendChild(editButtonParagraph)
   
}


 noteForm.addEventListener("submit", handleSubmitFormEvent);

 function handleSubmitFormEvent(e){
    e.preventDefault();
    console.log("hurray")
    let notesData = {
        title:document.getElementById("notepadTitle").value,
        notes:document.getElementById("noteList").value
    }

    notesToBePosted(notesData)
    // form.reset()
 }
// post the data we input in the form to our db.json file using POST Crud operations
 function notesToBePosted(notesInfo){
    fetch("https://project-backend-production.up.railway.app/notePad", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(notesInfo)
    })
    .then()
 }

// we make a patch request: this will let the user edit something in their title or text area
// add an eventListener to the edit button

const editPatchBtn = document.getElementById("editNoteButton");
// editPatchBtn.addEventListener('click', ()=>{
//     patchDetails(noteList)
// })

const deleteButtonOnDisplay = document.getElementById("")