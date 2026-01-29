function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.className = "";
  toast.classList.add("show", type);

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

/* ================= ADD TO CART ================= */

function addToCart(id, name, price) {
  if (!id || !name || price == null) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id,
      name,
      price: Number(price),
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast(`${name} added to cart`, "success");
}

/* ================= RENDER CART ================= */

document.addEventListener("DOMContentLoaded", renderCart);

function renderCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  const emptyCartDiv = document.getElementById("emptyCart");
  const cartSummary = document.getElementById("cartSummary");
  const totalPriceEl = document.getElementById("totalPrice");

  if (!cartItemsDiv) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    emptyCartDiv.style.display = "block";
    cartSummary.style.display = "none";
    return;
  }

  emptyCartDiv.style.display = "none";
  cartSummary.style.display = "block";

  let total = 0;

  cart.forEach(item => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;

    total += price * qty;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <h4>${item.name || "Unnamed Product"}</h4>
        <p>₹${price.toLocaleString()}</p>

        <div class="qty">
          <button onclick="updateQty('${item.id}', -1)">−</button>
          <span>${qty}</span>
          <button onclick="updateQty('${item.id}', 1)">+</button>
        </div>

        <button onclick="removeItem('${item.id}')">Remove</button>
      </div>
    `;
  });

  totalPriceEl.textContent = total.toLocaleString();
}

/* ================= UPDATE QUANTITY ================= */

function updateQty(id, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(p => p.id === id);
  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

/* ================= REMOVE ITEM ================= */

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function handleCheckout() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    showToast("Please login to continue checkout", "error");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);

    return;
  }

  // Logged in → proceed
  window.location.href = "checkout.html";
}
