/* ================= ORDER SUMMARY ================= */
const summaryItems = document.getElementById("summary-items");
const summaryTotal = document.getElementById("summary-total");

const cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

summaryItems.innerHTML = "";

cart.forEach(item => {
  const itemTotal = item.price * item.qty;
  total += itemTotal;

  summaryItems.innerHTML += `
    <p>${item.name} × ${item.qty} — ₹${itemTotal.toLocaleString()}</p>
  `;
});

summaryTotal.textContent = `Total: ₹${total.toLocaleString()}`;


/* ================= LOGIN CHECK ================= */
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    window.location.href = "login.html";
  }
});


/* ================= CHECKOUT SUBMIT ================= */
document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (cart.length === 0) {
    showToast("Your cart is empty", "error");
    return;
  }

  // collect address
  const address = {
    name: this[0].value,
    address: this[1].value,
    city: this[2].value,
    pincode: this[3].value,
    phone: this[4].value
  };

  localStorage.setItem("checkoutAddress", JSON.stringify(address));


  // go to payment page
  setTimeout(() => {
    window.location.href = "payment.html";
  }, 600);
});
