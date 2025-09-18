// REDIRECT TO SIGNUP PAGE
document.getElementById("signupBtn").addEventListener("click", () => {
  window.location.href = "signup.html";  // this loads signup.html from the same folder
});


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
  cartTab.classList.add("cart-tab-active");
});

// Close cart tab
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cartTab.classList.remove("cart-tab-active");
});

// Add to Cart buttons
document.querySelectorAll(".carousel .btn").forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const item = btn.parentElement;
    const name = item.querySelector("h3").innerText;
    const price = parseInt(item.querySelector("p").innerText.replace("Rs. ", ""));
    const image = item.querySelector("img").src;
    addToCart(name, price, image);
  });
});

// Add Item Function
function addToCart(name, price, image) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, image, qty: 1 });
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
    li.classList.add("items");
    li.innerHTML = `
      <div class="item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="item-detail">
          <h4> ${item.name} </h4>
          <h4 class="item-total"> Rs. ${item.price * item.qty} </h4>
      </div>
      <div class="flex">
          <a href="#" class="quantity-btn minus">
              <i class="fa-solid fa-minus"></i>
          </a>
          <h4 class="quantity-value">${item.qty}</h4>
          <a href="#" class="quantity-btn plus">
              <i class="fa-solid fa-plus"></i>
          </a>
      </div>
      
    `;
    cartList.appendChild(li);
    const minusBtn = li.querySelector(".minus");
    const plusBtn = li.querySelector(".plus");

    minusBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (item.qty > 1) {
        item.qty--;
      } else {
        cart = cart.filter(i => i.name !== item.name);
      }
      updateCart();
    });

    plusBtn.addEventListener("click", (e) => {
      e.preventDefault();
      item.qty++;
      updateCart();
    });
  });

  cartTotal.innerText = `Rs. ${total.toFixed(2)}`;
  cartCount.innerText = count;
}

const productContainer = document.getElementById('product-list');

// Function to render products
function showProducts(products) {
  productContainer.innerHTML = ""; // clear old products

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('order-card');
    card.innerHTML = `
      <div class="card-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <h3>${product.name}</h3>
      <p>${product.price ? `Rs.${product.price}` : ""}</p>
      <a href="#" class="btn add-to-cart">Add to Cart</a>
    `;
    productContainer.appendChild(card);

    // Add-to-cart button only
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart(product.name, product.price, product.image);
    });

    // Click anywhere else on card = open modal
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart')) return; // skip add-to-cart
      openModal(product);
    });
  });
}

// Modal logic
const modal = document.getElementById("productModal");
const closeModalBtn = document.querySelector(".modal-close-btn");

function openModal(product) {
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalName").innerText = product.name;
  document.getElementById("modalPrice").innerText = `Rs. ${product.price}`;
  document.getElementById("modalDesc").innerText = product.description;

  modal.style.display = "flex";

  // Add-to-cart from modal
  document.getElementById("modalAddToCart").onclick = () => {
    addToCart(product.name, product.price, product.image);
    modal.style.display = "none";
  };
}

// Close modal
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});


// Function to fetch JSON
function loadCategory(fileName) {
  fetch(fileName)
    .then(res => res.json())
    .then(data => showProducts(data))
    .catch(err => console.error("Error loading file:", err));
}

// Attach click listeners to categories
document.querySelectorAll('.category').forEach(cat => {
  cat.addEventListener('click', () => {
    const fileName = cat.getAttribute('data-file');
    loadCategory(fileName);
  });
});




// Checkout button
document.querySelector(".btn-container .btn:last-child").addEventListener("click", (e) => {
  e.preventDefault();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Please log in or sign up before checking out!");
    window.location.href = "login.html"; // redirect to login page
    return;
  }

  // Proceed with order if logged in
  fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: currentUser.id, // attach logged-in user id
      items: cart,
    }),
  })
    .then(res => res.json())
    .then(data => {
      alert("Order placed successfully!");
      cart = []; // clear cart after order
      updateCart();
    })
    .catch(err => {
      console.error(err);
      alert("Failed to order. Please try again.");
    });
});

