//---------------------------------------\\
// ------------ Sticky Notes ------------ \\
//-----------------------------------------\\

const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

// Automatic loading of existing notes on the page.
// Grab every single note that currently exist in local storage, one note at a time.
getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content); // These properties are from the JSON that exist in local storage.
    notesContainer.insertBefore(noteElement, addNoteButton); // To insert note before the Add button.
});

// When the user clicks the button, run the addNote() function.
addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
    // Attempt to get all notes stored in local storage. Or, if it's the first time a user loads the app, default it to an empty array. JSON.parse to convert the JSON string into a native JSON array for a list of notes.
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
    // Take in JS array of notes and stringify as JSON before it saves it to the local storage key.
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note";

    // Add event listeners to trigger functions.
    element.addEventListener("change", () => {
        updateNote(id, element.value); // Hand off the process of updating note to the updateNote() function.
    });

    element.addEventListener("dblclick", () => {
        const confirmDelete = confirm("Are you sure you want to delete this sticky note?");

        if (confirmDelete) {
            deleteNote(id, element);
        }
    });

    return element;
;}

function addNote() {
    // Get all the existing notes, add new objects to the existingNotes array and resave the array.
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100),
        content: "" // Empty string.
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    // Add note element to the page before the Add button.
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject); 
    saveNotes(notes); 
}

function updateNote(id, newContent) {
    // Grab list of existing notes.
    const notes = getNotes();
    // Use filter method to add criteria to filter out the array. Look through every single note to find the one that matches the id we want to update. Index 0 to get the first element. 
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent; // Pass the new content.
    saveNotes(notes); // Resave the array.
}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id); // Get back every note except the target one.

    saveNotes(notes);
    notesContainer.removeChild(element); // Remove element from page.
}


//---------------------------------------\\
// ----- Randomize Background Color ----- \\
//-----------------------------------------\\
function generateColor() {
    const red = Math.round(Math.random() * 255); 
    const green = Math.round(Math.random() * 255); 
    const blue = Math.round(Math.random() * 255); 
    const randomColor = `rgb(${red}, ${green}, ${blue})`; 
    // Return the value back to the main program.
    return randomColor;
}

function hideFooterBg() {
    const footerColor = document.getElementById("footer").style.backgroundColor = "transparent";
    return footerColor;
}

// Main program:
document.getElementById("random-color-btn").onclick = function() {
    // Define what happens when the user clicks the button.
    document.body.style.backgroundColor = generateColor();
    document.body.style.display = hideFooterBg();
}


//---------------------------------------\\
// ------------ Display Date------------- \\
//-----------------------------------------\\
// Variables
const todayDate = document.getElementById("today-date");

const today = new Date(); // the Date() is a constructor which is used to create a Date instance; this date instance is then assigned to the variable "today".

const currentDay = today.getDay(); // getDay() is a built-in JavaScript method that returns the day of the week, 0 for Sunday, 1 for Monday... and 6 for Saturday. Index is 0-6 for Sunday to Saturday.

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// getDate() and getMonth() methods
const currentDate = today.getDate(); // getDate() is a built-in JavaScript method that returns the day of the month.

const currentMonth = today.getMonth(); // Similar to the above.

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // To make the output more user-friendly, each month is assigned a string instead of a number. An array is used to store the string values. 

const currentYear = today.getFullYear();
// Similar to the above, getFullYear() method returns the year and adding today.getFullYear will return the current year.

function displayDate() {
    todayDate.innerHTML = `${days[currentDay]}, ${months[currentMonth]} ${currentDate}, ${currentYear}`; // Dynamically updates to the current date. 
}

displayDate(); // Calls the function displayDate() defined above.


//---------------------------------------\\
// ------------ Display Time ------------ \\
//-----------------------------------------\\
const displayTime = document.querySelector(".display-time");

// Time
function showTime() {
  let time = new Date();
  displayTime.innerText = time.toLocaleTimeString("en-CA", { hour12: true });
  setTimeout(showTime, 1000); // Calls showTime every second.
}

showTime();


//----------------------------------------\\
// --- Dynamically Display Footer Year --- \\
//------------------------------------------\\
// Dynamically update year in footer.
const footerYear = document.getElementById("current-footer-year");
const currentFooterYear = today.getFullYear();

function displayFooterYear() {
    footerYear.innerHTML = currentFooterYear;
}

displayFooterYear();
