var id;
var prod;
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get('id');
  
  getProduct(id);
  saveProduct(id);
  console.log(prod)
}

var request = window.indexedDB.open("my-database", 1);
var objectStore;
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  objectStore = db.createObjectStore("shoppingCart", { keyPath: "id" });

// Create an index for the all field
  objectStore.createIndex("id", "id");
  objectStore.createIndex("title", "title");
  objectStore.createIndex("price", "price");
  objectStore.createIndex("colors", "colors");
  objectStore.createIndex("image", "image");
  objectStore.createIndex("category", "category");
  objectStore.createIndex("subCat", "subCat");
};










function getProduct(id){
  
    var data =fetch('./data.json')
    .then(res=>res.json())
    .then(data => {
      const wrapper = document.getElementById('product');
  
      data.forEach(product => {
        if(product.id == id){
            const item = document.createElement('div');
            item.className = 'product';
            
            var html = '<img src=' + product.image[0] +'><div class="pro-bot"><div class="prod-left"><div class="title"><h1>' +product.title +'</h1><p>'+product.price+' DHS</p></div></div>';
            html += '<div class="prod-right"><Select>'
            product.colors.forEach(col => {
                html += "<option>" + col + "</option>"
            })
            html += '</select><select><option>S</option><option>M</option><option>L</option></select></div></div>';

            html += '<div style="margin-left:5vw" ><label for="quantity">Quantity:</label><input type="number" id="quantity" name="quantity" value="1" min="1" max="5"></div> <div style="display:flex; justify-content:center"><Button onclick="addToDB()" style="width:80vw;">Add to cart</Button></div>'
            item.innerHTML =  html;
            
      
            wrapper.appendChild(item);
          
        }
      })
  
    })
  }




  function addToDB(id){

    var request = window.indexedDB.open("my-database", 1);
      request.onerror = function(event) {
        console.log("Failed to open database");
      };


    request.onsuccess = function(event) {
      var db = event.target.result;
      console.log(prod);
      var tx2 = db.transaction(["shoppingCart"], "readwrite");
      var objectStore = tx2.objectStore("shoppingCart");
      request = objectStore.add(prod);
      request.onsuccess = function(event) {
        alert("Product added to shopping cart.");
    window.location.href = 'homepage.html'
      };

    }
    
    
    


  }








async function saveProduct(id){
  var item = await fetch('./data.json')
.then(res=>res.json())
.then(data => {
  data.forEach(product => {
    if(product.id == id){
     prod=product;
    }
})
})
}

  function goBack(){
    window.history.back(); console.log('clicked')
  }







  



  // ------------------------------------Calls--------------------------------------------
  