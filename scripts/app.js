let mobs = [];
mobs = setMobs();
let direction = "right"
let shipPos = 230;

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
    aliens.push(239);
    return aliens
}


function addMobs() {

    mobs.forEach(index => {
        let box = document.querySelectorAll(".grille div")[index]
        box.classList.add("alien")
    });

}

function clearMobs() {
    mobs.forEach(index => {
        let box = document.querySelectorAll(".grille div")[index]
        if (!box.getAttribute("data-right") && !box.getAttribute("data-left")) {
            box.classList.remove("alien")
        }

    })
}

function setIndexNextLine() {
    for (let i = 0; i < mobs.length; i++) {
        console.log(i)
        mobs[i] += 20
    }
}

function moveIndex() {

    let rightBoxes = document.querySelectorAll("div[data-right].alien")
    let breakRight = false;
    let leftBoxes = document.querySelectorAll("div[data-left].alien")
    let breakLeft = false;


    if (direction == "right") {

        rightBoxes.forEach(element => {
            console.log("ETAPE 1")
            if (!breakRight) {
                direction = "left"
                setIndexNextLine();
                breakRight = true
            }
            element.classList.remove("alien")

        });
    }

    if (direction == "left") {
        leftBoxes.forEach(element => {
            console.log("ETAPE 2")
            if (!breakLeft) {
                direction = "right"
                setIndexNextLine();
                breakLeft = true
            }
            element.classList.remove("alien")

        });
    }

    if (direction == "right") {
        if (!breakRight && !breakLeft) {
            console.log("ETAPE 3")
            for (let i = 0; i < mobs.length; i++) {
                let box = document.querySelectorAll(".grille div")[mobs[i]]
                if (box.getAttribute("data-left")) {
                    box.classList.remove("alien")
                }
                mobs[i] += 1
            }
        }
    }

    if (direction == "left") {
        if (!breakLeft && !breakRight) {
            console.log("ETAPE 4")

            for (let i = 0; i < mobs.length; i++) {
                let box = document.querySelectorAll(".grille div")[mobs[i]]
                if (box.getAttribute("data-right")) {
                    box.classList.remove("alien")
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

window.addEventListener('keyup', (event) => {
    console.log(event);
    end();
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
})
var t = [1, 2]

function end() {

    var pop = document.querySelectorAll(".pop-up-end")[0];
    var popTitle = document.querySelectorAll(".pop-up-title")[0];
    var popImg = document.getElementById("img-pop-up")

    if (mobs.includes(shipPos) || mobs.some((value) => value > 220)) {
        popImg.setAttribute("src","../ressources/lose.gif")
        pop.style.display = "flex";
        popTitle.innerHTML = "OOOOOOH TROP NUL "
    }
    else if (mobs.length === 0) {
        popImg.setAttribute("src","../ressources/victory.gif")
        pop.style.display = "flex";
        popTitle.innerHTML = "YOHOUUUU VICTOIRE "
    }
}