document.addEventListener("DOMContentLoaded", () => {

  /* ================= TOAST ================= */
  window.showToast = function (message, type = "success") {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.className = "";
    toast.classList.add("show", type);

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  };

  /* ================= SIGNUP ================= */
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", e => {
      e.preventDefault();

      const user = {
        name: document.getElementById("signupName").value,
        email: document.getElementById("signupEmail").value,
        password: document.getElementById("signupPassword").value
      };

      localStorage.setItem("user", JSON.stringify(user));

      showToast("Signup successful! Please login", "success");

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    });
  }

  /* ================= LOGIN ================= */
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || user.email !== email || user.password !== password) {
        showToast("Invalid email or password", "error");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");

      showToast("Logged in successfully!", "success");

      setTimeout(() => {
        window.location.href = "profile.html";
      }, 1500);
    });
  }

  /* ================= PROFILE PAGE ================= */
  const accountName = document.getElementById("accountName");
  const accountEmail = document.getElementById("accountEmail");

  if (accountName && accountEmail) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!isLoggedIn || !user) {
      window.location.href = "login.html";
      return;
    }

    accountName.textContent = user.name;
    accountEmail.textContent = user.email;
  }

  /* ================= HEADER STATE ================= */
  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-link");
  const profileLink = document.getElementById("profile-link");

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (loginLink && logoutLink && profileLink) {
    if (isLoggedIn) {
      loginLink.style.display = "none";
      logoutLink.style.display = "inline";
      profileLink.style.display = "inline";
    } else {
      loginLink.style.display = "inline";
      logoutLink.style.display = "none";
      profileLink.style.display = "none";
    }
  }
});

/* ================= LOGOUT ================= */
function logoutUser() {
  localStorage.removeItem("isLoggedIn");

  showToast("Logged out successfully", "success");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}



