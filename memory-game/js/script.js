import { animationFinish } from "./animations.js";

const isAnimationFinished = async () => {
  const isDone = await animationFinish();
  console.log(isDone);
};
isAnimationFinished();
