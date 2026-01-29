document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".product-card");
  const searchInput = document.getElementById("searchInput");
  const priceRange = document.getElementById("priceRange");
  const priceLabel = document.getElementById("priceLabel");
  const categoryCheckboxes = document.querySelectorAll(
    'input[name="category"]'
  );
  const noProducts = document.getElementById("noProducts");

  /* ================= URL CATEGORY ================= */
  const params = new URLSearchParams(window.location.search);
  const urlCategory = params.get("category");

  if (urlCategory) {
    categoryCheckboxes.forEach(cb => {
      cb.checked = cb.value === urlCategory;
    });
  }

  /* ================= FILTER LOGIC ================= */
  function filterProducts() {
    const searchValue = searchInput.value.toLowerCase();
    const maxPrice = Number(priceRange.value);

    const selectedCategories = Array.from(categoryCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    let visibleCount = 0;

    products.forEach(product => {
      const name = product.dataset.name.toLowerCase();
      const category = product.dataset.category;
      const price = Number(product.dataset.price);

      const matchesSearch = name.includes(searchValue);
      const matchesPrice = price <= maxPrice;
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(category);

      if (matchesSearch && matchesPrice && matchesCategory) {
        product.style.display = "block";
        visibleCount++;
      } else {
        product.style.display = "none";
      }
    });

    noProducts.style.display = visibleCount === 0 ? "block" : "none";
  }

  /* ================= EVENTS ================= */
  searchInput.addEventListener("input", filterProducts);

  priceRange.addEventListener("input", () => {
    priceLabel.textContent = `Up to ₹${Number(priceRange.value).toLocaleString()}`;
    filterProducts();
  });

  categoryCheckboxes.forEach(cb =>
    cb.addEventListener("change", filterProducts)
  );

  /* ================= INIT ================= */
  priceLabel.textContent = `Up to ₹${Number(priceRange.value).toLocaleString()}`;
  filterProducts();
});
