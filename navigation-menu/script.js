const menuBtn = document.querySelector(".menu-btn");

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  menuBtn.classList.toggle("open");
}
