// let speech = new SpeechSynthesisUtterance();
// let voices = [];

// let voiceSelect = document.querySelector("select");

// window.speechSynthesis.onvoiceschanged = () => {
//   voices = window.speechSynthesis.getVoices();
//   speech.voice = voices[0];

//   voices.forEach(
//     (voice, i) => (voiceSelect.options[i] = new Option(voice.name, i))
//   );
// };

// voiceSelect.addEventListener("change", () => {
//   speech.voice = voices[voiceSelect.value];
// });

// document.querySelector("button").addEventListener("click", () => {
//   speech.text = document.querySelector("textarea").value;
//   window.speechSynthesis.speak(speech);
// });
document.addEventListener("DOMContentLoaded", function () {
  let speech = new SpeechSynthesisUtterance();
  let voices = [];
  let voiceSelect = document.querySelector("select");

  function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";

    voices.forEach((voice, i) => {
      let option = new Option(`${voice.name} (${voice.lang})`, i);
      voiceSelect.add(option);
    });

    if (voices.length > 0) {
      speech.voice = voices[0];
    }
  }

  populateVoices();

  window.speechSynthesis.onvoiceschanged = populateVoices;

  voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
  });

  document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    if (speech.text.trim() !== "") {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    }
  });
});
