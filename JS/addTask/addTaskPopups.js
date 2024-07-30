async function postTaskConfirmation(){
    return new Promise((resolve) => {
        let confirmation = document.getElementById("confirmation-overlay")
        confirmation.classList.remove('hide');

        setTimeout(() => {
            resolve(); // Resolve the promise after the delay
            window.location = "./board.html"
          }, 900);
    });
}