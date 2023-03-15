let difficultyChoosen = document.querySelector('#diffilculty-select').value;
let themeChoosen = document.querySelector('#theme-select').value;

document.querySelector('#diffilculty-select').addEventListener('change', () => {
    difficultyChoosen = document.querySelector('#diffilculty-select').value;
});
document.querySelector('#theme-select').addEventListener('change', () => {
    themeChoosen = document.querySelector('#theme-select').value;
});


function getInfo() {
    var pseudo = document.querySelector("#pseudo").value;
    console.log(pseudo);
    console.log(themeChoosen);
    console.log(difficultyChoosen);
    if (!themeChoosen || !difficultyChoosen || !pseudo) {
        alert('Veuillez complété tout les champs');
    }
    else {
        localStorage.setItem("theme",themeChoosen);
        localStorage.setItem("difficulty",difficultyChoosen);
        localStorage.setItem("pseudo",pseudo);
        return true;
    }
}