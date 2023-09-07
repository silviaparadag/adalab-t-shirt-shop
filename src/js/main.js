'use strict';

let productsList = [];
let shoppingCartList = [];

const startPage = () => {
  getProductsFromLocalStorage();
  getCartFromLocalStorage();
  renderShoppingCartProducts();
  getApiData();
};

const getApiData = () => {
  fetch('../api/data.json')
    .then((response) => response.json())
    .then((data) => {
      productsList = data.cart.items;
      localStorage.setItem('products', JSON.stringify(productsList));
      renderProductList(productsList);
    });
};

const handleAddBtn = (ev) => {
  const productId = ev.target.id;
  // Find if the product already exists in the shopping cart
  const selectedProduct = foundProduct(productId);
  if (selectedProduct === undefined) {
    // If product doesn't exist, search for the clicked product to add it into cart
    addProductToCart(productId);
  } else {
    incrQuantity(productId);
  }
  setCartInLocalStorage();
  renderShoppingCartProducts();
};

const addProductToCart = (productId) => {
  const productToCart = productsList.find((item) => item.id === productId);
  shoppingCartList.push({
    id: productToCart.id,
    name: productToCart.name,
    price: productToCart.price,
    quantity: 1,
  });
};

const handleIncrBtn = (ev) => {
  const productId = ev.target.id;
  incrQuantity(productId);
  setCartInLocalStorage();
  renderShoppingCartProducts();
};

const handleDecrBtn = (ev) => {
  const productId = ev.target.id;
  const selectedProduct = foundProduct(productId);
  if (selectedProduct.quantity > 1) {
    decrQuantity(productId);
  } else {
    const indexProduct = shoppingCartList.findIndex(
      (item) => item.id === productId
    );
    shoppingCartList.splice(indexProduct, 1);
  }
  setCartInLocalStorage();
  renderShoppingCartProducts();
};

const foundProduct = (id) => {
  return shoppingCartList.find((item) => item.id === id);
};

const incrQuantity = (productId) => {
  const selectedProduct = foundProduct(productId);
  selectedProduct.quantity += 1;
};

const decrQuantity = (productId) => {
  const selectedProduct = foundProduct(productId);
  selectedProduct.quantity -= 1;
};

const getTotalPrice = () => {
  return shoppingCartList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

const addEventBtn = () => {
  listenEventsBtns('.js-add-btn', handleAddBtn);
};

const listenCartBtns = () => {
  listenEventsBtns('.js-incr-btn', handleIncrBtn);
  listenEventsBtns('.js-decr-btn', handleDecrBtn);
};

const renderProductList = () => {
  const productItemList = document.querySelector('.js-products');
  productItemList.innerHTML = '';
  for (const eachProduct of productsList) {
    productItemList.innerHTML += renderOneProduct(eachProduct);
  }
  addEventBtn();
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

const renderShoppingCartProducts = () => {
  const productCartList = document.querySelector('.js-cart');
  productCartList.innerHTML = '';
  for (const eachCartProduct of shoppingCartList) {
    productCartList.innerHTML += renderCartProduct(eachCartProduct);
  }
  productCartList.innerHTML += renderTotalRowTable();
  listenCartBtns();
};

const renderCartProduct = (product) => {
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

const getProductsFromLocalStorage = () => {
  const localStorageProducts = localStorage.getItem('products');
  if (localStorageProducts !== null) {
    productsList = JSON.parse(localStorageProducts);
    renderProductList(productsList);
  }
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

startPage();
