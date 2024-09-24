const toggleButton = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");

function toggleSidebar() {
  sidebar.classList.toggle("close");
  toggleButton.classList.toggle("rotate");

  closeAllSubMenus();
}

function toggleSubMenu(button) {
  if (!button.nextElementSibling.classList.contains("show")) {
    closeAllSubMenus();
  }

  button.nextElementSibling.classList.toggle("show");
  button.classList.toggle("rotate");

  if (sidebar.classList.contains("close")) {
    sidebar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");
  }
}

function closeAllSubMenus() {
  Array.from(sidebar.getElementsByClassName("show")).forEach((ul) => {
    ul.classList.remove("show");
    ul.previousElementSibling.classList.remove("rotate");
  });
}

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  loader.classList.add("loader-hidden"); // Add class to hide the loader

  loader.addEventListener("transitionend", () => {
    // Check if the loader is still a child of document.body before removing it
    if (loader && loader.parentNode) {
      document.body.removeChild(loader);
    }
  });
});

const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

function addToCart(item) {
  const newItem = {
    id: item.id,
    name: item.name,
    price: item.price,
    img: item.img,
    quantity: 1,
  };

  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.id === newItem.id
  );
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push(newItem);
  }

  localStorage.setItem("cartItems", JSON.stringify(cart));
  updateCartDisplay();
}

function updateCartDisplay() {
  let cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
  displayTotalPrice();
}

function displayTotalPrice() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalPriceContainer = document.getElementById("total-price");
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  totalPriceContainer.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

function displayCartItems() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  cartItemsContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="cart-image" />
      <h3 class="cart-title">${item.name}</h3>
      <span class="cart-price">$${item.price}</span>
      <span class="cart-quantity">Quantity: ${item.quantity}</span>
      <button class="remove-btn" onclick="removeCartItem(${index})">Remove</button>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });
}

function removeCartItem(index) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.splice(index, 1); // Remove item
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  loadCartItems();
  displayTotalPrice();
}

document.addEventListener("DOMContentLoaded", () => {
  displayCartItems();
  displayTotalPrice();
});
