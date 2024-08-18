import {cart, addToCart, cartQntAmazon, updateCartQnt, cartQntElem} from "../data/cartProducts.js";
import {products} from "../data/products.js"

let htmlToGenerate =''

    products.forEach
    ( (product)=>
        {
             htmlToGenerate += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            "$${product.priceCents.toFixed(2)}"
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img alt="${products.name}" src="../images/icons/checkmark.png">
            Added
          </div>

          <button class="js-addToCartBtn add-to-cart-button button-primary" data-product-id="${product.id}" data-product-name="${product.name}"  >
            Add to Cart
          </button>
        </div>`

        })



let prodGridElem = document.querySelector('.js-products-grid');
prodGridElem.innerHTML=htmlToGenerate;


document.querySelectorAll('.js-addToCartBtn').forEach ((button)=> {
    button.addEventListener('click',()=> {

        const productId=button.dataset.productId
        const productName=button.dataset.productName

        addToCart(productId,productName);
        updateCartQnt();


        console.log(cart)
        });
    });


cartQntElem.innerHTML=cartQntAmazon();






