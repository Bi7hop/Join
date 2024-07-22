function loginGuest(){
    let email = document.getElementById('loginEmail');
    let pass = document.getElementById('loginPassword');

    email.value = 'guest@gmail.com';
    pass.value = 'guest'
    console.log(firebaseUsers)
}