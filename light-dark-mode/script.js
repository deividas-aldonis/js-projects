const themeIcon = document.getElementById("theme-icon");

function toggleTheme() {
  const previousTheme = getTheme();
  const currentTheme = previousTheme === "light" ? "dark" : "light";
  setTheme(currentTheme);
}

function setTheme(currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  setIcon(currentTheme);
  saveTheme(currentTheme);
}

function saveTheme(currentTheme) {
  localStorage.setItem("theme", currentTheme);
}

function getTheme() {
  const theme = document.documentElement.getAttribute("data-theme");

  if (theme === "light" || theme === "dark") return theme;

  const prefDarkTheme = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  return prefDarkTheme ? "dark" : "light";
}

function setIcon(theme) {
  if (theme === "light") {
    themeIcon.src = "images/moon.svg";
  } else {
    themeIcon.src = "images/sun.svg";
  }

  themeIcon.classList.remove("hidden");
}

themeIcon.addEventListener("click", toggleTheme);

window.addEventListener("load", () => {
  setIcon(getTheme());
});
