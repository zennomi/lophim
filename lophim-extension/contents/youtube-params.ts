import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: [
    "http://*.youtube.com/*",
    "https://*.youtube.com/*",
    "file:///*",
    "http://localhost:3000/*"
  ],
  all_frames: true
}

// patch for embed videos
// this will be used to extract the token from the url params
// and then we will add the token to the body without changing the original extension script

const urlParams = new URLSearchParams(window.location.search)

if (urlParams.has("token")) {
  const token = urlParams.get("token")
  console.log(`Extracted token from search params: ${token}`)
  const el = document.createElement("div")
  el.className = "yt-core-attributed-string--link-inherit-color"
  el.textContent = `token:${token}`
  el.style.display = "none"
  document.body.prepend(el)
}
