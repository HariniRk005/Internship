document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const loginLink = document.getElementById("login-link");
  const profileLink = document.getElementById("profile-link");
  const logoutLink = document.getElementById("logout-link");

  if (isLoggedIn === "true") {
    if (loginLink) loginLink.style.display = "none";
    if (profileLink) profileLink.style.display = "inline-block";
    if (logoutLink) logoutLink.style.display = "inline-block";
  }
});

function logoutUser() {
  localStorage.removeItem("isLoggedIn");
  showToast("Logged out successfully", "success");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.className = ""; // reset
  toast.classList.add("show", type);

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}
