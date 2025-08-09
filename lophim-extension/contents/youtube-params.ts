import embedYoutubeStyle from "data-text:~/assets/styles/embed-youtube.css"
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["http://*.youtube.com/*", "https://*.youtube.com/*"],
  all_frames: true
}

// patch for embed videos
// this will be used to extract the token from the url params
// and then we will add the token to the body without changing the original extension script

const isEmbedYoutube = () => {
  return window.location.pathname.includes("/embed/")
}

const unsafeYTPatch = () => {
  const urlParams = new URLSearchParams(window.location.search)

  const lophimToken = urlParams.get("lophimToken")
  if (lophimToken) {
    const token = lophimToken
    console.log(`Extracted token from search params: ${token}`)
    const el = document.createElement("div")
    el.className = "yt-core-attributed-string--link-inherit-color"
    el.textContent = `token:${token}`
    el.style.display = "none"
    document.body.prepend(el)
    if (isEmbedYoutube()) {
      const lophimThumbnail = urlParams.get("lophimThumbnail")
      if (lophimThumbnail) {
        const thumbnail = lophimThumbnail
        console.log(`Extracted thumbnail from search params: ${thumbnail}`)
        injectCss(
          `
          .ytp-cued-thumbnail-overlay-image {
            background-image: url(${thumbnail}) !important;
          }
          `
        )
      }
      console.log("is embed youtube")
      injectEmbedCSS()
      window.parent.postMessage(
        {
          type: "lophim-ready"
        },
        "*"
      )
    }
  }
}

// Function to inject CSS to remove unwanted elements in the youtube embed
const injectEmbedCSS = () => {
  injectCss(embedYoutubeStyle)
}

const injectCss = (css: string) => {
  const style = document.createElement("style")
  style.textContent = css
  document.head.appendChild(style)
}

unsafeYTPatch()
