// Add JavaScript code for your web site here and call it from index.html.
// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button");

// Step 2: Write the callback function
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};

// Step 3: Register a 'click' event listener for the theme button
themeButton.addEventListener("click", toggleDarkMode);

// Step 1: Query for the submit RSVP button
const rsvpButton = document.getElementById("rsvp-button");

// Count starts at 3 for the default guests
let count = 3;

// Step 2: Create the function that adds new RSVP participants
function addParticipant(event) {
  event.preventDefault();

  // Get input values
  const name = document.getElementById("rsvp-name").value.trim();
  const state = document.getElementById("rsvp-state").value.trim();

  if (!name || !state) return; // skip if any field is empty

  // Create new <p> element
  const newGuest = document.createElement("p");
  newGuest.textContent = `🎟️ ${name} from ${state} has RSVP'd.`;

  // Add to participants list
  const participantsDiv = document.querySelector(".rsvp-participants");
  participantsDiv.appendChild(newGuest);

  // Remove old counter
  const oldCounter = document.getElementById("rsvp-count");
  if (oldCounter) oldCounter.remove();

  // Update counter
  count += 1;
  const newCounter = document.createElement("p");
  newCounter.id = "rsvp-count";
  newCounter.textContent = `⭐ ${count} people have RSVP'd to this event!`;
  participantsDiv.prepend(newCounter);

  // Clear form
  document.getElementById("rsvp-form").reset();
}

// Step 3: Add event listener to validate form before adding
rsvpButton.addEventListener("click", validateForm);

// Step 4: Validate the RSVP form before adding participant
function validateForm(event) {
  event.preventDefault();
  let containsErrors = false;
  var rsvpInputs = document.getElementById("rsvp-form").elements;

  for (let i = 0; i < rsvpInputs.length; i++) {
    if (rsvpInputs[i].value.trim().length < 2) {
      rsvpInputs[i].classList.add("error");
      containsErrors = true;
    } else {
      rsvpInputs[i].classList.remove("error");
    }
  }

  // Stretch: Check for valid email
  const emailInput = document.getElementById("rsvp-email");
  if (!emailInput.value.includes("@")) {
    emailInput.classList.add("error");
    containsErrors = true;
  } else {
    emailInput.classList.remove("error");
  }

  if (!containsErrors) {
    addParticipant(event);
    for (let i = 0; i < rsvpInputs.length; i++) {
      rsvpInputs[i].value = "";
    }
  }
}
