


// hide join button and show user name **** BELONGS TO HEADER ****
let userInfo = document.querySelector("#user-info");
let userDom = document.querySelector("#user");
let join = document.querySelector("#join");
let logoutBtn = document.querySelector("#logout");
let username = localStorage.getItem("username");

if (username) {
  join.remove();
  userInfo.style.display = "flex";
  userDom.innerHTML = username;
}

logoutBtn.addEventListener('click', function() {
  localStorage.clear();
  setTimeout(() => {
    window.location = "register.html";
  }, 1500)
});


 function usernameDom() {
  let username = localStorage.getItem("username");
  let userDom2 = document.getElementById("username");
  if (username) {
    userDom2.innerHTML = username;
  }
}

