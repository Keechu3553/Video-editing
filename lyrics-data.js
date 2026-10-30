// Seng Kaniye (செங்கனியே) - Kinetic Typography Lyrics Data & Timings
// Resolution Target: 1080x1920 (9:16 Vertical)

const SONG_METADATA = {
  title: "செங்கனியே",
  englishTitle: "Seng Kaniye",
  artist: "DistroKid Artist",
  duration: 236, // ~3m 56s
  bpm: 78,
  audioSrc: "audio.mp3"
};

const LYRICS_DATA = [
  {
    id: "intro-1",
    section: "Intro",
    start: 0.0,
    end: 9.5,
    text: "...",
    subtext: "Acoustic Intro",
    words: [
      { text: "♫", start: 0.5, end: 9.0 }
    ],
    theme: "ambient",
    style: "intro",
    cameraZoom: 1.05
  },
  {
    id: "intro-2",
    section: "Intro",
    start: 9.5,
    end: 19.5,
    text: "ம்ம்ம்... ஹ்ம்ம்...",
    subtext: "Soulful Humming",
    words: [
      { text: "ம்ம்ம்...", start: 10.0, end: 14.5 },
      { text: "ஹ்ம்ம்...", start: 15.0, end: 19.2 }
    ],
    theme: "ambient",
    style: "floating-whisper",
    cameraZoom: 1.08
  },
  {
    id: "v1-1",
    section: "Verse 1",
    start: 19.8,
    end: 25.8,
    text: "உன் ஆகாய அன்புக்கு நான் என்ன செய்வது?",
    translation: "For your sky-like infinite love, what shall I do?",
    lines: [
      "உன் ஆகாய அன்புக்கு",
      "நான் என்ன செய்வது?"
    ],
    words: [
      { text: "உன்", start: 20.0, end: 20.6 },
      { text: "ஆகாய", start: 20.6, end: 22.0, highlight: "sky" },
      { text: "அன்புக்கு", start: 22.0, end: 23.2, highlight: "love" },
      { text: "நான்", start: 23.3, end: 23.9 },
      { text: "என்ன", start: 23.9, end: 24.7 },
      { text: "செய்வது?", start: 24.7, end: 25.8 }
    ],
    style: "fluid-float",
    cameraZoom: 1.12
  },
  {
    id: "v1-2",
    section: "Verse 1",
    start: 26.0,
    end: 32.8,
    text: "உன் புயல் கோப குணத்துக்கு நான் எங்கு போவது?",
    translation: "For your stormy anger, where shall I go?",
    lines: [
      "உன் புயல் கோப குணத்துக்கு",
      "நான் எங்கு போவது?"
    ],
    words: [
      { text: "உன்", start: 26.2, end: 26.8 },
      { text: "புயல்", start: 26.8, end: 27.8, highlight: "storm" },
      { text: "கோப", start: 27.8, end: 28.5 },
      { text: "குணத்துக்கு", start: 28.5, end: 29.5 },
      { text: "நான்", start: 29.5, end: 30.2 },
      { text: "எங்கு", start: 30.2, end: 31.0 },
      { text: "போவது?", start: 31.0, end: 32.5 }
    ],
    style: "dynamic-drift",
    cameraZoom: 1.15
  },
  {
    id: "v1-3",
    section: "Verse 1",
    start: 33.0,
    end: 42.5,
    text: "உன் மேகாத்து சிரிப்புக்கு நான் என்ன தருவது?",
    translation: "For your breeze-like smile, what shall I give?",
    lines: [
      "உன் மேகாத்து சிரிப்புக்கு",
      "நான் என்ன தருவது?"
    ],
    words: [
      { text: "உன்", start: 33.4, end: 34.2 },
      { text: "மேகாத்து", start: 34.2, end: 35.8, highlight: "breeze" },
      { text: "சிரிப்புக்கு", start: 35.8, end: 37.2, highlight: "smile" },
      { text: "நான்", start: 37.2, end: 38.0 },
      { text: "என்ன", start: 38.0, end: 39.2 },
      { text: "தருவது?", start: 39.2, end: 41.5 }
    ],
    style: "gentle-bloom",
    cameraZoom: 1.18
  },
  {
    id: "v1-4",
    section: "Verse 1",
    start: 45.8,
    end: 55.0,
    text: "உன் மேமாத சண்டைக்கு நான் என்ன ஆவது?",
    translation: "For your scorching May-month quarrels, what will become of me?",
    lines: [
      "உன் மேமாத சண்டைக்கு",
      "நான் என்ன ஆவது?"
    ],
    words: [
      { text: "உன்", start: 46.5, end: 47.4 },
      { text: "மேமாத", start: 47.4, end: 49.0, highlight: "may" },
      { text: "சண்டைக்கு", start: 49.0, end: 50.5 },
      { text: "நான்", start: 50.5, end: 51.5 },
      { text: "என்ன", start: 51.5, end: 52.5 },
      { text: "ஆவது?", start: 52.5, end: 54.5 }
    ],
    style: "fluid-float",
    cameraZoom: 1.14
  },
  {
    id: "v2-1",
    section: "Verse 2",
    start: 55.5,
    end: 66.0,
    text: "தேகத்தை ஆடைக்குள் அடைகாத்து வைத்தாலும்",
    translation: "Even if you shelter your body within clothing...",
    lines: [
      "தேகத்தை ஆடைக்குள்",
      "அடைகாத்து வைத்தாலும்"
    ],
    words: [
      { text: "தேகத்தை", start: 56.5, end: 58.5, highlight: "body" },
      { text: "ஆடைக்குள்", start: 58.5, end: 60.8 },
      { text: "அடைகாத்து", start: 60.8, end: 63.0 },
      { text: "வைத்தாலும்", start: 63.0, end: 65.5 }
    ],
    style: "editorial-cascade",
    cameraZoom: 1.2
  },
  {
    id: "v2-2",
    section: "Verse 2",
    start: 66.5,
    end: 77.0,
    text: "உணர்வுகளில் அசைவுகளில் வேண்டுவதை வெளிபடுத்தும்.",
    translation: "...in feelings and movements, it reveals all it desires.",
    lines: [
      "உணர்வுகளில் அசைவுகளில்",
      "வேண்டுவதை வெளிபடுத்தும்."
    ],
    words: [
      { text: "உணர்வுகளில்", start: 67.5, end: 70.0, highlight: "feelings" },
      { text: "அசைவுகளில்", start: 70.0, end: 72.5 },
      { text: "வேண்டுவதை", start: 72.5, end: 74.5 },
      { text: "வெளிபடுத்தும்.", start: 74.5, end: 76.5 }
    ],
    style: "fluid-float",
    cameraZoom: 1.22
  },
  {
    id: "v2-3",
    section: "Verse 2",
    start: 77.5,
    end: 86.5,
    text: "மோகத்தை காதல் விட ஒருபடி மேல் வைத்திருந்தால்",
    translation: "If desire is placed one step above love...",
    lines: [
      "மோகத்தை காதல் விட",
      "ஒருபடி மேல் வைத்திருந்தால்"
    ],
    words: [
      { text: "மோகத்தை", start: 78.5, end: 80.5, highlight: "passion" },
      { text: "காதல்", start: 80.5, end: 81.8, highlight: "love" },
      { text: "விட", start: 81.8, end: 82.5 },
      { text: "ஒருபடி", start: 82.5, end: 83.8 },
      { text: "மேல்", start: 83.8, end: 84.8 },
      { text: "வைத்திருந்தால்", start: 84.8, end: 86.2 }
    ],
    style: "editorial-cascade",
    cameraZoom: 1.2
  },
  {
    id: "v2-4",
    section: "Verse 2",
    start: 86.8,
    end: 95.5,
    text: "வாழ்வுக்கும் உடம்புக்கும் நிம்மதியே கைக்கிட்டும்.",
    translation: "...peace will be in reach for both life and body.",
    lines: [
      "வாழ்வுக்கும் உடம்புக்கும்",
      "நிம்மதியே கைக்கிட்டும்."
    ],
    words: [
      { text: "வாழ்வுக்கும்", start: 87.5, end: 89.8 },
      { text: "உடம்புக்கும்", start: 89.8, end: 91.5 },
      { text: "நிம்மதியே", start: 91.5, end: 93.2, highlight: "peace" },
      { text: "கைக்கிட்டும்.", start: 93.2, end: 95.0 }
    ],
    style: "gentle-bloom",
    cameraZoom: 1.16
  },
  {
    id: "ch1-1",
    section: "Chorus",
    start: 95.8,
    end: 108.5,
    text: "செங்கனியே..... வா.. அருகே....",
    translation: "My sweet red fruit / beloved... come closer...",
    lines: [
      "செங்கனியே.....",
      "வா.. அருகே...."
    ],
    words: [
      { text: "செங்கனியே.....", start: 96.0, end: 102.5, highlight: "ruby-hero", isHero: true },
      { text: "வா..", start: 102.5, end: 104.5 },
      { text: "அருகே....", start: 104.5, end: 108.0, highlight: "close-hero", isHero: true }
    ],
    style: "hero-ruby-bloom",
    cameraZoom: 1.3,
    glowColor: "#ff2d55"
  },
  {
    id: "ch1-2",
    section: "Chorus",
    start: 109.0,
    end: 122.0,
    text: "செங்கனியே..... வா.. அருகே....",
    translation: "My sweet red fruit / beloved... come closer...",
    lines: [
      "செங்கனியே.....",
      "வா.. அருகே...."
    ],
    words: [
      { text: "செங்கனியே.....", start: 109.5, end: 115.5, highlight: "ruby-hero", isHero: true },
      { text: "வா..", start: 115.5, end: 117.5 },
      { text: "அருகே....", start: 117.5, end: 121.5, highlight: "close-hero", isHero: true }
    ],
    style: "hero-ruby-bloom",
    cameraZoom: 1.35,
    glowColor: "#ff2d55"
  },
  {
    id: "interlude",
    section: "Interlude",
    start: 122.0,
    end: 145.5,
    text: "...",
    subtext: "Acoustic Melody & Ambient Strings",
    words: [
      { text: "✦", start: 123.0, end: 133.0 },
      { text: "✦", start: 134.0, end: 145.0 }
    ],
    style: "interlude-constellation",
    cameraZoom: 1.05
  },
  {
    id: "br-1",
    section: "Bridge",
    start: 145.8,
    end: 157.5,
    text: "புவி இல்லாமல் போனாலோ கோள்கள் விண்ணோடு நூறுண்டு.",
    translation: "Even if Earth is no more, a hundred planets orbit the heavens.",
    lines: [
      "புவி இல்லாமல் போனாலோ",
      "கோள்கள் விண்ணோடு நூறுண்டு."
    ],
    words: [
      { text: "புவி", start: 146.5, end: 148.0, highlight: "earth" },
      { text: "இல்லாமல்", start: 148.0, end: 150.0 },
      { text: "போனாலோ", start: 150.0, end: 151.8 },
      { text: "கோள்கள்", start: 151.8, end: 153.8, highlight: "planets" },
      { text: "விண்ணோடு", start: 153.8, end: 155.8, highlight: "cosmos" },
      { text: "நூறுண்டு.", start: 155.8, end: 157.2 }
    ],
    style: "cosmic-orbit",
    cameraZoom: 1.2
  },
  {
    id: "br-2",
    section: "Bridge",
    start: 158.0,
    end: 171.5,
    text: "உயிர் பூமிக்குள் இல்லைன்னாலும் விண்ணில் எங்காவது வாய்ப்புண்டு.",
    translation: "Even if life is not on Earth, in space there's a chance somewhere.",
    lines: [
      "உயிர் பூமிக்குள் இல்லைன்னாலும்",
      "விண்ணில் எங்காவது வாய்ப்புண்டு."
    ],
    words: [
      { text: "உயிர்", start: 159.2, end: 161.2 },
      { text: "பூமிக்குள்", start: 161.2, end: 163.2 },
      { text: "இல்லைன்னாலும்", start: 163.2, end: 165.5 },
      { text: "விண்ணில்", start: 165.5, end: 167.5, highlight: "cosmos" },
      { text: "எங்காவது", start: 167.5, end: 169.2 },
      { text: "வாய்ப்புண்டு.", start: 169.2, end: 171.0 }
    ],
    style: "fluid-float",
    cameraZoom: 1.22
  },
  {
    id: "br-3",
    section: "Bridge",
    start: 172.0,
    end: 184.5,
    text: "நிலம் இல்லாத தரையானாலும் அங்கும் உயிர்வாழ வழியுண்டு.",
    translation: "Even on landless terrain, there is a way to survive.",
    lines: [
      "நிலம் இல்லாத தரையானாலும்",
      "அங்கும் உயிர்வாழ வழியுண்டு."
    ],
    words: [
      { text: "நிலம்", start: 173.0, end: 174.8 },
      { text: "இல்லாத", start: 174.8, end: 176.8 },
      { text: "தரையானாலும்", start: 176.8, end: 179.0 },
      { text: "அங்கும்", start: 179.0, end: 181.0 },
      { text: "உயிர்வாழ", start: 181.0, end: 182.8, highlight: "life" },
      { text: "வழியுண்டு.", start: 182.8, end: 184.2 }
    ],
    style: "editorial-cascade",
    cameraZoom: 1.18
  },
  {
    id: "br-4",
    section: "Bridge",
    start: 185.0,
    end: 197.5,
    text: "நீ இல்லாத வாழ்க்கையிலே நான் வாழ்ந்தாலும் விருப்பமில்லை..",
    translation: "In a life without you, even if I lived, I have no desire to...",
    lines: [
      "நீ இல்லாத வாழ்க்கையிலே",
      "நான் வாழ்ந்தாலும் விருப்பமில்லை.."
    ],
    words: [
      { text: "நீ", start: 185.5, end: 187.0, highlight: "you" },
      { text: "இல்லாத", start: 187.0, end: 189.0 },
      { text: "வாழ்க்கையிலே", start: 189.0, end: 191.0 },
      { text: "நான்", start: 191.0, end: 192.8 },
      { text: "வாழ்ந்தாலும்", start: 192.8, end: 194.8 },
      { text: "விருப்பமில்லை..", start: 194.8, end: 197.0, highlight: "longing" }
    ],
    style: "intimate-climax",
    cameraZoom: 1.28
  },
  {
    id: "ch2-1",
    section: "Chorus",
    start: 198.0,
    end: 210.5,
    text: "செங்கனியே... வா.. அருகே.....",
    translation: "My sweet red fruit / beloved... come closer...",
    lines: [
      "செங்கனியே...",
      "வா.. அருகே....."
    ],
    words: [
      { text: "செங்கனியே...", start: 198.0, end: 204.0, highlight: "ruby-hero", isHero: true },
      { text: "வா..", start: 204.0, end: 206.0 },
      { text: "அருகே.....", start: 206.0, end: 210.0, highlight: "close-hero", isHero: true }
    ],
    style: "hero-ruby-bloom",
    cameraZoom: 1.35,
    glowColor: "#ff2d55"
  },
  {
    id: "ch2-2",
    section: "Chorus",
    start: 211.0,
    end: 221.5,
    text: "செங்கனியே..... வா.. அருகே....",
    translation: "My beloved... come closer...",
    lines: [
      "செங்கனியே.....",
      "வா.. அருகே...."
    ],
    words: [
      { text: "செங்கனியே.....", start: 211.5, end: 216.5, highlight: "ruby-hero", isHero: true },
      { text: "வா..", start: 216.5, end: 218.5 },
      { text: "அருகே....", start: 218.5, end: 221.0, highlight: "close-hero", isHero: true }
    ],
    style: "hero-ruby-bloom",
    cameraZoom: 1.38,
    glowColor: "#ff2d55"
  },
  {
    id: "ch2-3",
    section: "Outro Chorus",
    start: 222.0,
    end: 234.0,
    text: "செங்கனியே... வா.. அருகே.....",
    translation: "My beloved... come closer...",
    lines: [
      "செங்கனியே...",
      "வா.. அருகே....."
    ],
    words: [
      { text: "செங்கனியே...", start: 222.0, end: 227.5, highlight: "ruby-hero", isHero: true },
      { text: "வா..", start: 227.5, end: 229.5 },
      { text: "அருகே.....", start: 229.5, end: 233.8, highlight: "close-hero", isHero: true }
    ],
    style: "hero-ruby-bloom",
    cameraZoom: 1.4,
    glowColor: "#ff2d55"
  },
  {
    id: "outro",
    section: "Outro",
    start: 234.0,
    end: 236.5,
    text: "✦ ✦ ✦",
    subtext: "Fade to Silence",
    words: [
      { text: "✦", start: 234.2, end: 236.0 }
    ],
    style: "outro-fade",
    cameraZoom: 1.1
  }
];

// Helper to find active line
function getActiveLineIndex(time) {
  for (let i = 0; i < LYRICS_DATA.length; i++) {
    if (time >= LYRICS_DATA[i].start && time <= LYRICS_DATA[i].end) {
      return i;
    }
  }
  // If between lines, find closest past line
  for (let i = LYRICS_DATA.length - 1; i >= 0; i--) {
    if (time >= LYRICS_DATA[i].start) {
      return i;
    }
  }
  return 0;
}

if (typeof module !== 'undefined') {
  module.exports = { SONG_METADATA, LYRICS_DATA, getActiveLineIndex };
}

