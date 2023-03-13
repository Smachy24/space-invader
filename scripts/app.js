
function generateGrid(){
    const grid = document.querySelectorAll(".grille")[0];
    for(let i=0; i<12; i++){
        let element = document.createElement("div");
        element.classList.add("left");
        grid.appendChild(element);

        for(let j=0; j<18; j++){
            let element = document.createElement("div");
            element.classList.add("mid");
            grid.appendChild(element);
        }
        element = document.createElement("div");
        element.classList.add("right");
        grid.appendChild(element);

    }
}
function addMob(index){
    let box = document.querySelectorAll(".grille div")[index]
    let element = document.createElement("img")
    element.src= "../ressources/ennemies.png"
    box.appendChild(element);
}

function generateMobs(){
    for(let first=1; first<13;first++){
        addMob(first)
    }
    for(let first=21; first<33;first++){
        addMob(first)
    }
    for(let first=41; first<53;first++){
        addMob(first)
    }
}

generateGrid();
generateMobs();