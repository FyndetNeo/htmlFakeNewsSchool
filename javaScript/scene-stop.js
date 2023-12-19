// Existing setup for YouTube API and initial button setup
var tag = document.createElement("script");
const gameOpt1 = document.getElementById("opt1Button");
const gameOpt2 = document.getElementById("opt2Button");
let currentScene = 0;

let firstVideoId;

let scenesJson;

let currentChoice;

let endOfScene = false;

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

function onYouTubeIframeAPIReady() {
  fetch("https://fyndetneo.pythonanywhere.com/scenes").then(response => {
    response.json().then(scenesJsonWrap => {
      const scenesJsonInner = scenesJsonWrap.map(sceneElement =>
        JSON.parse(sceneElement.data)
      );
      scenesJson = scenesJsonInner;
      currentChoice = scenesJson[currentScene];
      console.log("Now loaded");
      const firstVideoIdInner = scenesJson[0].currentVideo;
      firstVideoId = firstVideoIdInner;
      player = new YT.Player("player", {
        height: "100%",
        width: "100%",
        videoId: firstVideoIdInner,
        enablejsapi: true,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    });
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    // Activate buttons when video ends
    activateButtons();
    // Show modal if it's not a nextChoice video
    if (isEndOfScene()) {
      resetButtons();
      showModal();
    }
  }
}

function activateButtons() {
  gameOpt1.style = "";
  gameOpt2.style = "";

  gameOpt1.textContent = currentChoice.buttons[0].buttonText;
  gameOpt2.textContent = currentChoice.buttons[1].buttonText;

  gameOpt1.onclick = () => loadNextVideo(0);
  gameOpt2.onclick = () => loadNextVideo(1);
}

function isEndOfScene() {
  // Get the current scene's buttons
  return endOfScene;
}

function loadNextScene() {
  // Placeholder for loading the next scene
  // This should be implemented based on your application's logic
  currentScene++; // Increment scene index
  if (currentScene >= scenesJson.length) {
    currentScene = 0; // Reset to first scene if end is reached
  }
  loadScene(currentScene);
}

function loadScene(sceneIndex) {
  const scene = scenesJson[sceneIndex];
  currentChoice = scene;
  endOfScene = false;
  player.loadVideoById(scene.currentVideo);
  resetButtons();
}

function showModal() {
  // Create the modal elements
  const modal = document.createElement("div");
  modal.id = "nextSceneModal";
  modal.style =
    "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 100; background: white; padding: 20px; border: 1px solid #ddd;";

  const modalContent = document.createElement("p");
  modalContent.textContent = "Do you want to go to the next scene?";

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.onclick = function () {
    // Load next scene
    loadNextScene();
    // Remove the modal
    document.body.removeChild(modal);
  };

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.onclick = function () {
    document.body.removeChild(modal);
  };

  // Append elements to the modal
  modal.appendChild(modalContent);
  modal.appendChild(nextButton);
  modal.appendChild(closeButton);

  // Append the modal to the document body
  document.body.appendChild(modal);
}

function loadNextVideo(buttonIndex) {
  if (currentChoice.buttons[buttonIndex].nextChoice) {
    const nextVideoId =
      currentChoice.buttons[buttonIndex].nextChoice.currentVideo;
    currentChoice = currentChoice.buttons[buttonIndex].nextChoice;
    player.loadVideoById(nextVideoId);
  } else {
    const nextVideoId = currentChoice.buttons[buttonIndex].nextVideo;
    endOfScene = true;
    player.loadVideoById(nextVideoId);
  }
  resetButtons();
}

// Grayscale style
const grayscaleStyle = "filter: grayscale(100%);";
// Apply grayscale to buttons initially
gameOpt1.style = grayscaleStyle;
gameOpt2.style = grayscaleStyle;

function resetButtons() {
  gameOpt1.style = grayscaleStyle;
  gameOpt2.style = grayscaleStyle;

  gameOpt1.onclick = undefined;
  gameOpt2.onclick = undefined;

  gameOpt1.textContent = "";
  gameOpt2.textContent = "";
}
