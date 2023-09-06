'use strict';
/* */

console.log('>> Ready :)');

const productItemList = document.querySelector('.js-products');
const productCartList = document.querySelector('.js-cart');

let productsList = [];
let shoppintCartList = [];

const getApiData = () => {
  fetch('../api/data.json')
    .then((response) => response.json())
    .then((data) => {
      productsList = data.cart.items;
      renderProductList(productsList);
      console.log(data.cart.items);
    });
};

const renderOneProduct = (product) => {
  let html = '';
  html += `<li class="js_card "><article class="card">`;
  html += `  <img src="${product.imageUrl}" class="card__img" alt="Product: ${product.name}">`;
  html += `  <h3 class="card__title">${product.name}</h3>`;
  html += `  <p class="card__description">${product.price} €</p>`;
  html += `  <button class="js-add-btn card__btn" id="${product.id}">Add to cart</button>`;
  html += `</article></li>`;
  return html;
};

const renderProductList = () => {
  productItemList.innerHTML = '';
  for (const eachProduct of productsList) {
    productItemList.innerHTML += renderOneProduct(eachProduct);
  }
  addEventBtn();
};

getApiData();

const addEventBtn = () => {
  const btnProductList = document.querySelectorAll('.js-add-btn');
  //addBtn.addEventListener('click', handleClick);
  for (const btn of btnProductList) {
    btn.addEventListener('click', handleClick);
  }
};

const handleClick = (ev) => {
  ev.preventDefault();
  const productId = ev.target.id;
  const selectedProduct = productsList.find((item) => item.id === productId);
  console.log(selectedProduct);
  shoppintCartList.push(selectedProduct);
  renderShoppingCartProducts();
  renderTotalTable();
};

const renderCardProduct = (product) => {
  let html = ``;
  html += `<tr>`;
  html += `  <td>${product.name}</td>`;
  html += `  <td>${product.price}</td>`;
  html += `  <td>`;
  html += `    <button class="js-dec-btn card__btn" data-id="${product.id}">-</button>`;
  html += `    ${product.quantity}`;
  html += `    <button class="js-inc-btn card__btn" data-id="${product.id}">+</button>`;
  html += `  </td>`;
  html += `  <td class="text-align-right">${
    product.price * product.quantity
  }€</td>`;
  html += `</tr>`;
  return html;
};

const renderShoppingCartProducts = () => {
  productCartList.innerHTML = '';
  for (const eachCartProduct of shoppintCartList) {
    productCartList.innerHTML += renderCardProduct(eachCartProduct);
  }
};
const getTotalPrice = () => {
  let total = 0;
  for (const item of shoppintCartList) {
    total += item.price * item.quantity;
  }
  return total;
};

const renderTotalTable = () => {
  let html = '';
  html += `<tr class="text--bold">`;
  html += `  <td>Total</td>`;
  html += `  <td colspan="3" class="text-align-right">${getTotalPrice()}€</td>`;
  html += `</tr>`;
  return html;
};

/* const getCartTotalHtmlCode = () => {
  let htmlCode = '';
  htmlCode += `<tr class="text--bold">`;
  htmlCode += `  <td>Total</td>`;
  htmlCode += `  <td colspan="3" class="text-align-right">${getTotalPrice()}€</td>`;
  htmlCode += `</tr>`;
  return htmlCode;
};

const getTotalPrice = () => {
  let total = 0;
  for (const item of cart) {
    total += item.price * item.quantity;
  }
  return total;
};*/
