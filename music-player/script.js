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
const previousSongBtn = document.querySelector(".previous-btn");
const nextSongBtn = document.querySelector(".next-btn");

const songs = [
  {
    name: "Another One Bites The Dust",
    artist: "Queen",
    imageSrc: "images/another-one-bites-the-dust.jpg",
    songSrc: "music/another-one-bites-the-dust.mp3",
  },
  {
    name: "Drive My Car",
    artist: "The Beatles",
    imageSrc: "images/drive-my-car.jpg",
    songSrc: "music/drive-my-car.mp3",
  },
  {
    name: "Life is a Highway",
    artist: "Rascal Flatts",
    imageSrc: "images/life-is-a-highway.jpg",
    songSrc: "music/life-is-a-highway.mp3",
  },
];

let currentSong = 0;

function displaySong() {
  const { name, artist, imageSrc } = songs[currentSong];
  songImage.src = imageSrc;
  songName.textContent = name;
  songArtist.textContent = artist;

  const songDuration = parseInt(song.duration);

  const minutes = formatTime(parseInt(songDuration / 60));
  const seconds = formatTime(songDuration % 60);
  setTime(songTimeGoing, "00", "00");
  setTime(songTimeLeft, minutes, seconds);
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

function hidePlayBtn() {
  playBtn.hidden = true;
  pauseBtn.hidden = false;
}

function hidePauseBtn() {
  playBtn.hidden = false;
  pauseBtn.hidden = true;
}

song.addEventListener("loadedmetadata", (e) => {
  displaySong();
});

song.addEventListener("timeupdate", async function (e) {
  const duration = parseInt(song.duration);
  if (!duration) return;

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

  const sliderWidth = (currentTime * 100) / duration;
  setSlider(sliderWidth);
});

playBtn.addEventListener("click", () => {
  song.play();
  hidePlayBtn();
});

pauseBtn.addEventListener("click", () => {
  song.pause();
  hidePauseBtn();
});

previousSongBtn.addEventListener("click", () => {
  if (currentSong === 0) {
    currentSong = songs.length - 1;
  } else {
    currentSong--;
  }

  song.src = songs[currentSong].songSrc;
  setSlider(0);
  hidePauseBtn();
});

nextSongBtn.addEventListener("click", () => {
  if (currentSong === songs.length - 1) {
    currentSong = 0;
  } else {
    currentSong++;
  }

  song.src = songs[currentSong].songSrc;
  setSlider(0);
  hidePauseBtn();
});

sliderContainer.addEventListener("click", (e) => {
  const elementWidth = e.currentTarget.getBoundingClientRect().width;
  const clickX = e.offsetX;
  const songDuration = song.duration;

  song.currentTime = (clickX / elementWidth) * songDuration;

  const sliderWidth = clickX / elementWidth;
  setSlider(sliderWidth);
});
