window.addEventListener("load", () => {
    showSideBar();
  });



function showSideBar(){
    var sideBar = document.querySelector(".sideBar");
    var toggle  = document.querySelector(".list_toggle");
    toggle.addEventListener("click" , function(){
      sideBar.classList.toggle("active_sideBar")
    })
  }