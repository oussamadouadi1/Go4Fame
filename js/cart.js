let productsDom = document.querySelector(".products-section");
let noProductsDom = document.querySelector(".noProducts");

function  drawCartProductsUI (allProducts = []) {
    
   if(JSON.parse(localStorage.getItem('productsInCart')). length === 0)
   noProductsDom.innerHTML = " !لا يوجد أي  منتجات أو خدمات في السلة"
   let products = JSON.parse(localStorage.getItem('productsInCart')) || allProducts;
    let productsUI = products.map((item) => {
      return `
      
      <table class="product-details"> 
      <tr class="productIncart-info">
      <td>المنتج</td>
      <td>السعر</td>
      <td>الكمية</td>
      <td>المجموع</td>
      <td>إزالة</td>
      </tr>
  
                <tr class="productIncart-value">
                <td class="productinCartImage-name">
                <div class="productinCartImage">
                <img src="${item.ImageUrl}" alt=""/>
                </div>
                <div class="productInCartName">
                <h3>
                ${item.title}
                </h3>
                </div>
                </td>
                <td class="productPrice">
                ${item.price}
                </td>
                <td class="productQnt">
                ${item.quantity}
                </td>
                <td class=totalPrice>
                </td>
                <td class="removeProduct">
                <button class="removeFromCart"
                onclick="removeItemFromCart(${item.id})">
                <i class="fa-solid fa-xmark"></i>
                </button>
                </td>
                </tr>
                </table>
                
    <div class="productInCart-container">
  <div>
        <div class="linksRelatedToProduct">
        <form action="">
        <div class="field">
        <label id="inputInCart"> رابط التغريدة </label>
        <input type="url" id="inputInCart"/>

        </div>
        <div class="field">
        <label id="inputInCart">عدد الريتويت الحالي للتغريدة </label>
        <input type="url" id="inputInCart"/>
        </div>
        </form>
        </div>

      `;
    });
  
    productsDom.innerHTML = productsUI.join("");
   }

drawCartProductsUI()

function removeItemFromCart (id) {
    let productsInCart = localStorage.getItem('productsInCart');
if(productsInCart) {
    let items = JSON.parse(productsInCart);
    let filteredItems =  items.filter((item) => item.id !== id);
     drawCartProductsUI(filteredItems); 
    localStorage.setItem('productsInCart', JSON.stringify(filteredItems));
    drawCartProductsUI(filteredItems);
}
}



