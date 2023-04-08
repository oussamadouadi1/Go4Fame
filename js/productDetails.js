let products = JSON.parse(localStorage.getItem("products"));
let productId = localStorage.getItem('productId');
let itemDom = document.querySelector('.item-details');
let productDetails = products.find((item) => item.id == productId);

 itemDom.innerHTML = `

<div class="productImage">
 <img  src="${productDetails.ImageUrl}" alt=""/>
 <div class="productPageIcons">
 <i class="fa-regular fa-heart"></i>
 <i class="fa-regular fa-share-from-square"></i>
 </div>
 </div>
 <div class="productInfo">
 <div class="productTitle">
 <h2>${productDetails.title}</h2>
 </div>
 <div class="productDescription">
 <p> ${productDetails.description}</p>
 </div>
 <div class="product-price">
 <span class="our-price">72 ر.س </span>
 <span class="sell-price">100 ر.س </span>
 </div>
 <div class="sellingCount">
 <i class="fa-solid fa-fire-flame-curved"></i>
 <span>تم شراءه</span>
 <span>10568 مرة</span>
 </div>
 <div class="infoForbuyers">
 <div class="productdesc">
 5,000 لتغريدة للوصول الى استقطاب كبير
 </div>

<div class="productAttributes">
<div class="attributeTitle">
<h3> 
البدأ:
<h3>
</div>
<span>على حسب الطلبات على الخادم ( فوري - 24 ساعة)</span>
</div>

<div class="productAttributes">
<div class="attributeTitle">
<h3>السرعة:<h3>
</div>
<span>  على حسب الطلبات على الخادم </span>
</div>

<div class="productAttributes">
<div class="attributeTitle">
<h3>
المميزات:
<h3>
</div>
<span>  ضمان و إعادة تعبئة 30 يوم</span>
</div>
<div class="warnings">
<h3>تنبيهات</h3>
<p>
لايسمح للحسابات الاباحية او المخدرات او كل شي ضار وفي حال رصد ذلك سيتم الغاء الطلب دون أي تعويض.
</p>
<p>
لايمكن الغاء الطلب بعد ارسالة.
</p>
<p>
لا تقم بإرسال طلبين لنفس الحساب من نفس نوع الخدمة، إنتظر حتى ينتهي الطلب الأول.

</p>
<p>
عمل طلب جديد يعني أنك قرأت جيداً ووافقت على جميع شروط الموقع وسياسة الإسترجاع.

</p>

</div>


</div>
</div>

 
 `;