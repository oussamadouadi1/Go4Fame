

//announcement bar 

document.querySelector('.close-bar').addEventListener('click',
function() {
document.querySelector('.announcement-bar').style.display = 'none';
});


// animated landing text 

const heading = document.getElementById("animated-heading");
const messages = [" ندرك أن نجاحنا الفعلي..."," لا يتحقق إلا..." , " برؤية نجاح ملموس لعملائنا"];
let index = 0;
let charIndex = 0;

function type() {
if (charIndex < messages[index].length) {
heading.textContent += messages[index].charAt(charIndex);
charIndex++;
setTimeout(type, 55); // Adjust the typing speed here
} else {
setTimeout(erase, 1000); // Adjust the delay before erasing here
}
}

function erase() {
if (charIndex > 0) {
heading.textContent = messages[index].substring(0, charIndex - 1);
charIndex--;
setTimeout(erase, 50); // Adjust the erasing speed here
} else {
index++;
if (index === messages.length) {
index = 0;
}
setTimeout(type, 500); // Adjust the delay before typing the next message here
}
}

type(); 


// Start review 

// Start review var slide = document.getElementById("slide");
var upArrow = document.getElementById ("up-arrow");
var downArrow = document.getElementById("down-arrow");

let x = 0;

function moveSlideUp() {
if(x > "-900") { 
x = x - 300;
slide.style.top = x + "px";
} else {
// Reset position to 0 when end is reached
x = 0;
slide.style.top = x + "px";
}
}

function moveSlideDown() {
if(x < 0) { 
x = x + 300;
slide.style.top = x + "px";
} 
}

upArrow.onclick = function() {
moveSlideUp();
}

downArrow.onclick = function() {
moveSlideDown();
}

// Autoplay functionality
let autoplayIntervalId = setInterval(moveSlideUp, 3000);


// Fixed Mobile Nav
let sidebarMenu = document.querySelector(".nav-desktop--vertical");
let categoryButton = document.getElementById("servicesMobile");
let isSidebarMenuOpen = false; // Flag variable to keep track of menu state

categoryButton.onclick = function(e) {
    // Stop Propagation 
    e.stopPropagation();

    // Toggle sidebarMenu 
    sidebarMenu.classList.toggle("active");
    isSidebarMenuOpen = !isSidebarMenuOpen; // Update flag variable
};

// Close sidebarMenu when clicking outside
document.addEventListener("click", function(e) {
    // Check if the clicked element is outside of the sidebar menu
    if (isSidebarMenuOpen && !sidebarMenu.contains(e.target) && e.target !== categoryButton) {
        sidebarMenu.classList.remove("active");
        isSidebarMenuOpen = false; // Update flag variable
    }
});

// Close sidebarMenu when pressing Esc key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && isSidebarMenuOpen) {
        sidebarMenu.classList.remove("active");
        isSidebarMenuOpen = false; // Update flag variable
    }
});







// Define Products 
let productsDom = document.querySelector(".products-section");
let cartProductsMenu = document.querySelector(".cart-products");
let cartProductDivDom = document.querySelector(".cart-products div");
let shoppingCartIcon = document.querySelector(".shopping-cart");
let badgeDom = document.querySelector(".s-cart-summary-count");
let sliderContainerDom = document.getElementById("sliderContainer");
let thumbnails = document.getElementsByClassName("thumbnail");
let buttonRight = document.getElementById("slide-right");
let buttonleft = document.getElementById("slide-left");
let products = productsDB;

// Open Cart Menu

shoppingCartIcon.addEventListener('click', openCartMenu)

// Display Products
let drawProductsUI;
(drawProductsUI = function (products = []) {
let productsUI = products.map((item) => {
return `
<div class="thumbnail">
<div class="product-image">
<img src="${item.ImageUrl}" 
alt=""/>
</div>
<div class="product-details">
<div class="product-name">
<a onclick='saveItemData(${item.id})'>
${item.title}
</a>
</div>
<div class="product-description">
<p>
${item.description}
</p>

</div>
<div class="product-price"> 
<span class="our-price">
${item.price}
</span>
<span class="sell-price">
${item.sellPrice}
</span>
</div>
<div class="product-action">
<button class="add-to-cart"
onclick="addToCart (${item.id})">
<img src="./images/add-to-cart.svg" alt=""/>
</button>
<i class="favourite fa-regular ${item.liked ?
'fas  fa-heart' : 'fa-heart'}"
onclick="addToFavourite(${item.id})"></i>
</div>
</div>
</div>
`;
});

// Control the Slider 

sliderContainerDom.innerHTML = productsUI.join("");
})(JSON.parse(localStorage.getItem('products')) || products );

buttonleft.addEventListener("click", () => {
sliderContainerDom.scrollLeft -= 50;
});

buttonRight.addEventListener("click", () => {
sliderContainerDom.scrollLeft += 50;
});

const maxScrollLeft = sliderContainerDom.scrollWidth - sliderContainerDom.clientWidth;
sliderContainerDom.scrollLeft = 0; // set the scroll position to the beginning

