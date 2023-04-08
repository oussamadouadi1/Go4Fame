

let get_email = localStorage.getItem("email");
let get_user = localStorage.getItem("username");
let get_password = localStorage.getItem("password");

// Variables

let userInput = document.getElementById("changeName");
let userEmailInput = document.getElementById("changeEmail");
let userPasswordInput = document.getElementById("changePassword");
let editForm = document.getElementById("edit-profile-form");

// Set initial values of input fields
userInput.value = get_user;
userEmailInput.value = get_email;
userPasswordInput.value = get_password;


// Events
editForm.addEventListener('submit', editProfileData);


  

  export function editProfileData(e) {
    e.preventDefault();
    localStorage.setItem('username', userInput.value);
    localStorage.setItem('email', userEmailInput.value);
    localStorage.setItem('password', userPasswordInput.value);

    setTimeout(() => {
        window.location = "profile.html";
    }, 500);
}

