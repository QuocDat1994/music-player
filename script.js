const PLAYER = document.querySelector("#player");

const COVER = document.querySelector("#cover");
const AUDIO = document.querySelector("#audio");
const SONG_NAME = document.querySelector("#song-name");
const SONG_SINGER = document.querySelector("#song-singer");

const DURATION_START = document.querySelector("#duration-start");
const DURATION_END = document.querySelector("#duration-end");
const PROGRESS = document.querySelector("#progress");
const STATUS = document.querySelector("#status");

const PLAY_BTN = document.querySelector("#play-btn");
const PREV_BTN = document.querySelector("#prev-btn");
const NEXT_BTN = document.querySelector("#next-btn");

const songList = [
  "A Thousand Years - Christina Perri",
  "Can't Help Falling In Love - Boyce Avenue",
  "Make You Feel My Love - Sleeping At Last",
];

let songIndex = 2;
loadSong(songList[songIndex]);

function loadSong(song) {
  const [name, singer] = song.split(" - ");

  COVER.src = `images/${song}.jpg`;
  AUDIO.src = `mp3/${song}.mp3`;
  SONG_NAME.innerText = name;
  SONG_SINGER.innerText = singer;
}

function playSong() {
  PLAYER.classList.add("active");
  audio.play();
}

function pauseSong() {
  PLAYER.classList.remove("active");
  audio.pause();
}

function nextSong() {
  if (songIndex >= songList.length - 1) {
    songIndex = 0;
    return;
  }
  songIndex++;
}

function prevSong() {
  if (songIndex <= 0) {
    songIndex = songList.length - 1;
    return;
  }
  songIndex--;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function updateProgressBar() {
  PROGRESS.value = parseInt(AUDIO.currentTime);
  DURATION_START.innerText = getAudioDuration(AUDIO.currentTime);
}

function getAudioDuration(duration) {
  let mins = Math.floor(parseInt(duration) / 60).toString();
  let secs = (parseInt(duration) - 60 * mins).toString();

  mins = mins.length === 1 ? `0${mins}` : mins;
  secs = secs.length === 1 ? `0${secs}` : secs;

  return `${mins}:${secs}`;
}

PROGRESS.addEventListener("click", setProgress);

AUDIO.addEventListener("timeupdate", updateProgressBar);

AUDIO.addEventListener("ended", () => {
  PREV_BTN.click();
});

AUDIO.addEventListener("loadedmetadata", () => {
  DURATION_START.innerText = "00:00";
  DURATION_END.innerText = getAudioDuration(AUDIO.duration);
  PROGRESS.value = 0;
  PROGRESS.max = parseInt(AUDIO.duration);
});

PLAY_BTN.addEventListener("click", (e) => {
  if (PLAYER.classList.contains("active")) {
    pauseSong();
    return;
  }

  playSong();
});

PREV_BTN.addEventListener("click", (e) => {
  prevSong();
  loadSong(songList[songIndex]);
  playSong();
});

NEXT_BTN.addEventListener("click", (e) => {
  nextSong();
  loadSong(songList[songIndex]);
  playSong();
});
