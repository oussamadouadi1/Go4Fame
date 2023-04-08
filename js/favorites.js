let productsDom = document.querySelector(".products-section");
let noProductsDom = document.querySelector(".noProducts");
let products;
function  drawFavoriteProductsUI (allProducts = []) {

if(JSON.parse(localStorage.getItem('productsFavourite')). length === 0)
noProductsDom.innerHTML = " لا يوجد أي  منتجات أو خدمات في المفضلة"
products =

JSON.parse(localStorage.getItem('productsFavourite')) || allProducts;
let productsUI = products.map((item) => {
return `
<div class="thumbnail">
<div class="product-image">
<img src="${item.ImageUrl}" 
alt=""/>
</div>
<div class="product-details">
<div class="product-name">
<a href="productDetails.html" onclick='saveItemData(${item.id})'>
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
<button class="removeFromFavorite" 
onclick="removeFromFavorite (${item.id})">
<span> إزالة من المفضلة</span>
</button>
</div> 
</div>
</div>
`;
});


productsDom.innerHTML = productsUI.join("");
}

drawFavoriteProductsUI();

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

