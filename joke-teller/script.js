const jokeBtn = document.getElementById("joke-btn");
let synth;

const apiUrl = "https://backend-omega-seven.vercel.app/api/getjoke";
let voices = [];

// Check if the browser supports Speech Synthesis API
if ("speechSynthesis" in window) {
  synth = window.speechSynthesis;
  jokeBtn.addEventListener("click", getJoke);
  // Init voice list on load.
  populateVoiceList();
} else {
  jokeBtn.textContent =
    "Sorry, Speech Synthesis isn't supported on your device/browser";
}

function voiceListPromise() {
  return new Promise(function (resolve, reject) {
    let id;

    id = setInterval(() => {
      if (synth.getVoices().length !== 0) {
        resolve(synth.getVoices());
        clearInterval(id);
      }
    }, 10);
  });
}
// When the page loads, it takes some amount of time to populate voices
async function populateVoiceList() {
  voices = await voiceListPromise();
  console.log(voices);
}

async function getJoke() {
  jokeBtn.disabled = true;

  const url = new URL(apiUrl);
  const request = new Request(url);

  try {
    const res = await fetch(request);
    if (!res.ok) throw new Error("invalid");

    const joke = await res.json();
    tellJoke(joke[0]);
  } catch (error) {
    console.error(error);
  }
}

function tellJoke({ question, punchline }) {
  // Init new SpeechSynthesisUtterance, configure voice.
  let q = addVoice(question);
  let p = addVoice(punchline);
  // Add a timer for the punchline.
  q.addEventListener("end", () => {
    setTimeout(() => {
      synth.speak(p);
    }, 600);
  });
  // Remove the disabled attribute so that the user could
  // request another joke after its done.
  p.addEventListener("end", () => (jokeBtn.disabled = false));

  synth.speak(q);
}

function addVoice(jokePart) {
  const speechSynthesis = new SpeechSynthesisUtterance(jokePart);
  speechSynthesis.voice = voices[6];
  return speechSynthesis;
}
