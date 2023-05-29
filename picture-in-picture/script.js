const video = document.getElementById("video");
const errorMessage = document.getElementById("error");
const startCaptureBtn = document.getElementById("start-capture-btn");
const stopCaptureBtn = document.getElementById("stop-capture-btn");

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

    console.error("");
  } catch (error) {
    console.error(error);
  }
});

stopCaptureBtn.addEventListener("click", () => {
  if (!video.srcObject) return;

  let tracks = video.srcObject.getTracks();
  tracks.forEach((track) => track.stop());
  video.srcObject = null;
});
