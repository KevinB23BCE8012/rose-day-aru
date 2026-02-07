/* ================= CONFIG ================= */
const PASSWORD = "roseforaruu";

/* ================= ELEMENTS ================= */
const audio = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
const sections = document.querySelectorAll(".section");
const passInput = document.getElementById("pass");
const errorText = document.getElementById("error");

let isPlaying = false;
let emojisStarted = false;

/* ================= MUSIC CONTROL ================= */
function toggleMusic() {
  if (!isPlaying) {
    audio.volume = 1.0;
    audio.play();
    musicBtn.innerText = "🔇 Pause Music";
    isPlaying = true;
  } else {
    audio.pause();
    musicBtn.innerText = "🔊 Play Music";
    isPlaying = false;
  }
}

/* ================= PAGE CONTROL ================= */
function showPage(id) {
  sections.forEach(section => section.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
}

function nextPage(n) {
  showPage("page" + n);
}

/* ================= UNLOCK ================= */
function unlock() {
  if (passInput.value !== PASSWORD) {
    errorText.innerText = "That isn’t our word 🤍";
    return;
  }

  errorText.innerText = "";

  /* Start music on first interaction */
  if (!isPlaying) {
    audio.volume = 1.0;
    audio.play();
    isPlaying = true;
    musicBtn.innerText = "🔇 Pause Music";
  }

  /* Start emoji animation once */
  if (!emojisStarted) {
    startEmojis();
    emojisStarted = true;
  }

  showPage("page1");
}

/* ================= EMOJI FALL ================= */
function startEmojis() {
  const symbols = ["🌹", "💖", "💞", "💗"];
  setInterval(() => {
    const e = document.createElement("div");
    e.className = "emoji";
    e.innerText = symbols[Math.floor(Math.random() * symbols.length)];

    e.style.left = Math.random() * 100 + "vw";
    e.style.fontSize = (16 + Math.random() * 14) + "px";
    e.style.animationDuration = (20 + Math.random() * 12) + "s";

    document.body.appendChild(e);

    setTimeout(() => {
      e.remove();
    }, 35000);
  }, 3000); // very slow, cinematic pace
}

/* ================= SAFETY ================= */
audio.loop = true;

/* Resume music if tab is refocused */
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && isPlaying) {
    audio.play();
  }
});
