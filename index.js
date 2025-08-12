let speech = new SpeechSynthesisUtterance();
let voices = [];

let voiceSelect = document.querySelector("select");

// Function to get language name from language code
function getLanguageName(langCode) {
  const languageNames = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ru: "Russian",
    ja: "Japanese",
    ko: "Korean",
    zh: "Chinese",
    ar: "Arabic",
    hi: "Hindi",
    nl: "Dutch",
    sv: "Swedish",
    no: "Norwegian",
    da: "Danish",
    fi: "Finnish",
    pl: "Polish",
    tr: "Turkish",
    he: "Hebrew",
    th: "Thai",
    vi: "Vietnamese",
    id: "Indonesian",
    ms: "Malay",
    fa: "Persian",
    ur: "Urdu",
    bn: "Bengali",
    ta: "Tamil",
    te: "Telugu",
    mr: "Marathi",
    gu: "Gujarati",
    kn: "Kannada",
    ml: "Malayalam",
    pa: "Punjabi",
    or: "Odia",
    as: "Assamese",
    ne: "Nepali",
    si: "Sinhala",
    my: "Burmese",
    km: "Khmer",
    lo: "Lao",
    mn: "Mongolian",
    ka: "Georgian",
    am: "Amharic",
    sw: "Swahili",
    zu: "Zulu",
    af: "Afrikaans",
    is: "Icelandic",
    mt: "Maltese",
    cy: "Welsh",
    ga: "Irish",
    gd: "Scottish Gaelic",
    br: "Breton",
    eu: "Basque",
    ca: "Catalan",
    gl: "Galician",
    oc: "Occitan",
    ro: "Romanian",
    bg: "Bulgarian",
    hr: "Croatian",
    sr: "Serbian",
    sl: "Slovenian",
    sk: "Slovak",
    cs: "Czech",
    hu: "Hungarian",
    et: "Estonian",
    lv: "Latvian",
    lt: "Lithuanian",
    uk: "Ukrainian",
    be: "Belarusian",
    mk: "Macedonian",
    sq: "Albanian",
    bs: "Bosnian",
    me: "Montenegrin",
    el: "Greek",
    hy: "Armenian",
    az: "Azerbaijani",
    kk: "Kazakh",
    ky: "Kyrgyz",
    uz: "Uzbek",
    tg: "Tajik",
    tk: "Turkmen",
    ug: "Uyghur",
    bo: "Tibetan",
    dz: "Dzongkha",
    ps: "Pashto",
    ku: "Kurdish",
    yi: "Yiddish",
    lb: "Luxembourgish",
    fo: "Faroese",
    sm: "Samoan",
    to: "Tongan",
    fj: "Fijian",
    haw: "Hawaiian",
    mi: "Maori",
    ty: "Tahitian",
    co: "Corsican",
    fur: "Friulian",
    rm: "Romansh",
    lad: "Ladino",
    jv: "Javanese",
    su: "Sundanese",
    ceb: "Cebuano",
    war: "Waray",
    hil: "Hiligaynon",
    tl: "Tagalog",
    ilo: "Ilocano",
    pam: "Kapampangan",
    bik: "Bikol",
    pag: "Pangasinan",
    kab: "Kabyle",
    ber: "Berber",
    wo: "Wolof",
    ff: "Fula",
    sn: "Shona",
    xh: "Xhosa",
    st: "Sotho",
    tn: "Tswana",
    ts: "Tsonga",
    ve: "Venda",
    nr: "Ndebele",
    ss: "Swati",
    rw: "Kinyarwanda",
    rn: "Kirundi",
    lg: "Ganda",
    ak: "Akan",
    tw: "Twi",
    ee: "Ewe",
    yo: "Yoruba",
    ig: "Igbo",
    ha: "Hausa",
    so: "Somali",
    om: "Oromo",
    am: "Amharic",
    ti: "Tigrinya",
    ar: "Arabic",
    he: "Hebrew",
    fa: "Persian",
    ur: "Urdu",
    bn: "Bengali",
    ta: "Tamil",
    te: "Telugu",
    mr: "Marathi",
    gu: "Gujarati",
    kn: "Kannada",
    ml: "Malayalam",
    pa: "Punjabi",
    or: "Odia",
    as: "Assamese",
    ne: "Nepali",
    si: "Sinhala",
    my: "Burmese",
    km: "Khmer",
    lo: "Lao",
    th: "Thai",
    vi: "Vietnamese",
    id: "Indonesian",
    ms: "Malay",
    tl: "Tagalog",
    jv: "Javanese",
    su: "Sundanese",
    ceb: "Cebuano",
    war: "Waray",
    hil: "Hiligaynon",
    ilo: "Ilocano",
    pam: "Kapampangan",
    bik: "Bikol",
    pag: "Pangasinan",
    kab: "Kabyle",
    ber: "Berber",
    wo: "Wolof",
    ff: "Fula",
    sn: "Shona",
    xh: "Xhosa",
    st: "Sotho",
    tn: "Tswana",
    ts: "Tsonga",
    ve: "Venda",
    nr: "Ndebele",
    ss: "Swati",
    rw: "Kinyarwanda",
    rn: "Kirundi",
    lg: "Ganda",
    ak: "Akan",
    tw: "Twi",
    ee: "Ewe",
    yo: "Yoruba",
    ig: "Igbo",
    ha: "Hausa",
    so: "Somali",
    om: "Oromo",
    ti: "Tigrinya",
  };

  return languageNames[langCode] || langCode;
}

