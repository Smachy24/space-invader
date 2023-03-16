let mobs = [];
mobs = setMobs();
let direction = "right"
let shipPos = 230;
let laserPos = shipPos;
var startTime, endTime, elapsedTime, timerInterval;


var pseudoLabel = document.querySelector("#pseudo");
var themeLabel = document.querySelector("#theme");
var difficultyLabel = document.querySelector("#difficulty");

var pseudo = localStorage.getItem("pseudo");
var theme = localStorage.getItem("theme");
var difficulty = localStorage.getItem("difficulty");

pseudoLabel.innerHTML = `Pseudo: ${pseudo}`;
themeLabel.innerHTML = `Theme: ${theme}`;
difficultyLabel.innerHTML = `Difficulté: ${difficulty}`;

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

function moveMobs() {
    clearMobs();
    moveIndex()
    addMobs();
}

generateGrid();
addMobs();
addShip();
startTimer();

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
let cooldown = 500;

let powerPos = null
let powerInterval = null;

function loadPower(alienPos){
    const powerUp = ["power-bomb", "power-double", "power-speed"]
    powerPos = alienPos
    while(powerPos<Math.max.apply(Math, mobs)){
        powerPos+=20
    }
    allDiv[powerPos].classList.add(powerUp[Math.floor(Math.random()*powerUp.length)]) 
}

function moveDownPower(){
    powerClass = allDiv[powerPos].className
    if(powerPos<219){
        if(powerPos+20==shipPos){
            console.log("VAISSEAU")
            console.log(powerClass);
            switch(powerClass){
                
                case "power-bomb":
                    console.log("BOMBE");
                    break;
                case "power-speed":
                    allDiv[powerPos].classList.remove(powerClass)
                    powerSpeed();
                    break;
                case "power-double":
                    console.log("DOUBLE");
                    break;
            }
            clearInterval(powerInterval)
        }
        else{
            allDiv[powerPos].classList.remove(powerClass)
            powerPos+=20
            allDiv[powerPos].classList.add(powerClass)
        }
    }
    else{
        allDiv[powerPos].classList.remove(powerClass)
        clearInterval(powerInterval)
    }   
}

function dropPower(alienPos){
    let dropLuck = Math.floor(Math.random() * 10)
    if(dropLuck==7){
        loadPower(alienPos)
        powerInterval = setInterval(moveDownPower,1000)
    }
    
}

function powerDoubleLaser(){

}

function powerBomb(){

}

function powerSpeed(){
    cooldown=300
    setTimeout(() => {
        cooldown=500
        console.log("SPEED 5s");
    }, 5000);
    
}

function destroyMob(laserPos) {
    
    mobs.splice(mobs.indexOf(laserPos - 20), 1) // On retirer l'alien touché
    allDiv[laserPos - 20].classList.remove(theme)
    allDiv[laserPos - 20].classList.add("boom")
    setTimeout(() => {
        allDiv[laserPos].classList.remove("laser")
        allDiv[laserPos - 20].classList.remove("boom")
        dropPower(laserPos-20)
    }, 100)
    

}

function shoot() {
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


gameInterval = setInterval(game, 1000)