let mobs = [];
mobs = setMobs();
let direction = "right"
let shipPos = 230;
let laserPos = shipPos;
var startTime, endTime, elapsedTime, timerInterval;
let speedMobs

var pseudoLabel = document.querySelector("#pseudo");
var themeLabel = document.querySelector("#theme");
var difficultyLabel = document.querySelector("#difficulty");

var pseudo = localStorage.getItem("pseudo");
var theme = localStorage.getItem("theme");
var difficulty = localStorage.getItem("difficulty");

pseudoLabel.innerHTML = `Pseudo: ${pseudo}`;
themeLabel.innerHTML = `Theme: ${theme}`;
difficultyLabel.innerHTML = `Difficulté: ${difficulty}`;

let track_name = document.querySelector(".music-title");

let playpause_btn = document.querySelector(".playpause");
let next_btn = document.querySelector(".skip-next");
let prev_btn = document.querySelector(".skip-prev");

let seek_slider = document.querySelector("#music-time");
let curr_time = document.querySelector("#timeElapsedMusic");
let total_duration = document.querySelector("#durationMusic");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
    {
        name: "Mario Galaxy",
        path: "../ressources/Attack of the Airships -  Super Mario Galaxy.mp3"
    },
    {
        name: "Space Invader",
        path: "../ressources/Teminite & MDK - Space Invaders.mp3"
    },
];

window.addEventListener(
    "keydown",
    function (e) {
        if (
            ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
                e.code
            ) > -1
        ) {
            e.preventDefault();
        }
    },
    false
);

document.body.style.background = `url("../ressources/${theme}.jpg")`

switch (difficulty) {
    case 'easy':
        speedMobs = 1300;
        break;
    case 'medium':
        speedMobs = 800;
        break;
    case 'hard':
        speedMobs = 500;
        break;
    default:
        console.log("Difficulté non reconnue.");
        break;
}



function generateGrid() {
    const grid = document.querySelectorAll(".grille")[0];
    for (let i = 0; i < 12; i++) {
        let element = document.createElement("div");
        element.setAttribute('data-left', 'true')
        grid.appendChild(element);

        for (let j = 0; j < 18; j++) {
            let element = document.createElement("div");
            grid.appendChild(element);
        }
        element = document.createElement("div");
        element.setAttribute('data-right', 'true')
        grid.appendChild(element);

    }

    addMobs();
}
function setMobs() {
    aliens = []
    /*   for (let first = 1; first < 13; first++) {
          aliens.push(first)
      }
      for (let second = 21; second < 33; second++) {
          aliens.push(second)
      }
      for (let third = 41; third < 53; third++) {
          aliens.push(third)
      } */
    aliens.push(1, 2)
    return aliens
}

function addMobs() {
    mobs.forEach(index => {
        let box = document.querySelectorAll(".grille div")[index]
        box.classList.add(theme)
    });

}

function clearMobs() {
    mobs.forEach(index => {
        let box = document.querySelectorAll(".grille div")[index]
        if (!box.getAttribute("data-right") && !box.getAttribute("data-left")) {
            box.classList.remove(theme)
        }

    })
}

function setIndexNextLine() {
    for (let i = 0; i < mobs.length; i++) {
        mobs[i] += 20
    }
}

function moveIndex() {
    let rightBoxes, leftBoxes;

    let breakRight = false;
    let breakLeft = false;
    rightBoxes = document.querySelectorAll(`div[data-right].${theme}`)
    leftBoxes = document.querySelectorAll(`div[data-left].${theme}`)

    if (direction == "right") {

        rightBoxes.forEach(element => {
            if (!breakRight) {
                direction = "left"
                setIndexNextLine();
                breakRight = true
            }
            element.classList.remove(theme)

        });
    }

    if (direction == "left") {
        leftBoxes.forEach(element => {
            if (!breakLeft) {
                direction = "right"
                setIndexNextLine();
                breakLeft = true
            }
            element.classList.remove(theme)

        });
    }

    if (direction == "right") {
        if (!breakRight && !breakLeft) {
            for (let i = 0; i < mobs.length; i++) {
                let box = document.querySelectorAll(".grille div")[mobs[i]]
                if (box.getAttribute("data-left")) {
                    box.classList.remove(theme)
                }
                mobs[i] += 1
            }
        }
    }

    if (direction == "left") {
        if (!breakLeft && !breakRight) {

            for (let i = 0; i < mobs.length; i++) {
                let box = document.querySelectorAll(".grille div")[mobs[i]]
                if (box.getAttribute("data-right")) {
                    box.classList.remove(theme)
                }
                mobs[i] -= 1
            }
        }
    }
}

// music part

function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();

    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    track_name.textContent = track_list[track_index].name;

    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
}


// Function to reset all values to their default
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}


function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    console.log("test");
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;

    // Replace icon with the pause icon
    playpause_btn.setAttribute("src", "../ressources/pause.svg")
}

function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;

    // Replace icon with the play icon
    playpause_btn.setAttribute("src", "../ressources/play.svg")
}

function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length - 1;

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);

    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
}

function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
}

function muteAudio() {
    let muteButton = document.getElementById("mute-button")
    if (curr_track.volume != 0) {
        curr_track.volume = 0;
        muteButton.innerHTML = "son coupé"
    }
    else {
        curr_track.volume = 1;
        muteButton.innerHTML = "mute"
    }
}

function seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}


function moveMobs() {
    clearMobs();
    moveIndex()
    addMobs();
}

