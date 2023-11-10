let score = 0;
let currentArticle;
const articles = [
    {text: "Studies have recently discovered that drinking excessive amounts of energy drinks is actually good! Buy DRINK", isTrue: false},
    {text: "Imagine this being like, a really well-written article. One that cites sources, has multiple reliable ones, that doesn't sell you on anything.", isTrue: true},
    {text: "Studies have found that COBOL is the most efficient, well-made programming language", isTrue: false}
];

let outputText = document.getElementById("gameResultText");
const trueButton = document.getElementById("trueButton");
const falseButton = document.getElementById("falseButton");

trueButton.addEventListener("click", function() {
    checkReal(true);
});

falseButton.addEventListener("click", function() {
    checkReal(false);
});

function gameTrueAlert() {
    alert("Your answer was correct.");
    score++;
    outputText.textContent = "Your score is: " + score;
}

function gameFalseAlert() {
    alert("Your answer was incorrect.");
    score--;
    outputText.textContent = "Your score is: " + score;
}

function setArticle(){
    const randomIndex = Math.floor(Math.random() * articles.length);
    const article = articles[randomIndex];
    const paragraph = document.createElement('p');
    paragraph.textContent = article.text;
    const gameArticleContainer = document.querySelector('.gameArticle');
    gameArticleContainer.innerHTML = '';
    
while (gameArticleContainer.firstChild) {
    gameArticleContainer.removeChild(gameArticleContainer.firstChild);
}

    gameArticleContainer.appendChild(paragraph);
    currentArticle = article;
}

function checkReal(userAnswer) {
    if (userAnswer === currentArticle.isTrue) {
        gameTrueAlert();
    } else {
        gameFalseAlert();
    }

    setArticle();
}

setArticle();
