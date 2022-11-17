window.addEventListener("load", () => {
    infiniteSlider();
    getTotalQty();
    showSideBar();
  });
  
  function showSideBar(){
    var sideBar = document.querySelector(".sideBar");
    var toggle  = document.querySelector(".list_toggle");
    toggle.addEventListener("click" , function(){
      sideBar.classList.toggle("active_sideBar")
    })
  }
  function infiniteSlider() {
    var Vessel = document.querySelector(".vessel");
    var slide = document.querySelector(".slides");
    var slides = document.querySelectorAll(".slide");
    var dots = document.querySelector(".dots");
    var dot = document.querySelectorAll(".dot");
    var index = 1;
    var time = 3000;
    let automaticSlide;
  
    var firstClone = slides[0].cloneNode(true);
    var lastClone = slides[slides.length - 1].cloneNode(true);
  
    firstClone.id = "firstClone";
    lastClone.id = "lastClone";
  
    slide.append(firstClone);
    slide.prepend(lastClone);
  
    var slideWidth = slides[index].clientWidth;
  
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  
    function Controls() {
      dot.forEach((item) =>
        item.addEventListener("click", function () {
          index = item.id;
          slide.style.transition = "none";
        })
      );
    }
    Controls();
  
    function changeSlide() {
      slides = document.querySelectorAll(".slide");
      automaticSlide = setInterval(() => {
        nextSlide();
      }, time);
    }
  
    function nextSlide() {
      slides = document.querySelectorAll(".slide");
      if (index >= slides.length - 1) return;
      index++;
      slide.style.transition = ".7s ease-out";
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
  
      console.log(index);
      for (var i = 0; i < dot.length; i++) {
        if (i === 2) {
          dot[2].classList.add("active");
        } else if (i === 3) {
          dot[3].classList.add("active");
        } else if (index === 4) {
          dot[0].classList.add("active");
        } else if (index === 5) {
          dot[1].classList.add("active");
        } else {
          dot[i].classList.remove("active");
        }
      }
    }
  
    slide.addEventListener("transitionend", () => {
      slides = document.querySelectorAll(".slide");
      console.log(slide);
      if (slides[index].id === firstClone.id) {
        slide.style.transition = "none";
        index = 1;
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
      }
    });
  
    changeSlide();
  }
  
  var items = document.querySelector(".items");
  var accessories = document.querySelector(".accessories_items");
  
  (async () => {
    let data;
    async function status() {
      var url = "https://5d76bf96515d1a0014085cf9.mockapi.io/product";
      const response = await fetch(url);
      data = await response.json();
      console.log(data);
      data.slice(0, 5).map((product) => {
        items.innerHTML += `
        <a href="./productdetails.html" class="item_card" id="${product.id}">
          <div class="img_box">
              <img src=${product.preview} alt="">
          </div>
          <div class="description">
              <h3 class="item_heading">${product.name}</h3>
              <h4 class="item_subheading">${product.brand}</h4>
              <h5 class="item_price">${product.price}</h5>
          </div>
        </div>
        </a>
          `;
      });
      data.slice(5, 10).map((product) => {
        accessories.innerHTML += `
    <a href="./productdetails.html" class="item_card" id="${product.id}">
      <div class="img_box">
          <img src=${product.preview} alt="">
      </div>
      <div class="description">
          <h3 class="item_heading">${product.name}</h3>
          <h4 class="item_subheading">${product.brand}</h4>
          <h5 class="item_price">${product.price}</h5>
      </div>
    </a>
      `;
      });
    }
    await status();
  })();
  
  $(".items_vessel").on("click", ".item_card", function (e) {
    // e.preventDefault()
    id = e.currentTarget.id;
    // console.log(id)
    function setProduct(key, product) {
      localStorage.setItem(key, JSON.stringify(product));
    }
    setProduct("id", id);
  });
  
  function getTotalQty() {
    var cartCount = document.querySelector(".cart_count");
    var qty = 0;
    if ("totalQty" in sessionStorage) {
      qty = JSON.parse(sessionStorage.getItem("totalQty"));
    } else {
      sessionStorage.setItem("totalQty", JSON.stringify(0));
    }
    cartCount.innerText = qty;
  }