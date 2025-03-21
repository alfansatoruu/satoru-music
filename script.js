const playlistItems = document.querySelectorAll(".playlist-item");
const likeBtns = document.querySelectorAll(".like-btn");
const audioPlayer = document.getElementById("audioPlayer");
const volumeRange = document.getElementById("volume-range");
const progressBar = document.getElementById("progress-bar");
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseIcon = document.getElementById("playPauseIcon");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");

let currentSongIndex = 2;
let isSongLoaded = false;

const songs = [
  "Charlie Puth Ft Selena Gomez - we don't talk anymore (tiktok version) [PMmX3hNf3c8].mp3",
  "Lana Del Rey - Dark Paradise.mp3",
  "Lana Del Rey - Diet Mountain Dew.mp3",
  "Ariana Grande & Social House - boyfriend (AUDIO) [nA862JDEoKs].mp3",
  "Ariana_Grande_-_Stuck_with_U_(Lyrics)_ft._Justin_Bieber_[_YouConvert.net_].mp3",
  "Ariana_Grande,_Ginuwine_-_Bloodline_X_Pony_(TikTok_Mashup)_[Lyrics]_[_YouConvert.net_].mp3",
  "Metro_Boomin,_The_Weeknd,_21_Savage_-_Creepin_[_YouConvert.net_].mp3",
  "The Weeknd, Ariana Grande - Die For You.mp3",
  "until i found you - stephen sanchez.mp3",
  "Doja Cat x The Weeknd x Lana Del Rey - Streets One Of The Girls White Mustang.mp3",
];

var swiper = new Swiper(".swiper", {
  effect: "cards",
  cardsEffect: {
    perSlideOffset: 9,
    perSlideRotate: 3,
  },
  grabCursor: true,
  speed: 700,
  initialSlide: 2,
});

swiper.on("slideChange", () => {
  const newIndex = swiper.realIndex;
  if (newIndex !== currentSongIndex) {
    currentSongIndex = newIndex;
    loadAndPlaySong(currentSongIndex);
    updatePlayPauseIcon(true);
  }
});

function updateSwiperToMatchSong(index) {
  if (swiper.activeIndex !== index) {
    swiper.slideTo(index);
  }
}

function updatePlaylistHighlight(index) {
  playlistItems.forEach((item, i) => {
    if (i === index) {
      item.classList.add("active-playlist-item");
    } else {
      item.classList.remove("active-playlist-item");
    }
  });
}

function loadAndPlaySong(index) {
  audioPlayer.src = songs[index];
  playSong();
  updatePlaylistHighlight(index);
  updateSwiperToMatchSong(index);
  isSongLoaded = true;
}

function pauseSong() {
  audioPlayer.pause();
  updatePlayPauseIcon(false);
}

function playSong() {
  audioPlayer.play();
  updatePlayPauseIcon(true);
}

function togglePlayPause() {
  if (!isSongLoaded) {
    loadAndPlaySong(currentSongIndex);
    isSongLoaded = true;
  } else if (audioPlayer.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function updatePlayPauseIcon(isPlaying) {
  if (isPlaying) {
    playPauseIcon.classList.add("fa-pause");
    playPauseIcon.classList.remove("fa-play");
  } else {
    playPauseIcon.classList.add("fa-play");
    playPauseIcon.classList.remove("fa-pause");
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadAndPlaySong(currentSongIndex);
  swiper.slideTo(currentSongIndex);
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadAndPlaySong(currentSongIndex);
  swiper.slideTo(currentSongIndex);
}

playlistItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentSongIndex = index;
    loadAndPlaySong(index);
  });
});

playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audioPlayer.addEventListener("loadedmetadata", () => {
  progressBar.max = audioPlayer.duration;
  progressBar.value = audioPlayer.currentTime;
});

audioPlayer.addEventListener("timeupdate", () => {
  if (!audioPlayer.paused) {
    progressBar.value = audioPlayer.currentTime;
  }
});

progressBar.addEventListener("input", () => {
  audioPlayer.currentTime = progressBar.value;
});

progressBar.addEventListener("change", () => {
  playSong();
});

volumeRange.addEventListener("input", () => {
  var newVolume = volumeRange.value;
  audioPlayer.volume = newVolume / 100;
});

audioPlayer.addEventListener("ended", nextSong);

shuffleBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * songs.length);

  if (randomIndex !== currentSongIndex) {
    currentSongIndex = randomIndex;
    loadAndPlaySong(currentSongIndex);
  } else {
    const nextRandomIndex = (randomIndex + 1) % songs.length;
    currentSongIndex = nextRandomIndex;
    loadAndPlaySong(currentSongIndex);
  }
});

likeBtns.forEach((likeBtn) => {
  likeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    likeBtn.classList.toggle("fa-regular");
    likeBtn.classList.toggle("fa-solid");
  });
});
