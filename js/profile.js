

let get_email = localStorage.getItem("email");
let get_user = localStorage.getItem("username");
let get_password = localStorage.getItem("password");

let userEmailDom = document.getElementById("email");
let userDom2 = document.getElementById("username");
let userPasswordDom2 = document.getElementById("password");

userDom2.innerHTML = get_user;
userEmailDom.innerHTML = get_email;
userPasswordDom2.innerHTML = get_password;