// Function to categorize voices
function categorizeVoices(voices) {
  const categories = {};

  voices.forEach((voice) => {
    const langCode = voice.lang.split("-")[0];
    const languageName = getLanguageName(langCode);

    if (!categories[languageName]) {
      categories[languageName] = [];
    }

    // Add accent/region info if available
    let voiceName = voice.name;
    if (voice.lang.includes("-")) {
      const region = voice.lang.split("-")[1];
      voiceName += ` (${region.toUpperCase()})`;
    }

    categories[languageName].push({
      name: voiceName,
      voice: voice,
      lang: voice.lang,
    });
  });

  return categories;
}

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();

  // Clear existing options
  voiceSelect.innerHTML = "";

  // Add default option
  const defaultOption = document.createElement("option");
  defaultOption.text = "Select a voice...";
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  voiceSelect.appendChild(defaultOption);

  // Categorize voices
  const categorizedVoices = categorizeVoices(voices);

  // Add categorized voices to dropdown
  Object.keys(categorizedVoices)
    .sort()
    .forEach((language) => {
      // Add language group header
      const groupHeader = document.createElement("optgroup");
      groupHeader.label = language;

      categorizedVoices[language].forEach((voiceInfo, index) => {
        const option = document.createElement("option");
        option.text = voiceInfo.name;
        option.value = voices.indexOf(voiceInfo.voice);
        groupHeader.appendChild(option);
      });

      voiceSelect.appendChild(groupHeader);
    });

  // Set default voice (first available)
  if (voices.length > 0) {
    speech.voice = voices[0];
    voiceSelect.value = "0";
  }
};

voiceSelect.addEventListener("change", () => {
  const selectedIndex = voiceSelect.value;
  if (selectedIndex !== "") {
    speech.voice = voices[selectedIndex];
  }
});

document.querySelector("button").addEventListener("click", () => {
  const text = document.querySelector("textarea").value;
  if (text.trim() === "") {
    alert("Please enter some text to convert to speech.");
    return;
  }

  if (!speech.voice) {
    alert("Please select a voice first.");
    return;
  }

  speech.text = text;
  window.speechSynthesis.speak(speech);
});

// Add speech rate and pitch controls
let speechRate = 1;
let speechPitch = 1;

// Create controls for speech rate and pitch
function createControls() {
  const controlsContainer = document.createElement("div");
  controlsContainer.className = "controls";

  // Speech Rate Control
  const rateContainer = document.createElement("div");
  rateContainer.className = "control-group";

  const rateLabel = document.createElement("label");
  rateLabel.textContent = "Speed:";
  rateLabel.htmlFor = "rate";

  const rateSlider = document.createElement("input");
  rateSlider.type = "range";
  rateSlider.id = "rate";
  rateSlider.min = "0.5";
  rateSlider.max = "2";
  rateSlider.step = "0.1";
  rateSlider.value = "1";

  const rateValue = document.createElement("span");
  rateValue.textContent = "1x";

  rateSlider.addEventListener("input", (e) => {
    speechRate = parseFloat(e.target.value);
    rateValue.textContent = speechRate + "x";
    speech.rate = speechRate;
  });

  rateContainer.appendChild(rateLabel);
  rateContainer.appendChild(rateSlider);
  rateContainer.appendChild(rateValue);

  // Pitch Control
  const pitchContainer = document.createElement("div");
  pitchContainer.className = "control-group";

  const pitchLabel = document.createElement("label");
  pitchLabel.textContent = "Pitch:";
  pitchLabel.htmlFor = "pitch";

  const pitchSlider = document.createElement("input");
  pitchSlider.type = "range";
  pitchSlider.id = "pitch";
  pitchSlider.min = "0.5";
  pitchSlider.max = "2";
  pitchSlider.step = "0.1";
  pitchSlider.value = "1";

  const pitchValue = document.createElement("span");
  pitchValue.textContent = "Normal";

  pitchSlider.addEventListener("input", (e) => {
    speechPitch = parseFloat(e.target.value);
    const pitchText =
      speechPitch < 0.8 ? "Low" : speechPitch > 1.2 ? "High" : "Normal";
    pitchValue.textContent = pitchText;
    speech.pitch = speechPitch;
  });

  pitchContainer.appendChild(pitchLabel);
  pitchContainer.appendChild(pitchSlider);
  pitchContainer.appendChild(pitchValue);

  controlsContainer.appendChild(rateContainer);
  controlsContainer.appendChild(pitchContainer);

  // Insert controls after the row
  const row = document.querySelector(".row");
  row.parentNode.insertBefore(controlsContainer, row.nextSibling);
}

// Initialize controls when DOM is loaded
document.addEventListener("DOMContentLoaded", createControls);
