// MOBILE MENU TOGGLE
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav-links");

hamburger.addEventListener("click", () => {
  mobileNav.classList.toggle("mobile-nav-links-active");
});

// CART FUNCTIONALITY
const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const cartList = document.querySelector(".cart-list");
const cartCount = document.querySelector(".cart-count");
const cartTotal = document.querySelector(".cart-total");

let cart = [];

// Open cart tab
cartIcon.addEventListener("click", () => {
  cartTab.style.display = "flex";
});

// Close cart tab
closeBtn.addEventListener("click", () => {
  cartTab.style.display = "none";
});

// Add to Cart buttons
document.querySelectorAll(".carousel .btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const name = item.querySelector("h3").innerText;
    const price = parseInt(item.querySelector("p").innerText.replace("Rs. ", ""));
    addToCart(name, price);
  });
});

// Add Item Function
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCart();
}

// Update Cart UI
function updateCart() {
  cartList.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    const li = document.createElement("div");
    li.classList.add("cart-item");
    li.innerHTML = `
      <p>${item.name} (x${item.qty})</p>
      <p>Rs. ${item.price * item.qty}</p>
    `;
    cartList.appendChild(li);
  });

  cartTotal.innerText = `Rs. ${total.toFixed(2)}`;
  cartCount.innerText = count;
}
