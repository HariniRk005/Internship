document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  /* ✅ Redirect if no ID */
  if (!productId || !products[productId]) {
    window.location.href = "shop.html";
    return;
  }

  const product = products[productId];

  /* ================= RENDER PRODUCT ================= */
  document.getElementById("productImage").src = product.image;
  document.getElementById("productImage").alt = product.name;
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productPrice").textContent = `₹${product.price.toLocaleString()}`;
  document.getElementById("productDescription").textContent = product.description;

  /* ================= ADD TO CART ================= */
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === productId);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        qty: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showToast(`${product.name} added to cart`);
  });

});





