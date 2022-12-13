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
   singleNoteDiv.innerText= ""
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
   deleteButtonParagraph.setAttribute("id", "paragraph")
   deleteButton.setAttribute("id", "deleteBtn")
   deleteButton.innerHTML = "Delete"
   deleteButtonParagraph.appendChild(deleteButton)
   buttonDIv.appendChild(deleteButtonParagraph);

   let divId = parseInt(note.id)
   
   if(divId%2 !== 1){
    singleNoteDiv.style.background = "linear-gradient(90deg, rgba(239, 233, 240, 1), rgba(219, 169, 180, 1))"
   }else {
    singleNoteDiv.style.background = "linear-gradient(90deg, rgba(179, 204, 217, 1), rgba(189, 238, 248, 1))"
   }



   // add an addEventListener to our delete button because this is where we can access note.id
   deleteButton.addEventListener("click", ()=>{
    
        deleteNote(note)
   })
}

   


 noteForm.addEventListener("submit", handleSubmitFormEvent);

 function handleSubmitFormEvent(e){
    e.preventDefault();
    
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
    fetchNotes();
 }

 // Delete 
    function deleteNote(note){        
        fetch(`https://project-backend-production.up.railway.app/notePad/${note.id}`,{
            method: "DELETE"            
        })        
    }


