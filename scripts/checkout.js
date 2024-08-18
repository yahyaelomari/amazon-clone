import {deleteFromCart , updateCheckoutQnt, updateQuantity, updateDeliveryOption, saveQuantity, cart} from "../data/cartProducts.js";
import {products} from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions} from "../data/deliveryOptions.js";

function renderOrderSummary(){

let checkoutHtmlToGenerate = '';

function generateOrderSumHtml() {
    cart.forEach((cartItem) => {
        let checkoutItems = {};
        products.forEach((product) => {
            if (product.id === cartItem.id) {
                checkoutItems = product;
            }
        });

        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption;

        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
                deliveryOption = option;
            }
        });

        // Validate deliveryOption.deliveryDays before using it
        const deliveryDays = deliveryOption?.deliveryDays || 0;
        const today = dayjs();
        const deliveryDate = today.add(deliveryDays, 'days');
        const DateString = deliveryDate.format('dddd, MMMM D');

        checkoutHtmlToGenerate += `<div class="cart-item-container js-cart-item-container-${checkoutItems.id}">
            <div class="delivery-date">Update
                Delivery date: ${DateString}
            </div>
            <div class="cart-item-details-grid">
                <img alt="checkoutItems image" class="product-image" src=${checkoutItems.image}>
                <div class="cart-item-details">
                    <div class="product-name">
                        ${checkoutItems.name}
                    </div>
                    <div class="product-price">
                        "$${checkoutItems.priceCents.toFixed(2)}"
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label js-quantity-label-${checkoutItems.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="js-updateBtn update-quantity-link link-primary" data-product-id="${checkoutItems.id}">Update</span>
                        <input id="js-quantity-input-${checkoutItems.id}" class="js-inputQntToSave quantity-input" data-product-id="${checkoutItems.id}">
                        <span class="js-saveQntBtn save-quantity-link link-primary" data-product-name="${checkoutItems.name}" data-product-id="${checkoutItems.id}">Save</span>
                        <span class="js-deleteBtn delete-quantity-link link-primary" data-product-id="${checkoutItems.id}">Delete</span>
                    </div>
                </div>
                <div class="delivery-options">
                    <div class="delivery-options-title">Choose a delivery option:</div>
                    ${deliveryOptionHtml(checkoutItems, cartItem)}
                </div>
            </div>
        </div>`;
    });
}

function deliveryOptionHtml(checkoutItems, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const deliveryDateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.price === 0 ? 'Free' : `$${deliveryOption.price} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `<div class="delivery-option js-delivery-option" data-product-id="${checkoutItems.id}" data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${checkoutItems.id}">
            <div>
                <div class="delivery-option-date">${deliveryDateString}</div>
                <div class="delivery-option-price">${priceString} Shipping</div>
            </div>
        </div>`;
    });
    return html;
}

generateOrderSumHtml();

const orderSumElem = document.querySelector('.js-order-summary');
orderSumElem.innerHTML = checkoutHtmlToGenerate;

document.querySelectorAll('.js-deleteBtn').forEach((button) => {
    button.addEventListener('click', () => {
        const productToDelId = button.dataset.productId;
        deleteFromCart(productToDelId);
        const prodToDelContainer = document.querySelector(`.js-cart-item-container-${productToDelId}`);
        prodToDelContainer.remove();
    });
});

document.querySelectorAll('.js-updateBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const productId = btn.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
    });
});

document.querySelectorAll('.js-saveQntBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const productIdData = btn.dataset.productId;
        saveQuantity(productIdData);
    });
});

document.querySelectorAll('.js-inputQntToSave').forEach((input) => {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const productIdData = input.dataset.productId;
            saveQuantity(productIdData);
        }
    });
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary()

    });
});

updateCheckoutQnt();

}

renderOrderSummary()


