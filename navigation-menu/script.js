const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");

function toggleMenu() {
  menuBtn.classList.toggle("open");
  menu.classList.toggle("animate");
}

menuBtn.addEventListener("click", toggleMenu);
