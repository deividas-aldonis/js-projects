const container = document.getElementById("container");
let timerId;

function addTimer(distance, title) {
  const days = document.getElementById("time-unit-days");
  const hours = document.getElementById("time-unit-hours");
  const minutes = document.getElementById("time-unit-minutes");
  const seconds = document.getElementById("time-unit-seconds");

  if (distance < 0) {
    clearInterval(timerId);
    alert("Countdown finished");
    return;
  }

  let s = Math.floor(distance / 1000);
  let m = Math.floor(s / 60);
  let h = Math.floor(m / 60);
  let d = Math.floor(h / 24);
  s %= 60;
  m %= 60;
  h %= 24;

  days.textContent = d;
  hours.textContent = h;
  minutes.textContent = m;
  seconds.textContent = s;

  if (title.trim().length > 0) {
    document.getElementById("countdown-timer-title").textContent = title.trim();
  }

  timerId = setInterval(() => {
    distance -= 1000;

    if (distance < 0) {
      clearInterval(timerId);
      alert("Countdown finished");
      return;
    }

    let s = Math.floor(distance / 1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);
    let d = Math.floor(h / 24);
    s %= 60;
    m %= 60;
    h %= 24;

    days.textContent = d;
    hours.textContent = h;
    minutes.textContent = m;
    seconds.textContent = s;
  }, 1000);
}

function validateDate(date) {
  const [year, month, day] = date
    .split("-")
    .map((datePart) => parseInt(datePart));

  const distance = new Date(year, month - 1, day, 0, 0, 0, 0) - Date.now();

  return {
    error: distance < 0,
    distance,
  };
}

function submitForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const title = formData.get("title");
  const date = formData.get("date");

  const { error, distance } = validateDate(date);

  if (error) {
    alert("Date too low...");
    return;
  }

  addTemplateToDOM("countdown-timer-template");
  addTimer(distance, title);
}

function reset() {
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

    // set min date to date input
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const tomorrow = today.toISOString().split("T")[0];
    document.getElementById("countdown-form__date-input").min = tomorrow;
  } else {
    document.getElementById("reset-btn").addEventListener("click", reset);
  }
}

addTemplateToDOM();
