function signUpConfirmation() {
    return new Promise((resolve) => {
        let container = document.getElementById('signUpPopup');
        let overlay = document.getElementById('overlay');
        let body = document.getElementById('body');
  
        body.classList.add('hide-overflow');
        container.classList.remove('hide');
        overlay.classList.remove('hide');
        
        setTimeout(() => {
            resolve();  // Resolve the promise after the delay
        }, 900);
    });
  }