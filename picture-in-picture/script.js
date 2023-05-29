const video = document.getElementById("video");
const errorMessage = document.getElementById("error");
const startCaptureBtn = document.getElementById("start-capture-btn");
const stopCaptureBtn = document.getElementById("stop-capture-btn");
const pipBtn = document.getElementById("pip-btn");

console.error = (error) => (errorMessage.textContent = error);

const displayMediaOptions = {
  video: {
    displaySurface: "window",
  },
  audio: false,
};

startCaptureBtn.addEventListener("click", async () => {
  try {
    video.srcObject = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );

    stopCaptureBtn.disabled = false;
    pipBtn.disabled = false;
    console.error("");
  } catch (error) {
    console.error(error);
  }
});

stopCaptureBtn.addEventListener("click", () => {
  let tracks = video.srcObject.getTracks();
  tracks.forEach((track) => track.stop());
  video.srcObject = null;

  stopCaptureBtn.disabled = true;
  pipBtn.disabled = true;
  console.error("");
});

pipBtn.addEventListener("click", async () => {
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await video.requestPictureInPicture();
    }
    console.error("");
  } catch (error) {
    console.error(error);
  }
});
