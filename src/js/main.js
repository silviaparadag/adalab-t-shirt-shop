'use strict';
/* */

console.log('>> Ready :)');

const productItemList = document.querySelector('.js-products');
const productCartList = document.querySelector('.js-cart');

let productsList = [];
let shoppingCartList = [];

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
  for (const btn of btnProductList) {
    btn.addEventListener('click', handleAddBtn);
  }
};

const handleAddBtn = (ev) => {
  ev.preventDefault();
  const productId = ev.target.id;
  console.log(productId);
  // Find if the product already exists in the shopping cart
  let selectedProduct = shoppingCartList.find((item) => item.id === productId);
  if (selectedProduct === undefined) {
    // If product doesn't exist, search for the clicked product to add it into cart
    let productToCart = productsList.find((item) => item.id === productId);
    shoppingCartList.push({
      id: productToCart.id,
      name: productToCart.name,
      price: productToCart.price,
      quantity: 1,
    });
  } else {
    selectedProduct.quantity += 1;
  }
  renderShoppingCartProducts();
};

// const incrProductQty = () => {
//   const productId = ev.target.id;
//   const selectedProduct = productsList.find((item) => item.id === productId);
//   if () {

//   } else {

//   }
// };

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

const renderTotalRowTable = () => {
  let html = '';
  html += `<tr class="text--bold">`;
  html += `  <td>Total</td>`;
  html += `  <td colspan="3" class="text-align-right">${getTotalPrice()}€</td>`;
  html += `</tr>`;
  return html;
};

const getTotalPrice = () => {
  let total = 0;
  for (const item of shoppingCartList) {
    total += item.price * item.quantity;
  }
  return total;
};

const renderShoppingCartProducts = () => {
  productCartList.innerHTML = '';
  for (const eachCartProduct of shoppingCartList) {
    productCartList.innerHTML += renderCardProduct(eachCartProduct);
  }
  productCartList.innerHTML += renderTotalRowTable();
};
