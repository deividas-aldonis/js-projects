const overlay = document.getElementById("page-overlay");

const getKeyframes = (translateX) => {
  return {
    transform: `translateX(${translateX}%)`,
  };
};

const getOptions = (delay) => {
  return {
    delay,
    duration: 500,
    fill: "forwards",
    easing: "cubic-bezier(0.76, 0, 1, 1)",
  };
};

const overlayAnimation = overlay.animate(getKeyframes(0), getOptions(1250));

export const animationFinish = async () => {
  return new Promise((resolve, reject) => {
    overlayAnimation.addEventListener("finish", async () => {
      document.getElementById("loader").hidden = true;
      document.getElementById("app").hidden = false;

      await overlay.animate(getKeyframes(-100), getOptions(500)).finished;
      resolve(true);
    });
  });
};
