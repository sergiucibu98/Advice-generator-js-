const button = document.getElementById("button");
const adviceGenerator = document.getElementById("adviceGenerator");

function renderAdvice(advice) {
  adviceGenerator.textContent = advice;
}

async function voiceAdvice(advice) {
  const apiKey = "5ff4b1b6ab8143f488a977bc3a2f2a9c";
  const url = `https://api.voicerss.org/?key=${apiKey}&src=${encodeURIComponent(
    advice
  )}&hl=en-us&v=Linda&r=0&c=mp3&f=44khz_16bit_stereo&ssml=false`;

  try {
    const response = await fetch(url);
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("Error while generating voice advice:", error);
  }
}

async function getAdvice() {
  const url = "https://api.adviceslip.com/advice";

  try {
    const response = await fetch(url);
    const data = await response.json();

    let advice = data.slip.advice;
    renderAdvice(advice);
    voiceAdvice(advice);
  } catch (error) {
    console.error("Error while fetching advice:", error);
  }
}

button.addEventListener("click", getAdvice);
