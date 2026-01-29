document.addEventListener("DOMContentLoaded", () => {
  const payBtn = document.getElementById("payBtn");

  if (!payBtn) return;

  payBtn.addEventListener("click", () => {
    showToast("Processing payment...", "info");

    setTimeout(() => {
      showToast("Payment successful!", "success");

      // clear cart
      localStorage.removeItem("cart");

      setTimeout(() => {
        window.location.href = "success.html";
      }, 800);
    }, 1500);
  });
});


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