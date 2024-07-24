async function addNewUser(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  let extractedData = {
    username: getValue("signUpName"),
    email: getValue("signUpEmail"),
    password: getValue("signUpPassword"),
    passwordCheck: getValue("signUpPasswordCheck"),
  };

  for (let key in extractedData) {
    if (!extractedData[key]) {
      alert(`${key} cannot be empty.`);
      return;
    }
  }

  const passwordsMatch = await passwordConfiramation();
  if (!passwordsMatch) {
    alert("Passwords do not match. User data will not be posted.");
    return;
  } else {
    await signUpConfirmation(); // Wait for the confirmation animation to complete
    await postData("/users", extractedData);
    window.location = "./login.html";
  }
}

async function passwordConfiramation() {
  let password = getValue("signUpPassword");
  let confirmation = getValue("signUpPasswordCheck");
  if (password !== confirmation) {
    return false;
  }
  return true;
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
