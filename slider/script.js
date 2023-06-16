const sliderContainer = document.getElementById("slider-container");
const slider = document.getElementById("slider");

const MAX_DRAG = 150;

let dragging = false;
let animationId = null;
let currentTranslate = 0;
let previousPosition = 0;
let startingPosition = 0;
let prevDirection = null;
let currentDirection = null;
let direction = null;
let currentSpeed = 0;
let prevEvent = null;
let currentEvent = null;

sliderContainer.addEventListener("pointerdown", pointerDown);

function pointerDown(e) {
  sliderContainer.addEventListener("pointermove", pointerMove);
  sliderContainer.addEventListener("pointerup", pointerUp);
  sliderContainer.setPointerCapture(e.pointerId);
  sliderContainer.style.cursor = "grabbing";
  slider.style.transition = "0.1s";

  dragging = true;
  startingPosition = e.clientX;
  animationId = requestAnimationFrame(dragged);
}

function pointerMove(e) {
  if (!dragging) return;

  currentDirection = e.clientX;
  currentEvent = e;

  if (prevDirection === null) prevDirection = startingPosition;

  if (currentDirection > prevDirection) {
    direction = "left";
  }

  if (currentDirection < prevDirection) {
    direction = "right";
  }

  prevDirection = currentDirection;

  const currentPosition = e.clientX;
  currentTranslate = previousPosition + (startingPosition - currentPosition);
}

function pointerUp(e) {
  sliderContainer.removeEventListener("pointermove", pointerMove);
  sliderContainer.removeEventListener("pointerup", pointerUp);
  cancelAnimationFrame(animationId);
  sliderContainer.releasePointerCapture(e.pointerId);
  dragging = false;

  if (currentSpeed > 0) {
    if (direction === "right") {
      currentTranslate += currentSpeed;
    }
    if (direction === "left") {
      currentTranslate -= currentSpeed;
    }
  }

  const sliderWidth = computeSliderWidth();

  if (currentTranslate > sliderWidth) currentTranslate = sliderWidth;
  if (currentTranslate < 0) currentTranslate = 0;

  previousPosition = currentTranslate;

  slider.style.transition = "all .5s cubic-bezier(0.25,0.46,0.45,0.94)";
  slider.style.transform = `translateX(${-currentTranslate}px)`;
  sliderContainer.style.cursor = "grab";
}

function dragged() {
  const sliderWidth = computeSliderWidth();
  if (
    currentTranslate < sliderWidth + MAX_DRAG &&
    currentTranslate > 0 - MAX_DRAG
  ) {
    slider.style.transform = `translateX(${-currentTranslate}px)`;
  }
  if (dragging) animationId = requestAnimationFrame(dragged);
  getSpeed();
}

function computeSliderWidth() {
  const style = getComputedStyle(slider);
  const width = parseInt(style.width);
  const padding = parseInt(style.padding);
  const totalWidth = slider.scrollWidth;
  return totalWidth - width + padding;
}

function getSpeed() {
  if (prevEvent && currentEvent) {
    const movementX = Math.abs(currentEvent.screenX - prevEvent.screenX);
    const movementY = Math.abs(currentEvent.screenY - prevEvent.screenY);
    const movement = Math.sqrt(movementX * movementX + movementY * movementY);
    currentSpeed = 10 * movement;
  }

  prevEvent = currentEvent;
  prevSpeed = currentSpeed;
}
