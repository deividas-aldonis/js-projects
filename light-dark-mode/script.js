const themeIcon = document.getElementById("theme-icon");

themeIcon.addEventListener("click", toggleTheme);

function toggleTheme() {
  const previousTheme = getTheme();
  const currentTheme = previousTheme === "light" ? "dark" : "light";
  setTheme(currentTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  setIcon(theme);
  localStorage.setItem("theme", theme);
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
  const iconPath = `images/${theme === "light" ? "moon" : "sun"}.svg`;
  themeIcon.src = iconPath;
  themeIcon.classList.remove("hidden");
}

setIcon(getTheme());
