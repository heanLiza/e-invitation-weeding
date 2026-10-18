/*
 * Background music from YouTube (embedded player, nothing is downloaded).
 *
 * Setup: in data.js add   youtube: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
 * (a full link or just the 11-character video id both work).
 * Load this file AFTER main.js:   <script src="js/music.js"></script>
 */
(() => {
  if (typeof W === "undefined" || !W.youtube) return;

  // accept a full YouTube link or a bare video id
  const match = String(W.youtube).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  const videoId = match ? match[1] : String(W.youtube).trim();

  const musicBtn = document.querySelector("#mu");
  if (!musicBtn) return;

  // main.js hides the button when W.music is empty; with YouTube we want it visible
  musicBtn.style.display = "";
  musicBtn.classList.add("off"); // shows as "paused" until the song really starts

  // hidden holder for the player (must not be display:none or the video may not play)
  const holder = document.createElement("div");
  holder.id = "yt";
  holder.style.cssText =
    "position:fixed;left:-10px;top:-10px;width:1px;height:1px;opacity:0;pointer-events:none";
  document.body.appendChild(holder);

  let player = null;
  let ready = false;
  let wantPlay = false;

  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player("yt", {
      width: "1",
      height: "1",
      videoId,
      playerVars: {
        controls: 0,
        playsinline: 1,
        rel: 0,
        loop: 1,
        playlist: videoId, // required by YouTube for looping a single video
        start: W.youtubeStart || 0,
      },
      events: {
        onReady: () => {
          ready = true;
          if (wantPlay) player.playVideo();
        },
        onStateChange: (e) => {
          musicBtn.classList.toggle("off", e.data !== YT.PlayerState.PLAYING);
        },
      },
    });
  };

  const api = document.createElement("script");
  api.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(api);

  // Browsers only allow sound after a tap, so start on the guest's first tap
  // (the tap that opens the invitation).
  document.addEventListener(
    "click",
    () => {
      wantPlay = true;
      if (ready) player.playVideo();
    },
    { once: true }
  );

  // Music button: pause / resume
  musicBtn.onclick = (e) => {
    e.stopPropagation();
    if (!ready) return;
    const playing = player.getPlayerState() === YT.PlayerState.PLAYING;
    if (playing) player.pauseVideo();
    else player.playVideo();
  };
})();