generateGrid();
addMobs();
addShip();
startTimer();
// Load the first track in the tracklist
loadTrack(track_index);


let allDiv = document.querySelectorAll(".grille div")


function addShip() {
    let box = document.querySelectorAll(".grille div")[shipPos];
    box.classList.add("tireur")
}

function clearShip() {
    allDiv[shipPos].classList.remove("tireur")
}

function moveLeft() {

    if (!allDiv[shipPos].getAttribute('data-left')) {
        clearShip();
        shipPos -= 1;
        allDiv[shipPos].classList.add("tireur")

    }
}

function moveRight() {
    if (!allDiv[shipPos].getAttribute('data-right')) {
        clearShip();
        shipPos += 1;
        allDiv[shipPos].classList.add("tireur")
    }
}

function moveUp() {

    if (shipPos - 20 > 179) {
        clearShip();
        shipPos -= 20;
        allDiv[shipPos].classList.add("tireur")
    }

}

function moveDown() {

    if (shipPos + 20 < 240) {
        clearShip();
        shipPos += 20;
        allDiv[shipPos].classList.add("tireur")
    }


}

function loadShoot() {
    laserPos = shipPos - 20
    if (allDiv[laserPos].className == theme) {
        destroyMob(laserPos + 20);
        return true;
    }
    allDiv[laserPos].classList.add("laser")
}

function moveShootUp() {
    if (allDiv[laserPos - 20].className == theme) {
        destroyMob(laserPos);
        return true;
    }
    allDiv[laserPos].classList.remove("laser")
    laserPos -= 20
    if (laserPos >= 0) {
        allDiv[laserPos].classList.add("laser")

    }

}

let lastShootTime = 0;
const cooldown = 500;

function destroyMob(laserPos) {
    mobs.splice(mobs.indexOf(laserPos - 20), 1) // On retirer l'alien touché
    allDiv[laserPos - 20].classList.remove(theme)
    allDiv[laserPos - 20].classList.add("boom")
    setTimeout(() => {
        allDiv[laserPos].classList.remove("laser")
        allDiv[laserPos - 20].classList.remove("boom")
    }, 100)

}

function shootSound() {
    var audio = new Audio('../ressources/blaster.mp3');
    audio.play();
}

function shoot() {
    shootSound(); // fonction pour le bruit lors du tir
    const currentTime = Date.now();
    if (currentTime - lastShootTime < cooldown) {
        return;
    }
    lastShootTime = currentTime;

    if (loadShoot()) {
        return;
    }


    const interval = setInterval(function () {

        if (moveShootUp()) {
            clearInterval(interval)
        }

        if (laserPos < 20) {
            allDiv[laserPos].classList.remove("laser")
            clearInterval(interval)
            return;
        }

    }, 50)
}

window.addEventListener('keyup', (event) => {
    if (event.key === "ArrowLeft") {
        moveLeft();
    }
    if (event.key === "ArrowRight") {
        moveRight();
    }
    if (event.key === "ArrowUp") {
        moveUp();
    }
    if (event.key === "ArrowDown") {
        moveDown();
    }
    if (event.code === "Space") {
        shoot();
    }
})
function end() {

    var pop = document.querySelectorAll(".pop-up-end")[0];
    var popTitle = document.querySelectorAll(".pop-up-title")[0];
    var popImg = document.getElementById("img-pop-up")
    var popScore = document.getElementById("pop-up-score");

    let displayScore = formatTime(elapsedTime);

    if (mobs.includes(shipPos) || mobs.some((value) => value > 220)) {
        popImg.setAttribute("src", "../ressources/lose.gif")
        pop.style.display = "flex";
        popScore.innerHTML = displayScore;
        popTitle.innerHTML = "OOOOOOH TROP NUL "
        stopTimer();
        clearInterval(gameInterval)
    }
    else if (mobs.length === 0) {
        popImg.setAttribute("src", "../ressources/victory.gif")
        pop.style.display = "flex";
        popScore.innerHTML = displayScore;
        popTitle.innerHTML = "YOHOUUUU VICTOIRE "

        stopTimer();
        clearInterval(gameInterval)
        var scores = JSON.parse(localStorage.getItem("allScores")) || []; // si undefined valeur pas défaut empty
        var score = { pseudo: pseudo, theme: theme, difficulty: difficulty, scoreVal: elapsedTime }
        scores.push(JSON.stringify(score));
        localStorage.setItem("allScores", JSON.stringify(scores))
    }

}

function formatTime(timeToFormat) {
    var minutes = Math.floor(timeToFormat / 60000);
    var seconds = Math.floor((timeToFormat % 60000) / 1000);
    var milliseconds = Math.floor((timeToFormat % 1000) / 10);

    minutes = (minutes < 10 ? "0" : "") + minutes.toString();
    seconds = (seconds < 10 ? "0" : "") + seconds.toString();
    milliseconds = (milliseconds < 10 ? "0" : "") + milliseconds.toString();

    var time = minutes + ":" + seconds + ":" + milliseconds;

    return time;
}


function updateChrono() {
    var currentTime = Date.now() - startTime;
    document.getElementById("chrono").innerHTML = formatTime(currentTime);;
}

function stopTimer() {
    clearInterval(timerInterval);
    endTime = Date.now();
}

function startTimer() {
    elapsedTime = 0;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        updateChrono(elapsedTime);
    }, 10);
}


function game() {
    moveMobs();
    end();
}


gameInterval = setInterval(game, speedMobs)

