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
let laser;

let hasPower = false;

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
    {
        name: "One Piece",
        path: "../ressources/onepiece-sound.mp3"
    },
    {
        name: "Pokemon",
        path: "../ressources/pokemon-sound.mp3"
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

switch (theme) {
    case 'alien':
    
        laser = "laser"

        break;
    case 'pokemon':
        
    laser = "fireball"

        break;
    case 'onepiece':
        
    laser = "hand"

        break;
    default:
        break;
}

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
    /*Generate grid with all divs */
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
    /*Push first mobs in array of mobs
    @return: array of mobs*/
    aliens = []
    for (let first = 1; first < 13; first++) {
        aliens.push(first)
    }
    for (let second = 21; second < 33; second++) {
        aliens.push(second)
    }
    for (let third = 41; third < 53; third++) {
        aliens.push(third)
    }
    return aliens
}

function addMobs() {
    /* Set class to mob divs*/
    mobs.forEach(index => {
        let box = document.querySelectorAll(".grille div")[index]
        box.classList.add(theme)
    });

}

function clearMobs() {
    /*Remove mob class to each mob */
    mobs.forEach(index => {
        let box = document.querySelectorAll(".grille div")[index]
        if (!box.getAttribute("data-right") && !box.getAttribute("data-left")) {
            box.classList.remove(theme)
        }
    })
}

function setIndexNextLine() {
    /* Add 20 to each mob*/
    for (let i = 0; i < mobs.length; i++) {
        mobs[i] += 20
    }
}

function moveIndex() {
    /* Move each mob */
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
    /* Load music
    @param track_index : music index */
    clearInterval(updateTimer);
    resetValues();

    curr_track.src = track_list[track_index].path;
    curr_track.load();
    track_name.textContent = track_list[track_index].name;
    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
    /*Reset music value */
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    /* Play and pause music */

    if (!isPlaying){
        playTrack();
    } 
    else {
        pauseTrack();
    }
}

function playTrack() {
    /* Play music */
    curr_track.play();
    isPlaying = true;
    playpause_btn.setAttribute("src", "../ressources/pause.svg")
}

function pauseTrack() {
    /* Pause music */
    curr_track.pause();
    isPlaying = false;
    playpause_btn.setAttribute("src", "../ressources/play.svg")
}

function nextTrack() {
    /* Change music to next music */
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    /* Change music to previous */
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length - 1;
    loadTrack(track_index);
    playTrack();
}

function muteAudio() {
    /* Mute music */
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
    /*Update music duration bar */
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
    /* Move mobs in the grid */
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
    /*Add ship to the grid */
    let box = document.querySelectorAll(".grille div")[shipPos];
    box.classList.add("tireur")
}

function clearShip() {
    /*Remove ship of the grid */
    allDiv[shipPos].classList.remove("tireur")
}

function moveLeft() {
    /* Move ship to left */

    if (!allDiv[shipPos].getAttribute('data-left')) {
        clearShip();
        shipPos -= 1;
        allDiv[shipPos].classList.add("tireur")
    }
}

function moveRight() {
    /*Move ship to right */
    if (!allDiv[shipPos].getAttribute('data-right')) {
        clearShip();
        shipPos += 1;
        allDiv[shipPos].classList.add("tireur")
    }
}

function moveUp() {
    /*Move ship to up */
    if (shipPos - 20 > 179) {
        clearShip();
        shipPos -= 20;
        allDiv[shipPos].classList.add("tireur")
    }
}

function moveDown() {
    /*Move ship to down */
    if (shipPos + 20 < 240) {
        clearShip();
        shipPos += 20;
        allDiv[shipPos].classList.add("tireur")
    }
}

function loadShoot(position) {
    /* Load shoot above ship*/
    laserPos = shipPos - 20
    if (position) {
        laserPos = position
    }
    if (allDiv[laserPos].className == theme) {
        destroyMob(laserPos + 20);
        return true;
    }
    allDiv[laserPos].classList.add(laser)
}

function moveShootUp() {
    /* Move shoot one case above */

    try{
        if (allDiv[laserPos - 20].className == theme) {
            if (shootBomb == true) {
                const centerMob = laserPos;
                destroyMob(centerMob)
                destroyMob(centerMob - 1)
                destroyMob(centerMob + 1)
                destroyMob(centerMob - 20)
                destroyMob(centerMob + 20)
                shootBomb = false
                return true;
            }
            else {
                destroyMob(laserPos);
                return true;
            }
        }
    }
    catch(e){
        allDiv[laserPos].classList.remove(laser)
    }
    
    allDiv[laserPos].classList.remove(laser)
    laserPos -= 20
    if (laserPos >= 0) {
        allDiv[laserPos].classList.add(laser)

    }
}

let lastShootTime = 0;
let cooldown = 800;

function destroyMob(laserPos) {
    /* Destroy mob : array and class of the div */
    mobs.splice(mobs.indexOf(laserPos - 20), 1) // On retire l'alien touché
    allDiv[laserPos - 20].classList.remove(theme)
    allDiv[laserPos - 20].classList.add("boom")
    var audio = new Audio('../ressources/EXPLOSION.mp3'); // EXPLOSIOOOOOOOOON
    audio.play();
    setTimeout(() => {
        allDiv[laserPos].classList.remove(laser)
        allDiv[laserPos - 20].classList.remove("boom")
    }, 100)
}

