let score = 0;
let currentArticle;
const articles = [
    {text: "Studies have recently discovered that drinking excessive amounts of energy drinks is actually good! Buy DRINK", isTrue: false},
    {text: "Imagine this being like, a really well-written article. One that cites sources, has multiple reliable ones, that doesn't sell you on anything.", isTrue: true},
    {text: "Studies have found that COBOL is the most efficient, well-made programming language", isTrue: false}
];

let outputText = document.getElementById("gameResultText");
let feedbackTrue = document.getElementById("feedback-valid")
let feedbackFalse = document.getElementById("feedback-invalid")
const trueButton = document.getElementById("trueButton");   
const falseButton = document.getElementById("falseButton");

trueButton.addEventListener("click", function() {
    clearFeedbackText();
    checkReal(true);
});

falseButton.addEventListener("click", function() {
    clearFeedbackText();
    checkReal(false);
});
 
function gameTrueAlert() {
    feedbackTrue.style.display = 'inline';
    feedbackTrue.textContent = "Your last Answer was correct.";
    score++;
    outputText.textContent = "Your score is: " + score;
}

function gameFalseAlert() {
    feedbackFalse.style.display = 'inline';
    feedbackFalse.textContent = "Your last Answer was incorrect.";
    score--;
    outputText.textContent = "Your score is: " + score;
}

function clearFeedbackText() {
    feedbackFalse.style.display = 'none';
    feedbackTrue.style.display = 'none';
}

function setArticle(){
    const randomIndex = Math.floor(Math.random() * articles.length); //assign a random Index within the array length of "articles"
    const article = articles[randomIndex]; //Select the article that was chosen via randomIndex
    const paragraph = document.createElement('p'); //create the paragraph element to be filled with the article
    paragraph.textContent = article.text; //assign article text to the paragraph
    const gameArticleContainer = document.querySelector('.gameArticle'); //selects HTML element
    gameArticleContainer.innerHTML = ''; //initialize text
    
while (gameArticleContainer.firstChild) { //stops same article from being selected twice by removing it from the array then appending it again, does not work becaues I got lazy
    gameArticleContainer.removeChild(gameArticleContainer.firstChild);
}

    gameArticleContainer.appendChild(paragraph);
    currentArticle = article;
}

function checkReal(userAnswer) { 
    if (userAnswer === currentArticle.isTrue) { //Check if answer is correct for the current article
        gameTrueAlert();
    } else {
        gameFalseAlert();
    }

    setArticle();
}

setArticle();
