let mobs = setMobs();
let direction = "right"

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
    addMobs();
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
        if(!box.getAttribute("data-right") && !box.getAttribute("data-left")){
            box.classList.remove("alien")
        }
        
    })
}

function setIndexNextLine(){
    for(let i=0; i<mobs.length; i++){
        mobs[i]+=20
    }
}

function moveIndex(){

    let rightBoxes = document.querySelectorAll("div[data-right].alien")
    let breakRight = false;
    let leftBoxes = document.querySelectorAll("div[data-left].alien")
    let breakLeft = false;

   
    if(direction=="right"){

        rightBoxes.forEach(element => {
            console.log("ETAPE 1")
            if(!breakRight){
                direction="left"
                setIndexNextLine();
                breakRight = true
            }
            element.classList.remove("alien")
            
        });
    }

    if(direction=="left"){
        leftBoxes.forEach(element => { 
            console.log("ETAPE 2")
        if(!breakLeft){
            direction="right"
            setIndexNextLine();
            breakLeft = true
        }
        element.classList.remove("alien")

        }); 
    }

    if(direction=="right"){
        if(!breakRight && !breakLeft){
            console.log("ETAPE 3")
            for(let i=0; i<mobs.length; i++){
                let box = document.querySelectorAll(".grille div")[mobs[i]]
                if(box.getAttribute("data-left")){
                    box.classList.remove("alien")
                }
                mobs[i]+=1
            } 
        }
    }

    if(direction=="left"){
        if(!breakLeft &&!breakRight){
            console.log("ETAPE 4")

            for(let i=0; i<mobs.length; i++){
                let box = document.querySelectorAll(".grille div")[mobs[i]]
                if(box.getAttribute("data-right")){
                    box.classList.remove("alien")
                }
                mobs[i]-=1
            } 
        }
    }
}

function moveMobs(){
    clearMobs();
    moveIndex()
    addMobs();
}

generateGrid();

