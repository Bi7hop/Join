function loginGuest() {
  for (let i = 0; i < firebaseUsers.length; i++) {
    const userData = firebaseUsers[i];
    const users = userData["dataExtracted"];
    const user = Object.keys(users);
    for (let j = 0; j < user.length; j++) {
      allUsers.push({
        id: user[i],
        dataExtracted: users[user[i++]],
      });
    }
    console.log(users);
  }
}

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

function logIn() {
  let email = document.getElementById("loginEmail").value;
  let pass = document.getElementById("loginPassword").value;

  if (!email && !pass) {
    alert("fill in your data");
    return;
  } else {
    let user = allData.find((u) => u.email === email && u.password === pass);
    if (user) {
      console.log("User found", user);
      window.location = "./board.html";
    } else {
      console.log("Invalid email or password");
    }
  }
}
