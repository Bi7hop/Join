function logOut(){
    localStorage.clear("currentUser");
    sessionStorage.clear("currentUser");
    window.location = "./login.html"
  }