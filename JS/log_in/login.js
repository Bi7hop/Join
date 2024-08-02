/**
 * Asynchronously fetches user data from the server and populates `allData` with the fetched data.
 * 
 * This function performs the following steps:
 * 1. Sends a GET request to the specified URL to retrieve user data in JSON format.
 * 2. Converts the response into a JavaScript object.
 * 3. Maps the object into an array where each element contains the user's ID and associated data.
 * 4. Handles any errors that occur during the fetch operation.
 * 
 * @async
 * @function
 * 
 * @throws {Error} Throws an error if the fetch operation fails or if the response cannot be converted to JSON.
 * 
 * @description
 * The `loadData` function uses the Fetch API to retrieve data from a backend service. It constructs the URL using `BASE_URL` and appends `"users.json"`. Upon successful retrieval, it transforms the data into a format where each user's ID is included as a property. This array is assigned to the global `allData` variable.
 * 
 * If an error occurs during the fetch process, it is caught and logged to the console.
 */
async function loadData() {
  try {
    let response = await fetch(BASE_URL + "users" + ".json");
    let responseToJson = await response.json();

    if (responseToJson) {
      allData = Object.keys(responseToJson).map((key) => ({
        id: key,
        ...responseToJson[key],
      }));
    }
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

/**
 * Handles user login by validating credentials and redirecting to the summary page.
 * 
 * @param {Event} event - The event object from the form submission, used to prevent the default form behavior.
 * 
 * @description
 * This function prevents the default form submission, retrieves the email and password input values, and checks them against the `allData` array to find a matching user. If the credentials are valid, it stores the username in session storage, optionally saves credentials in local storage based on the "Remember Me" checkbox, and redirects the user to the summary page. If the credentials are invalid, it triggers an error display function.
 */
function logIn(event) {
  event.preventDefault();

  let email = document.getElementById("loginEmail").value;
  let pass = document.getElementById("loginPassword").value;

  let user = allData.find((u) => u.email === email && u.password === pass);

  if (user) {
    let username = user.username;
    let mail = user.email;
    let password = user.password;
    sessionStorage.setItem("currentUser", username);
    rememberMe(mail, password, username);
    window.location = "./summary.html";
  } else {
    falsePassword();
  }
}

/**
 * Saves user credentials in local storage if the "Remember Me" checkbox is checked.
 * 
 * @param {string} mail - The user's email address.
 * @param {string} password - The user's password.
 * @param {string} username - The user's username.
 * 
 * @description
 * This function checks if the "Remember Me" checkbox is selected. If so, it stores the email, password, and username in local storage for future use.
 */
function rememberMe(mail, password, username){
  let checkbox = document.getElementById("rememberMe");
  if (checkbox.checked) {
    localStorage.setItem("email", mail);
    localStorage.setItem("password", password);
    localStorage.setItem("currentUser", username)
  }
}

/**
 * Checks local storage for stored user credentials and logs in the user if found.
 * 
 * @description
 * This function retrieves stored email, password, and username from local storage. If these values exist, it sets the username in session storage and redirects the user to the summary page.
 */
function rememberUser() {
  let storedEmail = localStorage.getItem("email");
  let storedPassword = localStorage.getItem("password");
  let storedUser = localStorage.getItem("currentUser");
  if (storedEmail && storedPassword) {
    sessionStorage.setItem("currentUser", storedUser)
    window.location = "./summary.html";
  }
}

/**
 * Displays an error message and highlights the password input field if login fails.
 * 
 * @description
 * This function shows an error container and changes the border color of the password input field to red to indicate a failed login attempt.
 */
function falsePassword(){
  let passConainer = document.getElementById("error-container");
  let passInput = document.getElementById("input-field-password");
  passConainer.classList.remove('hide');
  passInput.style.borderColor = 'red';
}

/**
 * Toggles the visibility of the password input field by swapping the lock icon.
 * 
 * @description
 * This function changes the source of the lock icon based on its current state. If the icon indicates that the password is hidden, it changes to an icon that suggests the password is visible.
 */
function locketIconSwap() {
  let passImg = document.getElementById("passImg");
  if (passImg.src.endsWith("lock.png")) {
    passImg.src = "./img/pass_visibility_off.png";
  } else {
    return false;
  }
}

/**
 * Toggles password visibility and updates the icon accordingly.
 * 
 * @description
 * This function switches the type of the password input field between "password" and "text" to show or hide the password. It also updates the visibility icon.
 */
function changePassVisibility(){
  passImgSwap();
  showPassword(); 
}

/**
 * Shows or hides the password in the password input field.
 * 
 * @description
 * This function changes the type of the password input field to either "text" (to show the password) or "password" (to hide the password).
 */
function showPassword(){
  let passField = document.getElementById("loginPassword");
  if (passField.type === "password") {
    passField.type = "text";
  } else {
    passField.type = "password";
  }
}

/**
 * Updates the password visibility icon based on the current state.
 * 
 * @description
 * This function changes the source of the password visibility icon between "pass_visibility_on.png" and "pass_visibility_off.png" to reflect whether the password is currently visible or hidden.
 */
function passImgSwap(){
  let passImg = document.getElementById("passImg");
  if (passImg.src.endsWith("pass_visibility_off.png")) {
    passImg.src = "./img/pass_visibility_on.png";
  } else {
    passImg.src = "./img/pass_visibility_off.png";
  }
}

/**
 * Logs in as a guest and redirects to the summary page.
 * 
 * @description
 * This function sets the username to "Guest" in session storage and redirects the user to the summary page.
 */
function loginGuest(){
  sessionStorage.setItem("currentUser", 'Guest');
  window.location = "./summary.html"
}