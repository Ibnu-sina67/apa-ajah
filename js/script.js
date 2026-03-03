// toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// menu
document.querySelector("#h-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// hilang nav
const menu = document.querySelector("#h-menu");

document.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});
