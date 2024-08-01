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

function getValue(id) {
  return document.getElementById(id).value.trim();
}

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