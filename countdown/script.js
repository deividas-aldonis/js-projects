const container = document.getElementById("container");
let timerId;

// Validation functions
function validateDate(date) {
  const [year, month, day] = date
    .split("-")
    .map((datePart) => parseInt(datePart));

  const distance = new Date(year, month - 1, day, 5, 13, 20, 0) - Date.now();

  if (distance < 0) {
    return {
      error: true,
    };
  }

  return {
    error: false,
    distance,
  };
}

function validateTitle(title) {
  return title.trim().length > 0;
}
// Timer functions

function addTimer(distance) {
  timerId = setInterval(() => {
    if (distance < 0) {
      // Add validation
      clearInterval(timerId);
      return;
    }

    let s = Math.floor(distance / 1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);
    let d = Math.floor(h / 24);
    s %= 60;
    m %= 60;
    h %= 24;

    document.getElementById("time-unit-days").textContent = d;
    document.getElementById("time-unit-hours").textContent = h;
    document.getElementById("time-unit-minutes").textContent = m;
    document.getElementById("time-unit-seconds").textContent = s;
    distance -= 1000;
  }, 1000);
}

// Form handling, DOM
function submitForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const title = formData.get("title");
  const date = formData.get("date");

  // Validate form inputs
  // Title is optional
  // const isTitleValid = validateTitle(title);
  const { error, distance } = validateDate(date);

  if (!error) {
    addTemplateToDOM("countdown-timer-template");
    addTimer(distance);
  } else {
    // Throw error
    console.error("invalid date");
  }
}

function reset() {
  // reset counter
  clearInterval(timerId);
  addTemplateToDOM();
}

function addTemplateToDOM(templateName = "countdown-form-template") {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  const temp = document.getElementById(templateName);
  const clone = temp.content.cloneNode(true);
  container.appendChild(clone);

  if (templateName === "countdown-form-template") {
    document
      .getElementById("countdown-form")
      .addEventListener("submit", submitForm);
  } else {
    document.getElementById("reset-btn").addEventListener("click", reset);
  }
}

(function () {
  addTemplateToDOM();
})();
