const videos = document.querySelectorAll("video");
const thumbnailCnt = document.querySelector(".thumbnail-cnt");
// createThumbnail();
function createThumbnail() {
  videos.forEach((video, index) => {
    video.addEventListener("loadedmetadata", () => {
      if (video.duration > 19) {
        min = 60 * 0;
        video.currentTime = min + 45;
      }
    });

    video.addEventListener("seeked", function generateThumbnail() {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL("image/jpeg");

      // Create an image preview + download link
      const img = document.createElement("img");
      img.src = dataURL;
      img.alt = `Thumbnail`;
      img.style.width = "200px";
      img.style.margin = "10px";

      // Extract video number from filename, e.g., "p-21.mp4" → "21"
      const src = video.getAttribute("src");
      const match = src.match(/p-(\d+)\.mp4$/);
      const videoNumber = match ? match[1] : `video-${index + 1}`;

      const button = document.createElement("button");
      button.textContent = `Download thumbnail ${videoNumber}`;
      button.style.display = "block";
      button.style.marginBottom = "20px";

      button.addEventListener("click", () => {
        const a = document.createElement("a");
        a.href = dataURL;
        a.download = `p-${videoNumber}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });

      const output = document.createElement("div");
      output.className = "thumbnail-output";
      output.appendChild(img);
      output.appendChild(button);
      thumbnailCnt.appendChild(output);

      // Optional: Set as poster on the video
      video.setAttribute("poster", dataURL);

      // Pause the video and reset it
      video.pause();
      // video.currentTime = 0;

      // Prevent multiple triggers
      video.removeEventListener("seeked", generateThumbnail);
    });
  });
}

const playButton = document.getElementById("playbtn");

// Play/Pause functionality
playButton.addEventListener("click", () => {
  videos.forEach((video) => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
});

videos.forEach((video) => {
  video.addEventListener("mouseenter", () => {
    video.setAttribute("controls", "controls");
  });

  video.addEventListener("mouseleave", () => {
    video.removeAttribute("controls");
  });
});
