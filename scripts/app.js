let mobs = setMobs();

function generateGrid(){
    const grid = document.querySelectorAll(".grille")[0];
    for(let i=0; i<12; i++){
        let element = document.createElement("div");
        element.setAttribute('data-left','true')
        grid.appendChild(element);

        for(let j=0; j<18; j++){
            let element = document.createElement("div");
            grid.appendChild(element);
        }
        element = document.createElement("div");
        element.setAttribute('data-right','true')
        grid.appendChild(element);

    }
}
function setMobs(){
    aliens = []
    for(let first=1; first<13;first++){
        aliens.push(first)
    }
    for(let second=21; second<33;second++){
        aliens.push(second)
    }
    for(let third=41; third<53;third++){
        aliens.push(third)
    }
    return aliens
}

function addMobs(){
    
    mobs.forEach(index => {
        let box = document.querySelectorAll(".grille div")[index]
        box.classList.add("alien")
    });

}

function clearMobs(){
    mobs.forEach(index =>{
        let box = document.querySelectorAll(".grille div")[index]
        box.classList.remove("alien")
    })
}

function moveMobs(){
    clearMobs();
    for(let i=0; i<mobs.length; i++){
        mobs[i]+=1
    } 
    addMobs();
}

generateGrid();
addMobs();
