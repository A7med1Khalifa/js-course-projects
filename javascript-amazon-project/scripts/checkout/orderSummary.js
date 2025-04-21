import { cart , removeFromCart,updateDeliveryOption} from '../../data/cart.js';
import { products,getProduct } from '../../data/products.js'
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions,getDeliveryOption} from '../../data/delivery.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary(){

  let cartSummaryHTML='';

  cart.forEach((cartItem)=>{
    const productId=cartItem.productId;



    const  matcingProducts=getProduct(productId);

    const deliveryOptionId=cartItem.deliveryOptionId;

    const deliveryOption=getDeliveryOption(deliveryOptionId);
    const today=dayjs();
    const deliveryDate= today.add(deliveryOption.deliveryDays,'days');
    const dataString = deliveryDate.format
    ('dddd, MMMM D'
    );

  cartSummaryHTML+=`
    <div class="cart-item-container 
    js-cart-item-container
    js-cart-item-container-${matcingProducts.id}">
          <div class="delivery-date">
            Delivery date: ${dataString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matcingProducts.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matcingProducts.name}
              </div>
              <div class="product-price">
                ${matcingProducts.getPrice()}
              </div>
              <div class="product-quantity
                js-product-quantity-${matcingProducts.id}">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link
                  js-delete-link-${matcingProducts.id}"
                  data-product-id="${matcingProducts.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matcingProducts,cartItem)}
            </div>
          </div>
        </div>`;
  });

  function deliveryOptionsHTML (matcingProducts,cartItem){
    let html = '';

    deliveryOptions.forEach((deliveryOption)=>{
      const today=dayjs();
      const deliveryDate= today.add(deliveryOption.deliveryDays,'days');
      const dataString = deliveryDate.format
      ('dddd, MMMM D'
      );
      const priceString = deliveryOption.priceCents===0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      

      html +=`
      <div class="delivery-option js-delivery-option"
      data-product-id="${matcingProducts.id}"
      data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                  ${isChecked ?'checked':''} 
                  class="delivery-option-input"
                  name="delivery-option-${matcingProducts.id}">
                <div>
                  <div class="delivery-option-date">
                    ${dataString}
                  </div>
                  <div class="delivery-option-price">
                    $${priceString} - Shipping
                  </div>
                </div>
              </div>
              `

    });
    return html ;



  }

  document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
  .forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId= link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();
    renderPaymentSummary();
    });
  });
  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=> {
      const {productId, deliveryOptionId}=element.dataset;
    updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