function win() {
    /* Music win */
    var audio = new Audio('../ressources/win.mp3');
    pauseTrack()
    audio.play();
}

function loose() {
    /*Music loose */
    var audio = new Audio('../ressources/loose.mp3');
    var audio2 = new Audio('../ressources/loose2.mp3');
    pauseTrack()
    audio.play();
    audio2.play();
}

function shootSound() {
    /* Play sound when shoot */
    // on créer un nouvel élément audio avec comme source le son
    var audio = new Audio('../ressources/blaster.mp3');
    // on le joue au moment du tir dans la fonction shoot()
    audio.play();
}


let powerPos = null
let powerInterval = null;
let shootBomb = false

function loadPower(alienPos) {
    /*Load power up under mobs */
    hasPower=true
    const powerUp = ["power-bomb", "power-speed"]
    powerPos = alienPos
    while (powerPos < Math.max.apply(Math, mobs)) {
        powerPos += 20
    }
    allDiv[powerPos].classList.add(powerUp[Math.floor(Math.random() * powerUp.length)])
    setTimeout(() =>hasPower=false,2000)
}

function moveDownPower() {
    /*Move power up down */
    powerClass = allDiv[powerPos].className
    if (powerPos < 219) {
        if (powerPos + 20 == shipPos ||powerPos+1== shipPos ||powerPos+1== shipPos) {
            console.log("VAISSEAU")
            console.log(powerClass);
            switch (powerClass) {

                case "power-bomb":
                    allDiv[powerPos].classList.remove(powerClass)
                    shootBomb = true
                    break;
                case "power-speed":
                    allDiv[powerPos].classList.remove(powerClass)
                    powerSpeed();
                    break;
                case "power-double":
                    allDiv[powerPos].classList.remove(powerClass)
                    shoot(231);
                    console.log("POWER DOOUBLE")
                    break;
            }
            clearInterval(powerInterval)
        }
        else {
            allDiv[powerPos].classList.remove(powerClass)
            powerPos += 20
            allDiv[powerPos].classList.add(powerClass)
        }
    }
    else {
        try {
            allDiv[powerPos].classList.remove(powerClass);
          } catch (error) {
            allDiv[powerPos].className="tireur"
          }
        clearInterval(powerInterval)
    }
}

function dropPower(alienPos) {
    /* Drop power up */
    if(!hasPower){
        let dropLuck = Math.floor(Math.random() * 10)
        if (dropLuck == 1) {
            loadPower(alienPos)
            powerInterval = setInterval(moveDownPower, 200)
        } 
    }
}

function powerSpeed() {
    /* Speed power up */
    cooldown = 400
    setTimeout(() => {
        cooldown = 800
        console.log("SPEED 5s");
    }, 5000);
}

function shoot(position) {
    /* Shoot laser */
    shootSound(); // fonction pour le bruit lors du tir
    const currentTime = Date.now();
    if (currentTime - lastShootTime < cooldown) {
        return;
    }
    lastShootTime = currentTime;

    if (loadShoot(position)) {
        return;
    }

    const interval = setInterval(function () {

        if (moveShootUp()) {
            clearInterval(interval)
        }
        if (laserPos < 20) {
            allDiv[laserPos].classList.remove(laser)
            clearInterval(interval)
            return;
        }

    }, 50)
}

window.addEventListener('keyup', (event) => {
    if (event.key === "ArrowLeft") {
        moveLeft();
        playTrack();
    }
    if (event.key === "ArrowRight") {
        moveRight();
        playTrack();
    }
    if (event.key === "ArrowUp") {
        moveUp();
        playTrack();
    }
    if (event.key === "ArrowDown") {
        moveDown();
        playTrack();
    }
    if (event.code === "Space") {
        shoot();
        playTrack();
    }
})

function end() {
    /*Function end game */
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
        loose();
    }
    else if (mobs.length === 0) {
        popImg.setAttribute("src", "../ressources/victory.gif")
        pop.style.display = "flex";
        popScore.innerHTML = displayScore;
        popTitle.innerHTML = "YOHOUUUU VICTOIRE "
        win();

        stopTimer();
        clearInterval(gameInterval);
        var scores = JSON.parse(localStorage.getItem("allScores")) || []; // si undefined valeur pas défaut empty
        var score = { pseudo: pseudo, theme: theme, difficulty: difficulty, scoreVal: elapsedTime }
        scores.push(JSON.stringify(score));
        localStorage.setItem("allScores", JSON.stringify(scores))
    }
}

function formatTime(timeToFormat) {
    /* Format time for the chrono */
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
    /* Update chrono element */
    document.getElementById("chrono").innerHTML = formatTime(elapsedTime);
}

function stopTimer() {
    /* Stop timer */
    clearInterval(timerInterval);
}

function startTimer() {
    /*Start timer */
    elapsedTime = 0;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        updateChrono();
    }, 10);
}

function game() {
    /* Game function */
    moveMobs();
    end();
}

gameInterval = setInterval(game, speedMobs)