const overlay = document.getElementById("page-overlay");
const loader = document.getElementById("loader");

const loaderKeyframes = [
  {
    transform: "scale(0)",
    opacity: "0",
  },
  {
    offset: 0.1,
    transform: "scale(0.2)",
    opacity: "0.5",
  },
  {
    offset: 0.2,
    transform: "scale(0.4)",
    opacity: "1",
  },
  {
    offset: 0.4,
    transform: "scale(0.6)",
    opacity: "1",
  },
  {
    transform: "scale(1)",
    opacity: "1",
  },
];

const loaderOptions = {
  duration: 250,
  fill: "forwards",
  easing: "cubic-bezier(0.76, 0, 1, 1)",
};

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

await loader.animate(loaderKeyframes, loaderOptions).finished;
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
