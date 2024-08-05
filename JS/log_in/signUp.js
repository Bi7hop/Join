document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners to reset custom validity on input change
  document.getElementById('signUpPassword').addEventListener('input', resetPasswordValidity);
  document.getElementById('signUpPasswordCheck').addEventListener('input', resetPasswordValidity);
});

/**
 * Handles the user sign-up process.
 * 
 * @param {Event} event - The submit event from the sign-up form.
 */
async function addNewUser(event) {
  event.preventDefault();

  let form = event.target;
  if (!form.checkValidity()) {
    form.reportValidity(); 
    return;
  }

  let extractedData = extractFormData();
  if (!validatePasswords(extractedData.password, extractedData.passwordCheck)) {
    return;
  }

  await signUpConfirmation();
  await postData("/users", extractedData);
  window.location = "./login.html";
}

/**
 * Extracts and returns the form data.
 * 
 * @returns {Object} An object containing the extracted form data.
 */
function extractFormData() {
  return {
    username: getValue("signUpName"),
    email: getValue("signUpEmail"),
    password: getValue("signUpPassword"),
    passwordCheck: getValue("signUpPasswordCheck"),
  };
}

/**
 * Validates the passwords and sets custom validity messages if necessary.
 * 
 * @param {string} password - The password entered by the user.
 * @param {string} passwordCheck - The password confirmation entered by the user.
 * @returns {boolean} True if the passwords are valid, false otherwise.
 */
function validatePasswords(password, passwordCheck) {
  resetPasswordValidity();
  
  if (password.length < 8) {
    document.getElementById('signUpPassword').setCustomValidity("Password must be at least 8 characters long.");
    document.getElementById('signUpPassword').reportValidity();
    return false;
  }

  if (password !== passwordCheck) {
    document.getElementById('signUpPasswordCheck').setCustomValidity("Passwords do not match.");
    document.getElementById('signUpPasswordCheck').reportValidity();
    return false;
  }

  return true;
}

/**
 * Resets the custom validity messages for the password fields.
 */
function resetPasswordValidity() {
  document.getElementById('signUpPassword').setCustomValidity("");
  document.getElementById('signUpPasswordCheck').setCustomValidity("");
}

/**
 * Retrieves the value of an input field by its ID.
 * 
 * @param {string} id - The ID of the input field.
 * @returns {string} The trimmed value of the input field.
 */
function getValue(id) {
  return document.getElementById(id).value.trim();
}

/**
 * Displays a confirmation popup and overlay, then resolves the promise after a delay.
 * 
 * @returns {Promise<void>} A promise that resolves after a 900ms delay.
 */
function signUpConfirmation() {
  return new Promise((resolve) => {
    let container = document.getElementById("signUpPopup");
    let overlay = document.getElementById("overlay");
    let body = document.getElementById("body");

    body.classList.add("hide-overflow");
    container.classList.remove("hide");
    overlay.classList.remove("hide");

    setTimeout(() => {
      resolve(); // Resolve the promise after the delay
    }, 900);
  });
}
