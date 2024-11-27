/* Wybór elementów z dokumentu HTML */
const video = document.querySelector('.video-element'); // Wybiera element video
const playButton = document.querySelector('.play-button'); // Wybiera przycisk odtwarzania
const fullscreenButton = document.querySelector('.fullscreen-button'); // Wybiera przycisk pełnoekranowy
const timeDisplay = document.querySelector('.current-time'); // Wybiera element wyświetlający aktualny czas
const progressBar = document.querySelector('.progress-line'); // Wybiera linię postępu
const progressBarContainer = document.querySelector('.progress-bar'); // Wybiera kontener paska postępu
const volumeSlider = document.querySelector('.volume-slider'); // Wybiera suwak głośności
const volumeMute = document.querySelector('.volume-mute'); // Wybiera przycisk wyciszenia

/* Ustawienie głośności za pomocą suwaka */
volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value; // Ustawienie głośności filmu na wartość suwaka
});

/* Włączanie/wyłączanie dźwięku */
volumeMute.addEventListener('click', () => {
    if (video.volume !== 0) {
        video.volume = 0; // Wyciszenie dźwięku
        volumeSlider.value = 0; // Ustawienie suwaka na 0
    } else {
        video.volume = 0.5; // Ustawienie głośności na 50%
        volumeSlider.value = 0.5; // Ustawienie suwaka na 50%
    }
});

/* Przełączanie odtwarzania i pauzy */
const togglePlay = () => {
    if (video.paused) {
        video.play(); // Odtwarzanie filmu
        playButton.innerHTML = '<i class="fa-solid fa-pause"></i>'; // Zmiana ikony na pauzę
    } else {
        video.pause(); // Pauzowanie filmu
        playButton.innerHTML = '<i class="fa-solid fa-play"></i>'; // Zmiana ikony na odtwarzanie
    }
}

/* Przełączanie trybu pełnoekranowego */
const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        video.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`); // Wyświetlenie błędu, jeśli nie można uruchomić trybu pełnoekranowego
        });
    } else {
        document.exitFullscreen(); // Wyjście z trybu pełnoekranowego
    }
}

/* Aktualizacja paska postępu */
const updateProgressBar = () => {
    const percentage = (video.currentTime / video.duration) * 100; // Obliczenie procentu postępu filmu
    progressBar.style.width = `${percentage}%`; // Ustawienie szerokości paska postępu
}

/* Wyświetlanie aktualnego czasu */
const displayTime = () => {
    const minutes = Math.floor(video.currentTime / 60); // Obliczenie minut
    const seconds = Math.floor(video.currentTime % 60); // Obliczenie sekund
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Formatowanie i wyświetlanie czasu
}

/* Szukanie w filmie */
const seekVideo = (event) => {
    const progressBarRect = progressBarContainer.getBoundingClientRect(); // Pobranie pozycji paska postępu
    const offsetX = event.clientX - progressBarRect.left; // Obliczenie przesunięcia myszy
    const percentage = offsetX / progressBarRect.width; // Obliczenie procentu przesunięcia
    video.currentTime = percentage * video.duration; // Ustawienie czasu filmu
}

/* Dodanie nasłuchiwaczy zdarzeń */
video.addEventListener('timeupdate', () => {
    updateProgressBar(); // Aktualizacja paska postępu
    displayTime(); // Aktualizacja wyświetlanego czasu
});

playButton.addEventListener('click', togglePlay); // Przełącznik odtwarzania/pauzy

progressBarContainer.addEventListener('click', seekVideo); // Szukanie w filmie

video.addEventListener('loadedmetadata', () => {
    displayTime(); // Aktualizacja czasu na początku
});








