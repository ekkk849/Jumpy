var subtotal = document.getElementById("subtotal");
var delivery = document.getElementById("delivery");
var discount = document.getElementById("discountTotal");
var total = document.getElementById("total");

var st = 500; //Dummy value, actual value will be passed from Cart
var del = 10;
var cod = 0;
var dis = 0;


function updateTotal(){
    if (st >= 200) {
        del = 0;
        delivery.innerHTML = "FREE";
    }

    var tot = st + del + dis + cod;

    if (del != 0) delivery.innerHTML = del + " AED";
    subtotal.innerHTML = st + " AED";
    discount.innerHTML = dis + " AED";
    total.innerHTML = tot + " AED";
}


//Add COD if pressed, or remove if other payment method pressed
function COD(hide) {
    document.getElementById("COD").hidden = !hide;

    if(hide) cod = 10;
    else cod = 0;

    updateTotal();
}

//Add discount if code given
function checkVoucher(){
    if (document.getElementById("voucher").value == "hello") {
        dis = st * 0.2 * -1;
        document.getElementById("discount").hidden = false;
    }
    else {
        dis = 0;
        document.getElementById("discount").hidden = true;
    }
    updateTotal();
}