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

function rememberMe(mail, password, username){
  let checkbox = document.getElementById("rememberMe");
  if (checkbox.checked) {
    localStorage.setItem("email", mail);
    localStorage.setItem("password", password);
    localStorage.setItem("currentUser", username)
  }
}

function rememberUser() {
  let storedEmail = localStorage.getItem("email");
  let storedPassword = localStorage.getItem("password");
  let storedUser = localStorage.getItem("currentUser");
  if (storedEmail && storedPassword) {
    sessionStorage.setItem("currentUser", storedUser)
    window.location = "./summary.html";
  }
}

function falsePassword(){
  let passConainer = document.getElementById("error-container");
  let passInput = document.getElementById("input-field-password");
  passConainer.classList.remove('hide');
  passInput.style.borderColor = 'red';
}

function locketIconSwap() {
  let passImg = document.getElementById("passImg");
  if (passImg.src.endsWith("lock.png")) {
    passImg.src = "./img/pass_visibility_off.png";
  } else {
    return false;
  }
}

function changePassVisibility(){
  passImgSwap();
  showPassword(); 
}

function showPassword(){
  let passField = document.getElementById("loginPassword");
  if (passField.type === "password") {
    passField.type = "text";
  } else {
    passField.type = "password";
  }
}

function passImgSwap(){
  let passImg = document.getElementById("passImg");
  if (passImg.src.endsWith("pass_visibility_off.png")) {
    passImg.src = "./img/pass_visibility_on.png";
  } else {
    passImg.src = "./img/pass_visibility_off.png";
  }
}

function loginGuest(){
  sessionStorage.setItem("currentUser", 'Guest');
  window.location = "./summary.html"
}