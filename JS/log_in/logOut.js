/**
 * Logs out the current user by clearing stored session and local data, then redirects to the login page.
 * 
 * @description
 * This function clears the `currentUser` item from both local storage and session storage, effectively logging out the user. After clearing the data, it redirects the user to the login page.
 */
function logOut(){
    localStorage.clear("currentUser");
    sessionStorage.clear("currentUser");
    window.location = "./login_ani_complete.html";
  }