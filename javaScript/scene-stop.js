// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
const videoIds = new Array('3KtWfp0UopM', 'UIZAiXYceBI', 'mHZSrtl4zX0');
var videoIdsIndex = 0;
const gameOpt1 = document.getElementById("opt1Button");
const gameOpt2 = document.getElementById("opt2Button");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    height: "100%",
    width: "100%",
    videoId: videoIds[0 + videoIdsIndex],
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
    }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6 * 1000); //change single digit to adjust how many seconds of the video play, in this case 6
    done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}

gameOpt1.addEventListener("click", function () {
    //alert('Button1 Test!');
    videoIdsIndex = videoIdsIndex + 1;
    player.loadVideoById(videoIds[videoIdsIndex])
    videoIdsIndex = 0;
  });
  
gameOpt2.addEventListener("click", function () {

    //alert('Button2 Test!');
    videoIdsIndex = videoIdsIndex + 2;
    player.loadVideoById(videoIds[videoIdsIndex])
    videoIdsIndex = 0;
});