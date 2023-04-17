// {
//   "id": "",
//   "title":"",
//   "price":"",
//   "colors":["","",""],
//   "image":"",
//   "category":"",
//   "sub-cat":""

// }

let slideIndex = 0;

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName('dot');
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].style.background = '#bbb'
    
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].style.background = "black";

  setTimeout(showSlides, 3500); // Change image every 2 seconds


}


function toggleSearch(){


  var con = document.getElementById("search-bar");
  con.classList.toggle("hidden");
  var con = document.getElementById("SelectTab");
  con.classList.toggle("hidden");
  
 }


 let id = 'mens-itemsWrapper';
 var items;
 
 async function  getItem(idName,cat){
  
  
  var data =fetch('./data.json')
 
  .then(res=>res.json())
  .then(data => {
    const wrapper = document.getElementById(idName);
    var counter = 1;
    for(var i=0; i<data.length;i++){
      if(data[i].category == cat){

        const item = document.createElement('div');
        item.className = 'item';
        item.setAttribute("data-product-id", data[i].id);
      
       var html = '<img src=' + data[i].image[0] +'><div class="title"><h1>' +data[i].title +'</h1></div>';
       item.innerHTML =  html;
       
 
       wrapper.appendChild(item);
       if (counter > 3){
        break;
       }
       counter ++;
      }

      
    }
    

    items = document.querySelectorAll('.item');
   
   items.forEach(product => {
      product.addEventListener('click', () => {
        const productId = product.dataset.productId;
        window.location.href = `product.html?id=${productId}`;
      });
    });
  })
  
}



function getProduct(id){
  
  var data =fetch('./data.json')
  .then(res=>res.json())
  .then(data => {
    const wrapper = document.getElementById('product');

    data.forEach(product => {
      if(product.id == id){
          const item = document.createElement('div');
          
          console.log('hello')
          var html = '<img src=' + product.image[1] +'><div class="title"><h1>' +product.title +'</h1></div>';
          item.innerHTML =  html;
          
    
          wrapper.appendChild(item);
        
      }
    })

  })
}

function tester(){
  console.log('i am being activiated')
}








// ----------------------------------------------------- CALLS-------------------------------------------------------------

showSlides();
getItem("mens-itemsWrapper", "mens");
getItem("womens-itemsWrapper", "womens");
//getProduct(5);
console.log('scripts.js is running')