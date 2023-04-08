// Register User
let username2 = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let registerBtn = document.querySelector("#sign_up");

registerBtn.addEventListener("click", register);

function register(e) {
    e.preventDefault();
    if (username2.value === "" || email.value === "" || password.value === "") {
        alert("من فضلك قم بملئ البيانات");
    } else {
        localStorage.setItem("username", username2.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);
        setTimeout(() => {
            window.location ="login.html";
             
        }, 1500);
    }
    

}
