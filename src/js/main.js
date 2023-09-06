'use strict';
/* */

console.log('>> Ready :)');

const productItemList = document.querySelector('.js-products');

let productsList = [];

const getApiData = () => {
  fetch('../api/data.json')
    .then((response) => response.json())
    .then((data) => {
      productsList = data.cart.items;
      renderProductList();
    });
};

const renderOneProduct = (product) => {
  let html = '';
  html += `<li class="js_card "><article class="card">`;
  html += `  <img src="${product.imageUrl}" class="card__img" alt="Product: ${product.name}">`;
  html += `  <h3 class="card__title">${product.name}</h3>`;
  html += `  <p class="card__description">${product.price} €</p>`;
  html += `  <button class="js-add-btn card__btn" data-id="${product.id}">Add to cart</button>`;
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
  console.log(`I've clicked the button`);
};
