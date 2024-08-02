/**
 * Handles the user sign-up process.
 * 
 * @param {Event} event - The submit event from the sign-up form.
 * 
 * @description
 * This function prevents the default form submission behavior, validates the form, and checks if the passwords match. If validation passes, it shows a confirmation popup, sends the user data to the server, and then redirects to the login page.
 */
async function addNewUser(event) {
  event.preventDefault();

  let form = event.target;
  if (!form.checkValidity()) {
    form.reportValidity(); 
    return;
  }

  let extractedData = {
    username: getValue("signUpName"),
    email: getValue("signUpEmail"),
    password: getValue("signUpPassword"),
    passwordCheck: getValue("signUpPasswordCheck"),
  };

  if (extractedData.password !== extractedData.passwordCheck) {
    document.getElementById('signUpPasswordCheck').setCustomValidity("Passwords do not match.");
    document.getElementById('signUpPasswordCheck').reportValidity();
    return;
  }

  
  document.getElementById('signUpPasswordCheck').setCustomValidity("");

  await signUpConfirmation();
  await postData("/users", extractedData);
  window.location = "./login.html";
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
 * 
 * @description
 * This function adds classes to the body and displays a confirmation popup and overlay. The promise resolves after a specified delay, allowing time for the popup animation or transition.
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