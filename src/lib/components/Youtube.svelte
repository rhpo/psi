<script context="module">
  // @ts-nocheck

  import { setContext } from "svelte";
  export let videoId;

  let iframeApiReady = false;
</script>

<script>
  // @ts-nocheck
  import { onMount, createEventDispatcher } from "svelte";

  let player;
  let divId = "player_" + parseInt(Math.random() * 109999);
  const dispatch = createEventDispatcher();

  onMount(() => {
    let tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () =>
      window.dispatchEvent(new Event("iframeApiReady"));

    window.addEventListener("iframeApiReady", function (e) {
      console.log("yo", divId);
      player = new YT.Player(divId, {
        height: "390",
        width: "640",
        videoId,
        events: {
          onReady: playerIsReady,
          onStateChange: playerStateChange,
        },
      });
    });

    function playerStateChange({ data }) {
      dispatch("PlayerStateChange", data);
      console.log(data);
      let strReturn = "";
      if (data == -1) {
        strReturn = "(unstarted)";
      }
      if (data == 0) {
        strReturn = "(ended)";
      }
      if (data == 1) {
        strReturn = "(playing)";
      }
      if (data == 2) {
        strReturn = "(paused)";
      }
      if (data == 3) {
        strReturn = "(buffering)";
      }
      if (data == 5) {
        strReturn = "(video cued).";
      }
      dispatch("PlayerStateChangeString", strReturn);
    }

    function playerIsReady() {
      dispatch("Ready");
      setInterval(() => {
        dispatch("currentPlayTime", player.getCurrentTime());
        //console.log(player.getCurrentTime())
      }, 1000);
    }
  });

  function play() {
    player.playVideo();
  }
</script>

<div id={divId} />
