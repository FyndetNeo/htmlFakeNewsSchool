let score = 0; //initialize game score
let currentArticle; 
let lastSelectedIndex = -1; //initialize Index for later use in selecting the article
const articles = [ //structure to assign articles and whether they are true or false
  {
    text: "Studies have recently discovered that drinking excessive amounts of energy drinks is actually good! Buy DRINK",
    isTrue: false,
  },
  {
    text: "Imagine this being like, a really well-written article. One that cites sources, has multiple reliable ones, that doesn't sell you on anything.",
    isTrue: true,
  },
  {
    text: "Studies have found that COBOL is the most efficient, well-made programming language",
    isTrue: false,
  },
];

let outputText = document.getElementById("gameResultText");
let feedbackTrue = document.getElementById("feedback-valid");
let feedbackFalse = document.getElementById("feedback-invalid");
const trueButton = document.getElementById("trueButton");
const falseButton = document.getElementById("falseButton");

trueButton.addEventListener("click", function () {
  clearFeedbackText();
  checkReal(true);
});

falseButton.addEventListener("click", function () {
  clearFeedbackText();
  checkReal(false);
});

function gameTrueAlert() {
  feedbackTrue.style.display = "flex";
  feedbackTrue.style.justifyContent = "center";
  feedbackTrue.textContent = "Your last answer was correct.";
  score++;
  outputText.textContent = "Your score is: " + score;
}

function gameFalseAlert() {
  feedbackFalse.style.display = "flex";
  feedbackFalse.style.justifyContent = "center";
  feedbackFalse.textContent = "Your last answer was incorrect.";
  score--;
  outputText.textContent = "Your score is: " + score;
}

function clearFeedbackText() {
  feedbackFalse.style.display = "none";
  feedbackTrue.style.display = "none";
}

function setArticle() {
  
    do {
      randomIndex = Math.floor(Math.random() * articles.length); //select a random index of the articles array
    } while (randomIndex === lastSelectedIndex); //prevents same article from being selected twice
  
    lastSelectedIndex = randomIndex;
  
    const article = articles[randomIndex]; //selects article according to randomly rolled index
  
    const gameArticleContainer = document.querySelector(".gameArticle"); //replace gameArticle content
    gameArticleContainer.innerHTML = ""; // Clear previous content
  
    const paragraph = document.createElement("p"); //insert paragraph for correct textformatting
    paragraph.textContent = article.text; //replace text with randomly selected article
  
    gameArticleContainer.appendChild(paragraph);
    currentArticle = article;
}
  


function checkReal(userAnswer) {
  if (userAnswer === currentArticle.isTrue) {
    //Check if answer is correct for the current article
    gameTrueAlert();
  } else {
    gameFalseAlert();
  }

  setArticle();
}

setArticle();
