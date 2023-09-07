'use strict';

let productsList = [];
let shoppingCartList = [];

const runPage = () => {
  const localStorageProducts = JSON.parse(localStorage.getItem('products'));
  if (localStorageProducts) {
    productsList = localStorageProducts;
    renderProductList(productsList);
  } else {
    fetch('../api/data.json')
      .then((response) => response.json())
      .then((data) => {
        productsList = data.cart.items;
        localStorage.setItem('products', JSON.stringify(productsList));
        renderProductList(productsList);
      });
  }
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
  const productItemList = document.querySelector('.js-products');
  productItemList.innerHTML = '';
  for (const eachProduct of productsList) {
    productItemList.innerHTML += renderOneProduct(eachProduct);
  }
  addEventBtn();
};

const addEventBtn = () => {
  listenEventsBtns('.js-add-btn', handleAddBtn);
};

const handleAddBtn = (ev) => {
  ev.preventDefault();
  const productId = ev.target.id;
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
  setCartInLocalStorage();
  renderShoppingCartProducts();
};

const listenCartBtns = () => {
  listenEventsBtns('.js-incr-btn', handleIncrBtn);
  listenEventsBtns('.js-decr-btn', handleDecrBtn);
};

const handleIncrBtn = (ev) => {
  ev.preventDefault();
  const productId = ev.target.id;
  let selectedProduct = shoppingCartList.find((item) => item.id === productId);
  selectedProduct.quantity += 1;
  setCartInLocalStorage();
  renderShoppingCartProducts();
};

const handleDecrBtn = (ev) => {
  ev.preventDefault();
  const productId = ev.target.id;
  let selectedProduct = shoppingCartList.find((item) => item.id === productId);
  const indexProduct = shoppingCartList.findIndex(
    (item) => item.id === productId
  );
  if (selectedProduct.quantity > 1) {
    selectedProduct.quantity += -1;
  } else {
    shoppingCartList.splice(indexProduct, 1);
  }
  setCartInLocalStorage();
  renderShoppingCartProducts();
};

const renderCardProduct = (product) => {
  let html = ``;
  html += `<tr>`;
  html += `  <td>${product.name}</td>`;
  html += `  <td>${product.price}</td>`;
  html += `  <td>`;
  html += `    <button class="js-decr-btn card__btn" id="${product.id}">-</button>`;
  html += `    ${product.quantity}`;
  html += `    <button class="js-incr-btn card__btn" id="${product.id}">+</button>`;
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
  const productCartList = document.querySelector('.js-cart');
  productCartList.innerHTML = '';
  for (const eachCartProduct of shoppingCartList) {
    productCartList.innerHTML += renderCardProduct(eachCartProduct);
  }
  productCartList.innerHTML += renderTotalRowTable();
  listenCartBtns();
};

const getCartFromLocalStorage = () => {
  const localStorageCart = localStorage.getItem('cart');
  if (localStorageCart !== null) {
    shoppingCartList = JSON.parse(localStorageCart);
    renderShoppingCartProducts();
  }
};

const setCartInLocalStorage = () => {
  const lsStringifyCart = JSON.stringify(shoppingCartList);
  localStorage.setItem('cart', lsStringifyCart);
};

const listenEventsBtns = (classSelectorJs, handleClick) => {
  const btnList = document.querySelectorAll(classSelectorJs);
  for (const btn of btnList) {
    btn.addEventListener('click', handleClick);
  }
};

getCartFromLocalStorage();
runPage();
renderShoppingCartProducts();