function AutoPlay() {
if (sliderContainerDom.scrollLeft > (maxScrollLeft - 1)) {
    sliderContainerDom.scrollLeft -= maxScrollLeft;
  } else {
    sliderContainerDom.scrollLeft += 1;
  }
};

let play = setInterval(AutoPlay, 50);

// for (let i = 0; i < thumbnails.length; i++) {
//   thumbnails[i].addEventListener("mouseover", () => {
//     clearInterval(play)
//   });
//   thumbnails[i].addEventListener("mouseout", () => {
//     return play = setInterval(AutoPlay, 50);
//   });
// }





// Check if there is data in the Local Storage / database

let addedItem = localStorage.getItem("productsInCart") 
? JSON.parse(localStorage.getItem("productsInCart")) 
: [];

if(addedItem) {
addedItem.map(item => {
cartProductDivDom.innerHTML += `<p> ${item.title}</p>`;
});
badgeDom.style.display="block";
badgeDom.innerHTML += addedItem.length;
}

let isDragging = false;
let startX = 0;
let scrollLeft = 0;

sliderContainerDom.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - sliderContainerDom.offsetLeft;
  scrollLeft = sliderContainerDom.scrollLeft;
});

sliderContainerDom.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - sliderContainerDom.offsetLeft;
  const walk = x - startX;
  sliderContainerDom.scrollLeft = scrollLeft - walk;
});

sliderContainerDom.addEventListener("mouseup", () => {
  isDragging = false;
});

sliderContainerDom.addEventListener("mouseleave", () => {
  isDragging = false;
});


// Add to cart
function addToCart(id) {

if(localStorage.getItem('username')) {

let product = products.find((item) => item.id === id);
let isProductInCart = addedItem.some(i => i.id === product.id);

// issue **** Here one the user refreshes the page the number of the products added to the cart disapears 
// However when we add a product to the cart the number of the previous products added to the cart comes back.
if(isProductInCart) {
addedItem = addedItem.map(p => {
if(p.id === product.id) p.quantity +=1;
return p;
})
} else {
addedItem.push(product);

}
cartProductDivDom.innerHTML = "";
addedItem.forEach(item => {
cartProductDivDom.innerHTML += `<p class="productInCartTitle"> ${item.title} <span class="productInCartQuantity">${item.quantity}</span></p>`;
})



//addedItem = [...addedItem, chosenItem];

//let uniqueProducts =  getUniqueArr(addedItem, "id");
// Save Data
localStorage.setItem(`productsInCart`, JSON.stringify(addedItem));

// Add counter of items
let cartProductItems = document.querySelectorAll('.cart-products div p');

badgeDom.style.display="block";
badgeDom.innerHTML = cartProductItems.length;
} else {
window.location = "login.html"
}


}
// Add to cart button animation

let addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
button.addEventListener('click', event => {
event.currentTarget.style.transform = 'rotate(-360deg)';
});
});



function getUniqueArr(arr, filterType) {
let unique = arr
.map((item) => item[filterType])
.map((item, i, final) => final.indexOf(item) === i && i)
.filter((item) => arr[item])
.map((item) => arr[item])
return unique;
}


function openCartMenu() {
if (cartProductDivDom.innerHTML != "") {
if (cartProductsMenu.classList.contains('open-cart')) {
cartProductsMenu.classList.remove('open-cart');
} else {
cartProductsMenu.classList.add('open-cart');
}
}
}

function toggleCartMenu() {
openCartMenu();
}

function saveItemData(id) {
localStorage.setItem('productId', id);
window.location = "productDetails.html";
}

// search function
let input = document.getElementById('search');

input.addEventListener('keyup', function(e) {
if (e.keyCode === 13) {
search(e.target.value, JSON.parse(localStorage.getItem("products")));
}

if(e.target.value.trim() === "")
drawProductsUI(JSON.parse(localStorage.getItem('products')));
});



function search(title, myArray) {
let arr = myArray.filter((item) => item.title.indexOf(title)!== -1);
drawProductsUI(arr);
}




function addToFavourite(id) {
if (localStorage.getItem('username')) {
let product = products.find((item) => item.id === id);
let favoritesItems = localStorage.getItem('productsFavourite') ? JSON.parse(localStorage.getItem('productsFavourite')) : [];

let isProductInFavorites = favoritesItems.some(i => i.id === product.id);

if (isProductInFavorites) {
favoritesItems = favoritesItems.map(p => {
if (p.id === product.id) p.liked = !p.liked;
return p;
})
} else {
product.liked = true;
favoritesItems.push(product);
}

localStorage.setItem(`productsFavourite`, JSON.stringify(favoritesItems));

let updatedProducts = products.map(item => {
if (item.id === product.id) {
item.liked = product.liked;
}
return item;
});

localStorage.setItem("products", JSON.stringify(updatedProducts));
drawProductsUI(updatedProducts);
} else {
window.location = "login.html"
}
}

