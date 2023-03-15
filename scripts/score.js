function generateFakeScores() {
    var themes = ["Aliens", "Pokemon", "Clown"];
    var difficulties = ["Facile", "Moyen", "Difficile"];
    var scores = [];

    for (var i = 0; i < 5; i++) {
        var pseudo = "Player" + (i + 1);
        var theme = themes[Math.floor(Math.random() * themes.length)];
        var difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
        var scoreVal = Math.floor(Math.random() * 9001) + 1000;
        var score = { pseudo: pseudo, theme: theme, theme: difficulty, theme: scoreVal };
        scores.push(score);
    }
    return scores;
}


var scores = localStorage.getItem("allScores");
console.log(scores.pseudo)

if (!scores) {
    scores = generateFakeScores();
}

scores.sort(function (a, b) {
    return b.scoreVal - a.scoreVal;
});

var topScores = scores.slice(0, 10);

var ul = document.querySelector("ul");
for (var i = 0; i < topScores.length; i++) {

    var li = document.createElement("li");
    let time = topScores[i].scoreVal;
    var minutes = Math.floor(time / 60000);
    var seconds = Math.floor((time % 60000) / 1000);
    var milliseconds = Math.floor((time % 1000) / 10);

    minutes = (minutes < 10 ? "0" : "") + minutes.toString();
    seconds = (seconds < 10 ? "0" : "") + seconds.toString();
    milliseconds = (milliseconds < 10 ? "0" : "") + milliseconds.toString();

    var scoreString = minutes + ":" + seconds + ":" + milliseconds;

    li.innerHTML = '<p class="player-name">' + topScores[i].pseudo + '</p><p class="score">' + scoreString + '</p><p class="difficulty">' + topScores[i].difficulty + '</p>';
    ul.appendChild(li);
}
