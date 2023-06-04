// const form = document.getElementById("countdown-form");
// const dateInput = document.getElementById("countdown-form__date-input");
// const submitFormBtn = document.getElementById("countdown-form__btn");

// submitFormBtn.addEventListener("click", (e) => {
//   e.preventDefault();

//   const formData = new FormData(form);
//   const title = formData.get("title");
//   const date = formData.get("date");
//   console.log(date);
//   // Split the date into year, month, day.
//   const [year, month, day] = date.split("-").map((x) => parseInt(x));
//   const countDownDate = new Date(year, month - 1, day, 4, 0, 0, 0);
//   const now = new Date();
//   const distance = countDownDate - now;

//   if (distance < 0) return alert("date too small");

//   let s = Math.floor(distance / 1000);
//   let m = Math.floor(s / 60);
//   let h = Math.floor(m / 60);
//   let d = Math.floor(h / 24);
//   s %= 60;
//   m %= 60;
//   h %= 24;
//   console.log("das");
// });

// function padZero(num) {
//   return num.toString().padStart(2, "0");
// }

// function setMinDate() {
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = now.getMonth() + 1;
//   const day = now.getDate();

//   dateInput.min = `${year}-${padZero(month)}-${padZero(day)}`;
// }
// setMinDate();

const container = document.getElementById("container");

// Validation functions
function validateDate(date) {
  const [year, month, day] = date
    .split("-")
    .map((datePart) => parseInt(datePart));

  const distance = new Date(year, month - 1, day, 0, 0, 0, 0) - Date.now();
  return distance > 0;
}

function validateTitle(title) {
  return title.trim().length > 0;
}
// Timer functions

function submitForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const title = formData.get("title");
  const date = formData.get("date");

  // Validate form inputs
  // Title is optional
  const isTitleValid = validateTitle(title);
  const isDateValid = validateDate(date);

  if (isDateValid) {
    addTemplateToDOM("countdown-timer-template");
    // addTimer();
  } else {
    // Throw error
    console.error("invalid date");
  }
}

function reset() {
  // reset counter
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
addTemplateToDOM();
