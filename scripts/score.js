var scores = localStorage.getItem("allScores");
scores = JSON.parse(scores)


scores.sort((a, b) => JSON.parse(a).scoreVal - JSON.parse(b).scoreVal);

var topScores = scores.slice(0, 10);

var ul = document.querySelector("ul");
for (var i = 0; i < topScores.length; i++) {
    var element = JSON.parse(topScores[i]);
    var li = document.createElement("li");
    let time = element.scoreVal;
    var minutes = Math.floor(time / 60000);
    var seconds = Math.floor((time % 60000) / 1000);
    var milliseconds = Math.floor((time % 1000) / 10);

    minutes = (minutes < 10 ? "0" : "") + minutes.toString();
    seconds = (seconds < 10 ? "0" : "") + seconds.toString();
    milliseconds = (milliseconds < 10 ? "0" : "") + milliseconds.toString();

    var scoreString = minutes + ":" + seconds + ":" + milliseconds;

    li.innerHTML = '<p class="player-name">' + element.pseudo + '</p><p class="score">' + scoreString + '</p><p class="difficulty">' + element.difficulty + '</p>';
    ul.appendChild(li);
}
