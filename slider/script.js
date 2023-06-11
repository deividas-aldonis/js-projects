const sliderContainer = document.getElementById("slider-container");
const slider = document.getElementById("slider");

const SLIDER_PADDING = 20;

let ready = false;
let animationID = null;
let previousPosition = 0;
let startingPosition = 0;
let currentTranslate = 0;

function setSlider() {
  slider.style.transform = `translateX(${-currentTranslate}px)`;
  if (ready) requestAnimationFrame(setSlider);
}

function checkSliderPosition() {
  const sliderWidth = slider.offsetWidth;
  const sliderScrollWidth = slider.scrollWidth + SLIDER_PADDING - sliderWidth;

  if (currentTranslate < 0) currentTranslate = 0;
  if (currentTranslate > sliderScrollWidth) currentTranslate = sliderScrollWidth;

  previousPosition = currentTranslate;
  setSlider();
}

function pointerDown({ pointerId, clientX }) {
  sliderContainer.setPointerCapture(pointerId);
  animationID = requestAnimationFrame(setSlider);
  ready = true;
  startingPosition = clientX;
}

function pointerMove({ clientX }) {
  if (!ready) return;

  const currentPosition = clientX;
  currentTranslate = previousPosition + (startingPosition - currentPosition);
}

function pointerUp() {
  cancelAnimationFrame(animationID);
  checkSliderPosition();
  ready = false;
}

new ResizeObserver(checkSliderPosition).observe(slider);

sliderContainer.addEventListener("pointerdown", pointerDown);
sliderContainer.addEventListener("pointermove", pointerMove);
sliderContainer.addEventListener("pointerup", pointerUp);
