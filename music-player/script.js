const songImage = document.querySelector(".song-image");
const songName = document.querySelector(".song-name");
const songArtist = document.querySelector(".song-artist");
const song = document.querySelector(".song");
const songTimeGoing = document.querySelector(".song-time-going");
const songTimeLeft = document.querySelector(".song-time-left");
const playBtn = document.querySelector(".play-btn");
const pauseBtn = document.querySelector(".pause-btn");
const sliderContainer = document.querySelector(".slider-container");
const slider = document.querySelector(".slider");

const songs = [
  {
    name: "Another One Bites The Dust",
    artist: "Queen",
    imageSrc: "images/another-one-bites-the-dust.jpg",
    songSrc: "music/Another One Bites The Dust.mp3",
  },
  {
    name: "Drive My Car",
    artist: "The Beatles",
    imageSrc: "images/drive-my-car.jpg",
    songSrc: "music/Drive My Car.mp3",
  },
  {
    name: "Life is a Highway",
    artist: "Rascal Flatts",
    imageSrc: "images/life-is-a-highway.jpg",
    songSrc: "music/Life is a Highway.mp3",
  },
];

let currentSong = 2;

function displaySong() {
  const { name, artist, imageSrc } = songs[currentSong];
  songImage.src = imageSrc;
  songName.textContent = name;
  songArtist.textContent = artist;
}

function formatTime(time) {
  return time.toString().padStart(2, "0");
}

function setTime(el, minutes, seconds) {
  el.textContent = `${minutes}:${seconds}`;
}

function setSlider(width) {
  slider.style.width = width + "%";
}

song.addEventListener("timeupdate", function () {
  const duration = parseInt(song.duration);
  const currentTime = parseInt(song.currentTime);
  const timeLeft = duration - currentTime;

  // Time left
  const timeLeftSeconds = formatTime(timeLeft % 60);
  const timeLeftMinutes = formatTime(parseInt(timeLeft / 60));
  setTime(songTimeLeft, timeLeftMinutes, timeLeftSeconds);

  // Time going
  const timeGoingSeconds = formatTime(currentTime % 60);
  const timeGoingMinutes = formatTime(parseInt(currentTime / 60));
  setTime(songTimeGoing, timeGoingMinutes, timeGoingSeconds);

  // Set slider
  const sliderWidth = (currentTime * 100) / duration;
  setSlider(sliderWidth);
});

playBtn.addEventListener("click", () => {
  song.play();
  playBtn.hidden = true;
  pauseBtn.hidden = false;
});

pauseBtn.addEventListener("click", () => {
  song.pause();
  playBtn.hidden = false;
  pauseBtn.hidden = true;
});

sliderContainer.addEventListener("click", (e) => {
  const elementWidth = e.currentTarget.getBoundingClientRect().width;
  const clickX = e.offsetX;
  const songDuration = song.duration;

  song.currentTime = (clickX / elementWidth) * songDuration;

  const sliderWidth = clickX / elementWidth;
  setSlider(sliderWidth);
});

displaySong();
