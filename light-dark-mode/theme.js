(function () {
  // Check if theme was saved in localStorage.
  const theme = localStorage.getItem("theme");
  // If there's no theme in localStorage
  if (!theme) {
    // Check users preferred theme
    const prefDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    prefDark ? setTheme("dark") : setTheme("light");
  }
  // If user has saved theme in localStorage
  else if (theme) {
    // Check if theme name is "light" or "dark"
    if (theme === "dark" || "light") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    // Some kind of error, theme name should be "light" or "dark"
    else {
      const prefDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      prefDark ? setTheme("dark") : setTheme("light");
    }
  }
})();
