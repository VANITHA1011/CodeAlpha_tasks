const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeControl = document.getElementById('volume');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const searchBar = document.getElementById('searchBar');
const songs = document.querySelectorAll('.song');
const carousel = document.querySelector('.carousel');

let songIndex = 0;

const songList = [
    { title: "Rise Of Dragon", artist: "Leon James", src: "songs/Rise_Of_Dragon.mp3", img: "images/img1.jfif" },
    { title: "Jinguchaa", artist: "A.R.Rahman", src: "songs/Jinguchaa.mp3", img: "images/img2.jfif" },
    { title: "Hey Minnale", artist: "G.V. Prakash Kumar", src: "songs/Hey_Minnale.mp3", img: "images/img3.jfif" },
    { title: "Sawadeeka", artist: "Various", src: "songs/Sawadeeka.mp3", img: "images/img4.jfif" },
    { title: "Kutty Pattas", artist: "Various", src: "songs/Kutty_Pattas_MassTamilan.mp3", img: "images/img5.jfif" },
    { title: "Paththavaikkum", artist: "Various", src: "songs/Paththavaikkum.mp3", img: "images/img6.jfif" },
    { title: "Golden Sparrow", artist: "Various", src: "songs/Golden_Sparrow.mp3", img: "images/img7.jfif" }
];

function loadSong(index) {
    const song = songList[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.img;
    audio.src = song.src;
}

function playSong() {
    audio.play();
    playBtn.textContent = '⏸';
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = '▶';
}

playBtn.addEventListener('click', () => {
    audio.paused ? playSong() : pauseSong();
});

prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songList.length) % songList.length;
    loadSong(songIndex);
    playSong();
});

nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songList.length;
    loadSong(songIndex);
    playSong();
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
});

progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchValue = searchBar.value.toLowerCase();
        const foundIndex = songList.findIndex(song => song.title.toLowerCase() === searchValue);
        if (foundIndex !== -1) {
            songIndex = foundIndex;
            loadSong(songIndex);
            playSong();
        } else {
            alert("Song not found!");
        }
    }
});

songs.forEach((songDiv, index) => {
    songDiv.addEventListener('click', () => {
        songIndex = index;
        loadSong(songIndex);
        playSong();
    });
});

// Auto Scroll Playlist
let scrollSpeed = 1;
function autoScrollCarousel() {
    carousel.scrollLeft += scrollSpeed;
    if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
        scrollSpeed = -1;
    } else if (carousel.scrollLeft <= 0) {
        scrollSpeed = 1;
    }
    requestAnimationFrame(autoScrollCarousel);
}
autoScrollCarousel();

// Animated Music Symbols
const background = document.querySelector('.floating-background');
const symbols = ['🎵', '🎶', '♫', '🎼'];

for (let i = 0; i < 40; i++) {
  const note = document.createElement('span');
  note.classList.add('music-symbol');
  note.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  note.style.left = Math.random() * 100 + 'vw';
  note.style.top = Math.random() * 100 + 'vh';
  note.style.fontSize = (30 + Math.random() * 40) + 'px';
  note.style.animationDuration = (10 + Math.random() * 20) + 's';
  background.appendChild(note);
}

loadSong(songIndex);