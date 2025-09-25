// Utility: extract a YouTube video ID from common URL formats
function getYouTubeId(url) {
  try {
    const u = new URL(url);
    // youtu.be/<id>
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    // youtube.com/watch?v=<id>
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
  } catch (_e) {}
  // Fallback: if someone already passed the ID
  return url;
}

/**
 * Renders a simple video carousel into a container
 * @param {HTMLElement} mountEl - The element to render into
 * @param {string[]} videoUrls - Array of YouTube URLs
 */
export function renderVideoCarousel(mountEl, videoUrls) {
  if (!mountEl) return;

  const section = document.createElement("section");
  section.id = "videos";
  section.className = "container";

  section.innerHTML = `
    <h2>Featured Videos</h2>
    <div class="video-carousel">
      <div class="video-track"></div>
    </div>
  `;

  const track = section.querySelector(".video-track");

  videoUrls.forEach((url, i) => {
    const id = getYouTubeId(url);
    const videoDiv = document.createElement("div");
    videoDiv.className = "video";
    videoDiv.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${id}"
        title="Video ${i + 1}"
        allowfullscreen
        loading="lazy"
      ></iframe>
    `;
    track.appendChild(videoDiv);
  });

  mountEl.replaceChildren(section);
}
