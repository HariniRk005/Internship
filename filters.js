document.addEventListener("DOMContentLoaded", () => {

  const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
  const priceRange = document.querySelector('.filters input[type="range"]');
  const products = document.querySelectorAll('.product-card');
  const noProducts = document.getElementById("noProducts");
  const priceLabel = document.getElementById("price-label");

  function applyFilters() {
    const selectedCategories = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    const maxPrice = Number(priceRange.value);
    let visibleCount = 0;

    products.forEach(product => {
      const category = product.dataset.category;
      const price = Number(product.dataset.price);

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(category);

      const priceMatch = price <= maxPrice;

      if (categoryMatch && priceMatch) {
        product.style.display = "block";
        visibleCount++;
      } else {
        product.style.display = "none";
      }
    });

    // No products found message
    noProducts.style.display = visibleCount === 0 ? "block" : "none";
  }

  // Events
  checkboxes.forEach(cb => cb.addEventListener("change", applyFilters));

  priceRange.addEventListener("input", () => {
    priceLabel.textContent = `From ₹1000 to ₹${Number(priceRange.value).toLocaleString()}`;
    applyFilters();
  });

  // Initial load
  applyFilters();
});
