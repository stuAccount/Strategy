function toggleMenu() {
  const overlay = document.getElementById("global-nav-submenu-overlay");
  overlay.style.display = overlay.style.display === "block" ? "none" : "block";
}

function setupGlobalNavSubmenu() {
  document.querySelector(".menu-btn").addEventListener("click", toggleMenu);
  document.querySelector(".close-btn").addEventListener("click", toggleMenu);
}
