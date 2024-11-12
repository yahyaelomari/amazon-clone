export let cart= JSON.parse(localStorage.getItem('cartString')) || [{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    quantity:5,
    deliveryOptionId:'1'
}
    ,
    {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        name: "Intermediate Size Basketball",
        quantity:1,
        deliveryOptionId:'2'
    }

    ,

    {
        id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
        name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
        quantity:2,
        deliveryOptionId:'3'
    }];

function saveToLocalStorage()
{
    localStorage.setItem('cartString',JSON.stringify(cart))
}

export function addToCart(productIdToVerify , productNameToAdd){
    let existingItem

    cart.forEach((product)=>{
        if(product.id === productIdToVerify){existingItem=product;}
    })

    if(existingItem){existingItem.quantity++}
    else
    {
        cart.push(
            {
                id : productIdToVerify,
                name : productNameToAdd,
                quantity : 1
            }
        )
    }

    saveToLocalStorage()
}

export const cartQntElem=document.querySelector('.js-cart-quantity');


function calculateCartQnt()
{
    let cartTotNum=0;
    cart.forEach((cartItem)=>{
        cartTotNum += cartItem.quantity;
    })
    return cartTotNum
}

export function cartQntAmazon()
{
    return calculateCartQnt()
}

export function cartQntCheckout()
{

    let cartQnt= calculateCartQnt()
    if(cartQnt === 1){return `${cartQnt} item`}
    else return `${cartQnt} items`
}

export function updateCartQnt(){
    let cartTotNum=0;
    cart.forEach((cartItem)=>{
        cartTotNum += cartItem.quantity;
    })
    cartQntElem.innerHTML=cartTotNum;
}


export function deleteFromCart(productToDelId) {
    //the methode that is commented produces an error where sometimes 2 items get deleted and idk why it happens
    let newCart=[];
    cart.forEach((itemInCart)=>{
        if(itemInCart.id !== productToDelId){
            newCart.push(itemInCart)
        }
        cart = newCart
    })

    /*
    for (let i = 0; i < cart.length; i++) {
        cart.forEach((itemInCart) => {
            if (itemInCart.id === productToDelId) {
                cart.splice(i, 1)
            }
        })
    }*/
    updateCheckoutQnt()
    saveToLocalStorage()
}


export function updateCheckoutQnt() {
    document.querySelector('.js-checkout-items-number').innerHTML = cartQntCheckout()
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (cartItem.id === productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.quantity = newQuantity;
    saveToLocalStorage()
}



export function saveQuantity(productIdData) {
    const container = document.querySelector(`.js-cart-item-container-${productIdData}`);
    container.classList.remove('is-editing-quantity')

    const quantityInput = document.querySelector(`#js-quantity-input-${productIdData}`);
    let newQuantity = Number(quantityInput.value) || 1;
    updateQuantity(productIdData, newQuantity);


    const quantityLabel = document.querySelector(`.js-quantity-label-${productIdData}`)
    quantityLabel.innerHTML = String(newQuantity)

    updateCheckoutQnt()

    console.log(cart)
}

export function updateDeliveryOption (productIdToVerify,deliveryOptionId){

    //find matching product
    let existingItem
    cart.forEach((product)=>{
        if(product.id === productIdToVerify) {existingItem=product;}
    })

    existingItem.deliveryOptionId=deliveryOptionId;
    saveToLocalStorage()
}

console.log('i dont know what is happening, i forgot the project structure. i am in big broblem')



