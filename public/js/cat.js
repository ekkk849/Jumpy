var type;
var subtype;
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  type = urlParams.get('type');
  subtype = urlParams.get('subtype');
  var html = '<h1> ' +type + '\'s ' + subtype + '</h1>';
  document.getElementById("title").innerHTML = html;
  getItem("catWrapper", type, subtype);
}







async function  getItem(idName,type,subtype){
    var data =fetch('./data.json')
   
    .then(res=>res.json())
    .then(data => {
      const wrapper = document.getElementById(idName);
      data.forEach(product => {
  
        if(product.category == type){
            if(product.subCat == subtype){
                const item = document.createElement('div');
                item.className = 'item';
                item.setAttribute("data-product-id", product.id);
               var html = '<img src=' + product.image[0] +'><div class="title"><h1>' +product.title +'</h1></div>';
               item.innerHTML =  html;
               
         
               wrapper.appendChild(item);
            }
        }
        
      })

      items = document.querySelectorAll('.item');
      items.forEach(product => {
        product.addEventListener('click', () => {
          const productId = product.dataset.productId;
          window.location.href = `product.html?id=${productId}`;
        });
      });
      
    })
    
  }


