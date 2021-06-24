if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    var itemRemoveButton = document.getElementsByClassName('remove-item-button')
    for(var i = 0; i < itemRemoveButton.length; i++){
        button = itemRemoveButton[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInput = document.getElementsByClassName('item-quantity')
    for (var i = 0; i < quantityInput.length; i++){
        var input = quantityInput[i]
        input.addEventListener('change', quantityChanged)
    }
    
    var addToCartButton = document.getElementsByClassName('add-item-button')
    for(var i = 0; i < addToCartButton.length; i++){
        button = addToCartButton[i]
        button.addEventListener('click', addButtonClicked)
    }
    document.getElementsByClassName('buy-item-button')[0].addEventListener('click',
    purchaseButtonClick)
}
function purchaseButtonClick(){
    alert('Thanks for your purchase')
    var cartItems = document.getElementsByClassName('cart-item')[0]
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    totalResult()
}
function removeCartItem (even) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    totalResult()
}
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    totalResult()
}

var itemRemoveButton = document.getElementsByClassName('remove-item-button')
for(var i = 0; i < itemRemoveButton.length; i++){
    button = itemRemoveButton[i]
    button.addEventListener('click', function(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.remove()
        totalResult()
    })
}
function addButtonClicked(event){
   var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('cart-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('item-img')[0].src
    addItemToCart(title, price, imageSrc)
    totalResult()
}
function addItemToCart(title, price, imageSrc){
    var itemsCart = document.createElement('div')
    var cartItems = document.getElementsByClassName('cart-item')[0]
    var cartItemNames = document.getElementsByClassName('item-title')
    for(var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('This item is already added to cart')
            return
        }
    }
    var itemscartcontainer = `
    <div class="item-cart">
        <img src="${imageSrc}" width="80" height="60" class="cart-item" alt="">
        <span class="item-title">${title}</span>
        <input type="number" value="1" class="item-quantity">
        <span class="cart-remove-price">${price}</span>
        <input type="button" class="remove-item-button" value="Remove">
    </div>`
    itemsCart.innerHTML = itemscartcontainer
    cartItems.append(itemsCart)
    itemsCart.getElementsByClassName('remove-item-button')[0].addEventListener(
    'click', removeCartItem)
    itemsCart.getElementsByClassName('item-quantity')[0].addEventListener(
    'change', quantityChanged)
}
function totalResult(){
    var cartItem = document.getElementsByClassName('cart-item')[0]
    var myItem = cartItem.getElementsByClassName('item-cart')
    var total = 0
    for (var i = 0; i < myItem.length; i++){
        var totalItem = myItem[i]
        var priceElement = totalItem.getElementsByClassName('cart-remove-price')[0]
        var quantityElement = totalItem.getElementsByClassName('item-quantity')[0]
        var quantity = quantityElement.value 
        var price = parseFloat(priceElement.innerText.replace('₦', ''))
        total = total + (price * quantity)
    
    }
    document.getElementsByClassName('total-price')[0].innerText = '₦ ' +  total
}