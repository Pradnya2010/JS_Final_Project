window.addEventListener("load" , () => {
    calculateTotalPriceCart();
    UpdateCard()
    getTotalQty()
    showSideBar();
})


 
function showSideBar(){
  var sideBar = document.querySelector(".sideBar");
  var toggle  = document.querySelector(".list_toggle");
  toggle.addEventListener("click" , function(){
    sideBar.classList.toggle("active_sideBar")
  })
}





    var storedData =  JSON.parse(sessionStorage.getItem("myList", "[]"));
    

    function getTotalQty(){
      var cartCount = document.querySelector(".cart_count")
      var qty = 0
      if ("totalQty" in sessionStorage) {
     qty = JSON.parse(sessionStorage.getItem("totalQty"))
      }
      else{ sessionStorage.setItem("totalQty", JSON.stringify(0))}
    cartCount.innerText = qty
    }




var totalItems = document.querySelector("#checkout_products");
var checkoutCard = document.querySelector(".checkoutCard_vessel")

function UpdateCard(){

totalItems.innerText = storedData.length;

storedData.map((product) => {
checkoutCard.innerHTML +=`
<div class="checkout_card" id="${product.id}">
<img class="checkout_item_image" src="${product.image}" alt="" />
<div class="order_detail">
  <h4>${product.name}</h4>
  <p>x${product.quantity}</p>
  <p>
    <span>Amount Rs</span>
    <span>${product.price}</span>
  </p>
  </div>
`
})
}


function calculateTotalPriceCart(){
    var totalPrice = document.querySelector("#final_price")
    var totalCartPrice = storedData.reduce((total, item) => {

      return total + (item.price * item.quantity)
    }, 0)
    totalPrice.innerText = totalCartPrice
}
var user = storedData;
console.log(user)





var productList = JSON.parse(sessionStorage.getItem("myList", "[]"));

console.log(productList);
var grandTotal = storedData.reduce((total, item) => {
  return total+(item.price * item.quantity)
}, 0)





  $("#btn-place-order").on("click",  function () {
    console.log("xx")
  var orderItemArr = [];
  for(var i=0; i < productList.length; i++) {
      var prodObj = {
          "id": productList[i].id,
          "name": productList[i].name,
          "price": productList[i].price,
          "preview": productList[i].image,
      }

      orderItemArr.push(prodObj);
  }


  var dataObj = {
      amount: grandTotal,
      products: orderItemArr
  }
  console.log(dataObj)
  $.post('https://5d76bf96515d1a0014085cf9.mockapi.io/order', dataObj, function() {
      alert('Order Placed Successfully')
      sessionStorage.setItem('myList', []);

      location.assign('./orderconfirmation.html');
  })
})