function removeFromFavorite(id) {
let productsFavourite = localStorage.getItem('productsFavourite');
if (productsFavourite) {
let items = JSON.parse(productsFavourite);
let filteredItems = items.filter((item) => item.id !== id);
drawFavoriteProductsUI(filteredItems);
localStorage.setItem('productsFavourite', JSON.stringify(filteredItems));
products.forEach((product) => {
if (product.id === id) {
product.liked = false;
}
});
localStorage.setItem('products', JSON.stringify(products));
drawProductsUI(products);
}
}






// Form Validation
var nameError = document.getElementById('name-error');
var emailError = document.getElementById('email-error');
var passwordError = document.getElementById('password-error');
var submitError = document.getElementById('submit-error');

// Validation Of UserName

function vlidateName() {
var name = document.getElementById('username').value;
var nameError = document.getElementById('name-error');
if (name.length == 0) {
nameError.innerHTML = 'يرجى إدخال إسم المستخدم';
return false;
}
if (!name.match(/^[a-zA-Z\u0600-\u06FF\s]+$/u )) {
nameError.innerHTML = "إسم مستخدم غير صالح (عدم إضافة أرقام و رموز في اسم المستخدم)";
return false;
}
nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
return true;
}
// Validation Of Email

function vlidateEmail() {
var email = document.getElementById('email').value;
var emailError = document.getElementById('email-error');
if (email.length == 0) {
emailError.innerHTML = 'يرجى إدخال البريد الإكتروني  ';
return false;
}
if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,63}$/)){
emailError.innerHTML = " البريد الإلكتروني الذي أدخلته غير صالح     ";
return false;
}
emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
return true;
}

// Validation Of Password

function validatePassword() {
var password = document.getElementById('password').value;
var passwordError = document.getElementById('password-error');
if (password.length == 0) {
passwordError.innerHTML = 'يرجى إدخال  كلمة مرور  ';
return false;
}
if (!password.match(/^[a-zA-Z0-9!@#\$%\^&\*\(\)_\+\-=\[\]\{\}\\\|;:'",.<>\/?]{8,}$/)){
passwordError.innerHTML = " كلمة المرور التي أدخلتها غير صالحة     ";
return false;
}
passwordError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
return true;
}

// Toggle to Open Mobile Menu ---- Fixed Menu

function toggleMobileMenu(event) {
let dropdownMobileMenu = event.currentTarget.parentElement.querySelector('.sub-menu .sub-menu__inner');
console.log(dropdownMobileMenu)
if (dropdownMobileMenu.style.display === "none") {
dropdownMobileMenu.style.display = "block";
} else {
dropdownMobileMenu.style.display = "none";
}
}

let myDropdownMobileToggles = document.querySelectorAll('#dropdownMobileToggle');
myDropdownMobileToggles.forEach(function(dropdownMobileToggle) {
dropdownMobileToggle.addEventListener('click', toggleMobileMenu);
});


function toggleMobileMenu2(event) {
let dropdownMobileMenu2 = event.currentTarget.parentElement.querySelector('.sub-menu .sub-menu__inner');
console.log(dropdownMobileMenu2)
if (dropdownMobileMenu2.style.display === "none") {
dropdownMobileMenu2.style.display = "block";
} else {
dropdownMobileMenu2.style.display = "none";
}
}

let myDropdownMobileToggles2 = document.querySelectorAll('#dropdownMobileToggle-nd');
myDropdownMobileToggles2.forEach(function(dropdownMobileToggle2) {
  dropdownMobileToggle2.addEventListener('click', toggleMobileMenu2);
});



 // User Menu
 document.addEventListener("DOMContentLoaded", function() {
  let userMenu = document.getElementById('user-dropdown-menu');

 function toggleUserMenu() {
    userMenu.classList.toggle("open-user-menu");
}
});




document.addEventListener("DOMContentLoaded", function() {
  // Your code here
  // Get a reference to the dropdown menu element and the button that toggles it
  const dropdownMenu = document.getElementById("user-dropdown-menu");
  const dropdownButton = document.getElementById("user-dropdown-toggle");

  // Add a click event listener to the button that toggles the dropdown menu
  dropdownButton.addEventListener("click", function() {
    dropdownMenu.classList.toggle("open-user-menu");
  });

  // Add a click event listener to the document object
  document.addEventListener("click", function(event) {
    // Check if the clicked element is inside the dropdown menu or the button that toggles it
    if (!dropdownMenu.contains(event.target) && event.target !== dropdownButton) {
      // If the clicked element is not inside the dropdown menu or the button that toggles it, close the menu
      dropdownMenu.classList.remove("open-user-menu");
    }
  });
});









// Get a reference to the dropdown menu element and the button that toggles it
var cartproducts = document.getElementById("cart-products");
var cartproductsToggle = document.getElementById("cartToggle");
    
// Add a click event listener to the button that toggles the dropdown menu
cartproductsToggle.addEventListener("click", function() {
  cartproducts.classList.toggle("cart-open");
});




  // Define the function to toggle the heart icon
  function toggleHeartIcon(icon) {
    icon.classList.toggle('fa-regular'); // Toggle "fa-regular" class
    icon.classList.toggle('fa-solid'); // Toggle "fa-solid" class
  }