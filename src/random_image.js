import { useState } from "react";

const RANDOMIMG_URL =
  "https://api.unsplash.com/photos/random?&client_id=M8gkni-HSRbU0mPcw9qgY9FUttQi95NHfUD_O8CO-C8";

export default function useRandomImage() {
  const [baseImgUrl, setBaseImgUrl] = useState(null);
  function getNewImage() {
    fetch(RANDOMIMG_URL)
      .then((s) => s.json())
      .then((json) => setBaseImgUrl(json.urls.raw));
  }
  return [baseImgUrl, getNewImage];
}
