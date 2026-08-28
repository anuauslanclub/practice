const STORAGE_KEY = "sentenceGenState";
const DATA_URL = "./sentences.json";

let state = null;

// shuffle function
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// build state
function buildState(data) {
  const all = shuffle([...data.easy, ...data.medium, ...data.hard]);
  return {
    currentDifficulty: "easy",
    freshState: true,
    lists: {
      easy: { sentences: shuffle(data.easy), index: 0 },
      medium: { sentences: shuffle(data.medium), index: 0 },
      hard: { sentences: shuffle(data.hard), index: 0 },
      all: { sentences: all, index: 0 },
    },
  };
}

// persistence
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

// fetch data, restore or build state ---
async function init() {
  const res = await fetch(DATA_URL);
  const data = await res.json();
  console.log(data);

  const saved = loadState();
  if (saved) {
    state = saved; // resume where the user left off
  } else {
    state = buildState(data);
    saveState();
  }

  render(); // show current sentence for whatever difficulty is active
  updateActiveButtonStyle();
}

function setDifficulty(difficulty) {
  state.currentDifficulty = difficulty;
  // console.log(btn.dataset.difficulty)
  saveState();
  render();
  updateActiveButtonStyle();
}

// --- Generator button: advance index, wrap + reshuffle-on-wrap ---
function generateNext() {
  if (!state) {
    return;
  }
  state.freshState = false;
  const current = state.lists[state.currentDifficulty];
  console.log(state.currentDifficulty, state.lists);
  const nextIndex = current.index + 1;

  if (nextIndex >= current.sentences.length) {
    // wrapped around: reshuffle for a fresh pass
    let reshuffled = shuffle(current.sentences);
    // avoid new first sentence matching old last sentence
    const lastShown = current.sentences[current.index];
    if (reshuffled[0] === lastShown && reshuffled.length > 1) {
      [reshuffled[0], reshuffled[1]] = [reshuffled[1], reshuffled[0]];
    }
    current.sentences = reshuffled;
    current.index = 0;
  } else {
    current.index = nextIndex;
  }

  saveState();
  render();
}

// --- Display ---
function render() {
  const current = state.lists[state.currentDifficulty];
  const display = document.getElementById("sentence-display");
  if (state.freshState) {
    return;
  }
  display.textContent = current.sentences[current.index];
}

// --- Visual active state for difficulty buttons ---
function updateActiveButtonStyle() {
  document.querySelectorAll(".difficulty-btn").forEach((btn) => {
    btn.classList.toggle(
      "active",
      btn.dataset.difficulty === state.currentDifficulty,
    );
  });
}

// --- Wire up buttons ---
document.querySelectorAll(".difficulty-btn").forEach((btn) => {
  btn.addEventListener("click", () => setDifficulty(btn.dataset.difficulty));
});
document.getElementById("generate-stc").addEventListener("click", generateNext);

init();
