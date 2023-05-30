const themeIcon = document.getElementById("theme-icon");

function toggleTheme() {
  const previousTheme =
    document.documentElement.getAttribute("data-theme") || "light";
  const currentTheme = previousTheme === "light" ? "dark" : "light";
  setTheme(currentTheme);
}

function setTheme(currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "light") {
    themeIcon.src = "images/moon.svg";
  } else {
    themeIcon.src = "images/sun.svg";
  }
  themeIcon.classList.remove("hidden");
  saveTheme(currentTheme);
}

function saveTheme(currentTheme) {
  localStorage.setItem("theme", currentTheme);
}
function getTheme() {
  return localStorage.getItem("theme");
}

themeIcon.addEventListener("click", toggleTheme);

window.onload = () => {
  // Check if theme was saved in localStorage.
  const theme = getTheme();
  if (!theme) {
    // Check users preferred theme
    const prefDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    prefDark ? setTheme("dark") : setTheme("light");
  }
  // If user has saved theme in localStorage
  else {
    setTheme(theme);
  }
};
