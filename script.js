const sections = document.querySelectorAll(".realm-section");
const realmLinks = document.querySelectorAll(".realm-link");
const navButtons = document.querySelectorAll(".realm-nav button");

const legendGrid = document.getElementById("legendGrid");
const modal = document.getElementById("legendModal");
const closeModal = document.getElementById("closeModal");

const modalSymbol = document.getElementById("modalSymbol");
const modalTitle = document.getElementById("modalTitle");
const modalOrigin = document.getElementById("modalOrigin");
const modalStory = document.getElementById("modalStory");
const inkStory = document.getElementById("inkStory");
const modalFragment = document.getElementById("modalFragment");
const narrateBtn = document.getElementById("narrateBtn");

const enterGate = document.getElementById("enterGate");
const entranceSection = document.getElementById("entrance");

const spiritCompanion = document.getElementById("spiritCompanion");
const spiritMessage = document.getElementById("spiritMessage");

const soundToggle = document.getElementById("soundToggle");
const homepageAmbient = document.getElementById("homepageAmbient");
const petalLayer = document.getElementById("petalLayer");
const themeToggle = document.getElementById("themeToggle");
const dramaSubmitter = document.getElementById("dramaSubmitter");
const submitToPublic = document.getElementById("submitToPublic");
const communityDramaList = document.getElementById("communityDramaList");
const refreshCommunityDramas = document.getElementById("refreshCommunityDramas");

const SUPABASE_URL = "https://awtuhrpwlyxoysberywx.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_fxE1YzwhH0Yw6HqjcOEVXw_l8dXEkrN";

const archiveSupabase =
  window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

let currentLegendText = "";
let audioContext = null;
let ambientOscillator = null;
let ambientGain = null;
let soundOn = false;

const legends = [
  {
    title: "The White Snake",
    symbol: "白",
    origin: "Legend of transformation, devotion, and forbidden love",
    preview: "A white snake spirit cultivates for centuries and enters the mortal world.",
    story:
      "In the mist beside West Lake, a white snake spirit cultivated until she gained human form. She crossed into the mortal world and fell in love with Xu Xian, a kind man whose life became bound to hers. Their love was gentle, but heaven and human law feared what they could not understand. The story asks whether a spirit can love more purely than a mortal, and whether devotion can survive judgment.",
    inkLines: [
      {
        zh: "西湖烟雨中，白蛇修行千年。",
        en: "In the mist and rain of West Lake, the white snake cultivated for a thousand years."
      },
      {
        zh: "她化作女子，步入凡尘。",
        en: "She took the form of a woman and entered the mortal world."
      },
      {
        zh: "一段情缘，从湖边悄然开始。",
        en: "A fated love quietly began beside the water."
      },
      {
        zh: "世人惧她为妖，却不知她也有真心。",
        en: "The world feared her as a demon, never knowing her heart was sincere."
      }
    ],
    fragment:
      "A silver scale rests inside the scroll. It glows when touched by moonlight."
  },
  {
    title: "Chang’e and the Moon Palace",
    symbol: "月",
    origin: "Legend of the moon goddess and eternal longing",
    preview: "A woman rises to the moon and becomes separated from the mortal world.",
    story:
      "Chang’e drank the elixir of immortality and drifted upward beyond the reach of the earth. She arrived in the Moon Palace, luminous and lonely, where silence stretched across jade halls. Her legend is beautiful because it is not only about immortality. It is about the ache of distance, the cost of ascension, and the memories that remain when love is left behind.",
    inkLines: [
      {
        zh: "嫦娥饮下仙药，身轻如云。",
        en: "Chang’e drank the elixir of immortality, and her body became light as cloud."
      },
      {
        zh: "她飞向月宫，从此远离凡尘。",
        en: "She flew toward the Moon Palace, forever leaving the mortal world behind."
      },
      {
        zh: "玉阶清冷，桂影无声。",
        en: "The jade steps were cold, and the shadow of the osmanthus tree was silent."
      },
      {
        zh: "成仙之后，她才知永恒也会寂寞。",
        en: "Only after becoming immortal did she learn that eternity could also be lonely."
      }
    ],
    fragment:
      "A jade rabbit appears in the margin of the scroll, grinding herbs for an elixir no one dares to drink."
  },
  {
    title: "The Nine-Tailed Fox",
    symbol: "狐",
    origin: "Spirit fox legend of beauty, illusion, and hidden wisdom",
    preview: "A fox spirit walks between desire, danger, and divine knowledge.",
    story:
      "The fox spirit is often feared because she is beautiful, clever, and difficult to control. Yet not every fox is cruel. Some guard forgotten shrines. Some test human hearts. Some fall in love and pay for it. The nine tails are not simply a sign of seduction, but of age, spiritual power, and survival through many lifetimes.",
    inkLines: [
      {
        zh: "青山深处，有狐修行百年。",
        en: "Deep within the green mountains, a fox cultivated for a hundred years."
      },
      {
        zh: "九尾如云，眼中藏着旧梦。",
        en: "Her nine tails flowed like clouds, and old dreams hid within her eyes."
      },
      {
        zh: "世人畏她妖媚，却忘了妖也有情。",
        en: "The world feared her enchantment, forgetting that even spirits can love."
      },
      {
        zh: "她笑看红尘，却也为红尘落泪。",
        en: "She smiled at the mortal world, yet still shed tears for it."
      }
    ],
    fragment:
      "A strand of golden fur curls around the edge of the page like a question."
  },
  {
    title: "The Cowherd and the Weaver Girl",
    symbol: "星",
    origin: "Qixi legend of star-crossed lovers",
    preview: "Two lovers are separated by the river of stars.",
    story:
      "The Weaver Girl, daughter of heaven, and the Cowherd, a mortal, loved each other across the boundary of worlds. When they were separated, the Milky Way became a river between them. Once each year, magpies form a bridge so they may meet. Their story is a celestial reminder that love can be brief and still eternal.",
    inkLines: [
      {
        zh: "天河之上，织女低头望人间。",
        en: "Above the river of stars, the Weaver Girl looked down toward the mortal world."
      },
      {
        zh: "牛郎在凡尘，守着一年一度的相逢。",
        en: "The Cowherd remained below, waiting for the one meeting granted each year."
      },
      {
        zh: "喜鹊成桥，星光为路。",
        en: "Magpies formed a bridge, and starlight became their path."
      },
      {
        zh: "相见虽短，情意却长过银河。",
        en: "Though their meeting was brief, their love stretched farther than the Milky Way."
      }
    ],
    fragment:
      "Tiny ink-black birds gather near the final line, forming a bridge across the parchment."
  },
  {
    title: "Butterfly Lovers",
    symbol: "蝶",
    origin: "Tragic romance known as Liang Shanbo and Zhu Yingtai",
    preview: "Two souls become butterflies after sorrow consumes their human lives.",
    story:
      "Zhu Yingtai disguised herself as a man to study, where she met Liang Shanbo. Their bond grew quietly, but fate and family arranged a different marriage for her. When grief swallowed the path ahead, the lovers were transformed into butterflies. Their ending is sorrowful, yet strangely free: love escaping the rules of the world through wings.",
    inkLines: [
      {
        zh: "英台女扮男装，踏入书院。",
        en: "Yingtai disguised herself as a young man and entered the academy."
      },
      {
        zh: "山伯不知她是女子，却懂她的心。",
        en: "Shanbo did not know she was a woman, yet he understood her heart."
      },
      {
        zh: "姻缘被世俗拆散，泪落成雨。",
        en: "Their bond was torn apart by worldly rules, and tears fell like rain."
      },
      {
        zh: "双蝶飞起，从此不受人间拘束。",
        en: "Two butterflies rose together, no longer bound by the mortal world."
      }
    ],
    fragment:
      "Two painted butterflies lift from the paper when the scroll is opened."
  },
  {
    title: "Nezha",
    symbol: "莲",
    origin: "Divine child, lotus rebirth, and rebellion against fate",
    preview: "A powerful child spirit challenges heaven, family, and destiny.",
    story:
      "Nezha is born with impossible power and a fate too heavy for a child. Misunderstood and feared, he becomes a symbol of defiance. His lotus rebirth transforms pain into divine strength. In many retellings, Nezha represents the right to define yourself, even when heaven has already written your name.",
    inkLines: [
      {
        zh: "哪吒生而不凡，命中带火。",
        en: "Nezha was born extraordinary, carrying fire within his fate."
      },
      {
        zh: "世人惧他的力量，天命也想束缚他。",
        en: "The world feared his power, and destiny itself tried to bind him."
      },
      {
        zh: "莲花重塑其身，烈焰重铸其魂。",
        en: "Lotus blossoms remade his body, and flame reforged his soul."
      },
      {
        zh: "他不认命，只认自己选择的路。",
        en: "He refused the fate written for him and chose his own path instead."
      }
    ],
    fragment:
      "A lotus petal is sealed inside the scroll, warm as a living flame."
  }
];

function switchRealm(targetId) {
  sections.forEach((section) => {
    section.classList.remove("active-section");
  });

  const target = document.getElementById(targetId);

  if (!target) {
    console.warn(`No section found with id: ${targetId}`);
    return;
  }

  target.classList.add("active-section");

  navButtons.forEach((button) => {
    button.classList.toggle("active-nav", button.dataset.target === targetId);
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  showSpiritMessage(getRealmMessage(targetId));
  adjustAmbientForRealm(targetId);
}

function getRealmMessage(realm) {
  const messages = {
    entrance: "The gate opens only for those who remember old stories.",
    legends: "Every scroll carries a spirit. Choose carefully.",
    dramas: "A drama is never just watched. It becomes a memory.",
    journal: "Write softly. Ink remembers what the heart cannot say.",
    map: "The archive grows with every realm you add."
  };

  return messages[realm] || "The spirit path shifts beneath your feet.";
}

document.addEventListener("click", (event) => {
  const link = event.target.closest(".realm-link");

  if (!link) return;

  const targetId = link.dataset.target;

  if (!targetId) return;

  switchRealm(targetId);
});
if (enterGate) {
  enterGate.addEventListener("click", () => {
    if (entranceSection) {
      entranceSection.classList.add("entering-archive");
    }

    showSpiritMessage("The moon gate opens. Step carefully into the archive...");

    setTimeout(() => {
      switchRealm("map");
    }, 900);

    setTimeout(() => {
      if (entranceSection) {
        entranceSection.classList.remove("entering-archive");
      }
    }, 1400);
  });
}
function renderLegends() {
  legendGrid.innerHTML = "";

  legends.forEach((legend) => {
    const card = document.createElement("button");
    card.className = "legend-card";
    card.innerHTML = `
      <span class="legend-symbol">${legend.symbol}</span>
      <h3>${legend.title}</h3>
      <p>${legend.preview}</p>
    `;

   card.addEventListener("click", () => openLegend(legend));

   addCornerOrnaments(card);

   legendGrid.appendChild(card);
  });
}

function openLegend(legend) {
  modalSymbol.textContent = legend.symbol;
  modalTitle.textContent = legend.title;
  modalOrigin.textContent = legend.origin;
  modalStory.textContent = legend.story;
  modalFragment.textContent = legend.fragment;

  currentLegendText = `${legend.title}. ${legend.story}`;

  if (inkStory) {
    inkStory.innerHTML = `
      <p class="english-row">Press “Hear the Legend” to awaken the ink.</p>
    `;
  }

  modal.classList.remove("hidden");
}
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  window.speechSynthesis.cancel();
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
    window.speechSynthesis.cancel();
  }
});

let availableVoices = [];

function loadNarrationVoices() {
  availableVoices = window.speechSynthesis.getVoices();
}

loadNarrationVoices();

window.speechSynthesis.onvoiceschanged = () => {
  loadNarrationVoices();
};

function getChineseFemaleVoice() {
  const chineseVoices = availableVoices.filter((voice) =>
    voice.lang.toLowerCase().startsWith("zh")
  );

  const preferredFemaleVoice = chineseVoices.find((voice) => {
    const name = voice.name.toLowerCase();

    return (
      name.includes("xiaoxiao") ||
      name.includes("tingting") ||
      name.includes("huihui") ||
      name.includes("meijia") ||
      name.includes("mei-jia") ||
      name.includes("sinji") ||
      name.includes("sin-ji") ||
      name.includes("female")
    );
  });

  return preferredFemaleVoice || chineseVoices[0] || availableVoices[0];
}
function writeLegendInInk(legend) {
  if (!inkStory) return;

  const lines = legend.inkLines || [
    {
      zh: "传说开始了。",
      en: legend.story
    }
  ];

  inkStory.innerHTML = "";

  let totalDelay = 0;

  lines.forEach((line, lineIndex) => {
    const lineElement = document.createElement("div");
    lineElement.className = "ink-line";
    lineElement.style.animationDelay = `${totalDelay}ms`;

    const hanziRow = document.createElement("div");
    hanziRow.className = "hanzi-row";

    [...line.zh].forEach((character, charIndex) => {
      const span = document.createElement("span");
      span.className = "hanzi-char";
      span.textContent = character;
      span.style.animationDelay = `${totalDelay + charIndex * 130}ms`;
      hanziRow.appendChild(span);
    });

    const englishRow = document.createElement("div");
    englishRow.className = "english-row";
    englishRow.textContent = line.en;
    englishRow.style.animationDelay = `${totalDelay + line.zh.length * 130 + 250}ms`;

    lineElement.appendChild(hanziRow);
    lineElement.appendChild(englishRow);

    inkStory.appendChild(lineElement);

    totalDelay += line.zh.length * 130 + 1300;
  });
}
narrateBtn.addEventListener("click", () => {
  const activeTitle = modalTitle.textContent;
  const activeLegend = legends.find((legend) => legend.title === activeTitle);

  if (!activeLegend) return;

  window.speechSynthesis.cancel();

  writeLegendInInk(activeLegend);

  const narrationText = activeLegend.inkLines
    ? activeLegend.inkLines.map((line) => line.en).join(" ")
    : activeLegend.story;

  const utterance = new SpeechSynthesisUtterance(narrationText);

  const selectedVoice = typeof getChineseFemaleVoice === "function"
    ? getChineseFemaleVoice()
    : null;

  if (selectedVoice) {
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
  } else {
    utterance.lang = "en-US";
  }

  utterance.rate = 0.72;
  utterance.pitch = 1.08;
  utterance.volume = 0.95;

  window.speechSynthesis.speak(utterance);
});

/* DAY / NIGHT THEME */

function loadTheme() {
  const savedTheme = localStorage.getItem("archiveTheme") || "night";

  document.body.classList.toggle("day-theme", savedTheme === "day");

  if (themeToggle) {
    themeToggle.textContent = savedTheme === "day" ? "☀ Day" : "☾ Night";
  }
}

function toggleTheme() {
  const isDay = document.body.classList.toggle("day-theme");
  const newTheme = isDay ? "day" : "night";

  localStorage.setItem("archiveTheme", newTheme);

  themeToggle.textContent = isDay ? "☀ Day" : "☾ Night";

  showSpiritMessage(
    isDay
      ? "Morning light spills across the archive."
      : "The moon returns to guard the scrolls."
  );
}

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

/* FALLING PETALS AND SPIRIT MOTES */

function createPetalLayer() {
  if (!petalLayer) return;

  petalLayer.innerHTML = "";

  const isMobile = window.innerWidth < 600;
  const petalCount = isMobile ? 16 : 34;
  const moteCount = isMobile ? 10 : 22;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("span");
    petal.className = "falling-petal";

    petal.style.setProperty("--start-x", `${Math.random() * 100}vw`);
    petal.style.setProperty("--size", `${Math.random() * 12 + 8}px`);
    petal.style.setProperty("--duration", `${Math.random() * 10 + 12}s`);
    petal.style.setProperty("--delay", `${Math.random() * -20}s`);
    petal.style.setProperty("--opacity", `${Math.random() * 0.42 + 0.28}`);

    petalLayer.appendChild(petal);
  }

  for (let i = 0; i < moteCount; i++) {
    const mote = document.createElement("span");
    mote.className = "spirit-mote";

    mote.style.setProperty("--start-x", `${Math.random() * 100}vw`);
    mote.style.setProperty("--size", `${Math.random() * 4 + 2}px`);
    mote.style.setProperty("--duration", `${Math.random() * 9 + 10}s`);
    mote.style.setProperty("--delay", `${Math.random() * -18}s`);
    mote.style.setProperty("--opacity", `${Math.random() * 0.5 + 0.22}`);

    petalLayer.appendChild(mote);
  }
}

/* CHINESE-STYLE CORNER ORNAMENTS */

function addCornerOrnaments(element) {
  if (!element || element.classList.contains("ornamented")) return;

  element.classList.add("ornamented");

  const corners = ["top-left", "top-right", "bottom-right", "bottom-left"];

  corners.forEach((corner) => {
    const span = document.createElement("span");
    span.className = `ornament-corner ${corner}`;
    element.appendChild(span);
  });
}

function decorateStaticPanels() {
  const panels = document.querySelectorAll(
    ".section-heading, .drama-form, .journal-card, .portal-card"
  );

  panels.forEach((panel) => addCornerOrnaments(panel));
}

/* DRAMA TRACKER */

const dramaForm = document.getElementById("dramaForm");
const dramaTitle = document.getElementById("dramaTitle");
const dramaStatus = document.getElementById("dramaStatus");
const dramaRating = document.getElementById("dramaRating");
const dramaTrailer = document.getElementById("dramaTrailer");
const dramaNotes = document.getElementById("dramaNotes");
const dramaList = document.getElementById("dramaList");
const tabButtons = document.querySelectorAll(".tab-btn");

const dramaModal = document.getElementById("dramaModal");
const closeDramaModal = document.getElementById("closeDramaModal");
const dramaModalTitle = document.getElementById("dramaModalTitle");
const dramaModalStatus = document.getElementById("dramaModalStatus");
const dramaModalRating = document.getElementById("dramaModalRating");
const dramaModalNotes = document.getElementById("dramaModalNotes");
const dramaTrailerWrap = document.getElementById("dramaTrailerWrap");
const dramaTrailerFrame = document.getElementById("dramaTrailerFrame");
const noTrailerMessage = document.getElementById("noTrailerMessage");


/* DRAMA TRACKER */

let activeDramaFilter = "All";

function getDramas() {
  return JSON.parse(localStorage.getItem("dramaArchive")) || [];
}

function saveDramas(dramas) {
  localStorage.setItem("dramaArchive", JSON.stringify(dramas));
}

function renderDramas() {
  const dramas = getDramas();

  const filteredDramas =
    activeDramaFilter === "All"
      ? dramas
      : dramas.filter((drama) => drama.status === activeDramaFilter);

  dramaList.innerHTML = "";

  if (filteredDramas.length === 0) {
    dramaList.innerHTML = `
      <div class="drama-card">
        <p>No drama scrolls here yet.</p>
      </div>
    `;
    return;
  }

  filteredDramas.forEach((drama) => {
    const card = document.createElement("article");
    card.className = "drama-card drama-scroll-card";

    const hasTrailer = Boolean(getYouTubeId(drama.trailerUrl || ""));

    card.innerHTML = `
      <div class="drama-card-header">
        <div>
          <h3>${escapeHTML(drama.title)}</h3>
          <p>${escapeHTML(drama.rating || "Unrated")}</p>
          ${hasTrailer ? `<span class="trailer-pill">Trailer sealed inside</span>` : ""}
        </div>

        <span class="status-pill">${escapeHTML(drama.status)}</span>
      </div>

      <p>${escapeHTML(drama.notes || "No notes yet.")}</p>

      <p class="open-scroll-hint">Click to open the scroll</p>

      <button class="delete-btn" data-id="${drama.id}">
        Remove Scroll
      </button>
    `;

    card.addEventListener("click", () => {
      openDramaScroll(drama);
    });

    const deleteButton = card.querySelector(".delete-btn");

    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteDrama(drama.id);
    });

    addCornerOrnaments(card);

    dramaList.appendChild(card);
  });
}

function deleteDrama(id) {
  const dramas = getDramas().filter((drama) => drama.id !== id);
  saveDramas(dramas);
  renderDramas();
  async function submitDramaToCommunity(drama) {
  if (!archiveSupabase) {
    showSpiritMessage("Community archive is not connected yet.");
    return;
  }

  const { error } = await archiveSupabase
    .from("drama_submissions")
    .insert({
      title: drama.title,
      status: drama.status,
      rating: drama.rating,
      trailer_url: drama.trailerUrl,
      notes: drama.notes,
      submitted_by: drama.submittedBy,
      approved: false
    });

  if (error) {
    console.error(error);
    showSpiritMessage("The public archive rejected the scroll. Check Supabase.");
    return;
  }

  showSpiritMessage("Your drama was offered to the public archive for approval.");
}

async function loadCommunityDramas() {
  if (!communityDramaList) return;

  if (!archiveSupabase) {
    communityDramaList.innerHTML = `
      <div class="drama-card">
        <p>Community archive is not connected yet.</p>
      </div>
    `;
    return;
  }

  const { data, error } = await archiveSupabase
    .from("drama_submissions")
    .select("id,title,status,rating,trailer_url,notes,submitted_by,created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    communityDramaList.innerHTML = `
      <div class="drama-card">
        <p>The community archive could not be opened.</p>
      </div>
    `;
    return;
  }

  renderCommunityDramas(data || []);
}

function renderCommunityDramas(rows) {
  if (!communityDramaList) return;

  communityDramaList.innerHTML = "";

  if (rows.length === 0) {
    communityDramaList.innerHTML = `
      <div class="drama-card">
        <p>No approved community drama scrolls yet.</p>
      </div>
    `;
    return;
  }

  rows.forEach((row) => {
    const drama = {
      id: row.id,
      title: row.title,
      status: row.status,
      rating: row.rating || "Unrated",
      trailerUrl: row.trailer_url || "",
      notes: row.notes || "",
      submittedBy: row.submitted_by || "Anonymous cultivator",
      createdAt: row.created_at
    };

    const card = document.createElement("article");
    card.className = "drama-card drama-scroll-card";

    const hasTrailer = Boolean(getYouTubeId(drama.trailerUrl));

    card.innerHTML = `
      <div class="drama-card-header">
        <div>
          <h3>${escapeHTML(drama.title)}</h3>
          <p>${escapeHTML(drama.rating)}</p>
          <p class="submitted-by">Offered by ${escapeHTML(drama.submittedBy)}</p>
          ${hasTrailer ? `<span class="trailer-pill">Trailer sealed inside</span>` : ""}
        </div>

        <span class="status-pill">${escapeHTML(drama.status)}</span>
      </div>

      <p>${escapeHTML(drama.notes || "No notes yet.")}</p>
      <p class="open-scroll-hint">Click to open the public scroll</p>
    `;

    card.addEventListener("click", () => {
      openDramaScroll(drama);
    });

    addCornerOrnaments(card);
    communityDramaList.appendChild(card);
  });
}

if (refreshCommunityDramas) {
  refreshCommunityDramas.addEventListener("click", loadCommunityDramas);
}
  showSpiritMessage("The scroll fades from the archive.");
}

dramaForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const dramas = getDramas();

  const newDrama = {
    id: crypto.randomUUID(),
    title: dramaTitle.value.trim(),
    status: dramaStatus.value,
    rating: dramaRating.value,
    trailerUrl: dramaTrailer.value.trim(),
    notes: dramaNotes.value.trim(),
    submittedBy: dramaSubmitter.value.trim() || "Anonymous cultivator",
    createdAt: new Date().toISOString()
  };

  dramas.unshift(newDrama);
  saveDramas(dramas);

  if (submitToPublic && submitToPublic.checked) {
    await submitDramaToCommunity(newDrama);
  }

  dramaForm.reset();
  renderDramas();
  loadCommunityDramas();

  showSpiritMessage("A new drama scroll has been sealed into memory.");
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => btn.classList.remove("active-tab"));
    button.classList.add("active-tab");

    activeDramaFilter = button.dataset.filter;
    renderDramas();
  });
});

function openDramaScroll(drama) {
  dramaModalTitle.textContent = drama.title;
  dramaModalStatus.textContent = drama.status;
  dramaModalRating.textContent = drama.rating || "Unrated";
  dramaModalNotes.textContent = drama.notes || "No memory notes have been written for this drama yet.";

  const youtubeId = getYouTubeId(drama.trailerUrl || "");

  if (youtubeId) {
    dramaTrailerFrame.src = `https://www.youtube.com/embed/${youtubeId}`;
    dramaTrailerWrap.classList.remove("hidden");
    noTrailerMessage.classList.add("hidden");
  } else {
    dramaTrailerFrame.src = "";
    dramaTrailerWrap.classList.add("hidden");
    noTrailerMessage.classList.remove("hidden");
  }

  dramaModal.classList.remove("hidden");
  showSpiritMessage("The drama scroll opens.");
}

function closeDramaScroll() {
  dramaModal.classList.add("hidden");

  // This stops the YouTube video from continuing to play after closing.
  dramaTrailerFrame.src = "";
}

closeDramaModal.addEventListener("click", closeDramaScroll);

dramaModal.addEventListener("click", (event) => {
  if (event.target === dramaModal) {
    closeDramaScroll();
  }
});

function getYouTubeId(url) {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url.trim());
    const hostname = parsedUrl.hostname.replace("www.", "");

    if (hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1).split(/[?&]/)[0];
    }

    if (hostname.includes("youtube.com")) {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v") || "";
      }

      if (parsedUrl.pathname.startsWith("/embed/")) {
        return parsedUrl.pathname.split("/embed/")[1]?.split(/[?&]/)[0] || "";
      }

      if (parsedUrl.pathname.startsWith("/shorts/")) {
        return parsedUrl.pathname.split("/shorts/")[1]?.split(/[?&]/)[0] || "";
      }
    }
  } catch {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : "";
  }

  return "";
}

/* JOURNAL */

const journalEntry = document.getElementById("journalEntry");
const saveJournal = document.getElementById("saveJournal");
const clearJournal = document.getElementById("clearJournal");
const savedJournal = document.getElementById("savedJournal");

function getJournalNotes() {
  return JSON.parse(localStorage.getItem("spiritJournal")) || [];
}

function saveJournalNotes(notes) {
  localStorage.setItem("spiritJournal", JSON.stringify(notes));
}

function renderJournal() {
  const notes = getJournalNotes();

  savedJournal.innerHTML = "";

  if (notes.length === 0) {
    savedJournal.innerHTML = `<p class="memory-note">No memories saved yet.</p>`;
    return;
  }

  notes.forEach((note) => {
    const div = document.createElement("div");
    div.className = "memory-note";
    div.textContent = note.text;
    addCornerOrnaments(div);

    savedJournal.appendChild(div);
  });
}

saveJournal.addEventListener("click", () => {
  const text = journalEntry.value.trim();

  if (!text) {
    showSpiritMessage("The page is empty. Give the ink a memory first.");
    return;
  }

  const notes = getJournalNotes();

  notes.unshift({
    text,
    createdAt: new Date().toISOString()
  });

  saveJournalNotes(notes);
  journalEntry.value = "";
  renderJournal();

  showSpiritMessage("Your memory has been saved in the Ink Pavilion.");
});

clearJournal.addEventListener("click", () => {
  journalEntry.value = "";
});

/* SPIRIT COMPANION */

const spiritLines = [
  "Some legends are warnings. Some are love letters.",
  "The moon remembers every story told beneath it.",
  "A good drama leaves behind an echo.",
  "The archive grows stronger when you return.",
  "Not every spirit is meant to be feared."
];

function showSpiritMessage(message) {
  spiritMessage.textContent = message;
  spiritMessage.classList.add("show");

  clearTimeout(showSpiritMessage.timeout);

  showSpiritMessage.timeout = setTimeout(() => {
    spiritMessage.classList.remove("show");
  }, 4200);
}

spiritCompanion.addEventListener("click", () => {
  const randomLine = spiritLines[Math.floor(Math.random() * spiritLines.length)];
  showSpiritMessage(randomLine);
});

/* CHINESE AMBIENT SOUND */

if (soundToggle && homepageAmbient) {
  soundToggle.addEventListener("click", () => {
    if (!soundOn) {
      startAmbientSound();
    } else {
      stopAmbientSound();
    }
  });
}

function startAmbientSound() {
  if (!homepageAmbient) return;

  const activeSection = document.querySelector(".realm-section.active-section");
  const isHomepage = activeSection && activeSection.id === "entrance";

  homepageAmbient.volume = 0;
  homepageAmbient.currentTime = homepageAmbient.currentTime || 0;

  homepageAmbient.play()
    .then(() => {
      soundOn = true;
      soundToggle.textContent = "♫ Guqin On";

      fadeAmbientTo(isHomepage ? 0.28 : 0.08);

      showSpiritMessage("Guqin strings awaken within the archive.");
    })
    .catch(() => {
      showSpiritMessage("Tap again to awaken the archive music.");
    });
}

function stopAmbientSound() {
  if (!homepageAmbient) return;

  fadeAmbientTo(0, () => {
    homepageAmbient.pause();
  });

  soundOn = false;
  soundToggle.textContent = "♫ Ambient";

  showSpiritMessage("The music fades back into mist.");
}

function fadeAmbientTo(targetVolume, afterFade) {
  if (!homepageAmbient) return;

  clearInterval(fadeAmbientTo.interval);

  fadeAmbientTo.interval = setInterval(() => {
    const difference = targetVolume - homepageAmbient.volume;

    if (Math.abs(difference) < 0.01) {
      homepageAmbient.volume = targetVolume;
      clearInterval(fadeAmbientTo.interval);

      if (afterFade) {
        afterFade();
      }

      return;
    }

    homepageAmbient.volume += difference * 0.08;
  }, 30);
}

function adjustAmbientForRealm(realmId) {
  if (!homepageAmbient || !soundOn) return;

  if (realmId === "entrance") {
    fadeAmbientTo(0.28);
  } else {
    fadeAmbientTo(0.08);
  }
}

/* SPIRIT PARTICLES */

const canvas = document.getElementById("spiritCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];

  const particleCount = Math.min(90, Math.floor(window.innerWidth / 18));

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.2 + 0.6,
      speedX: Math.random() * 0.4 - 0.2,
      speedY: Math.random() * 0.5 + 0.15,
      alpha: Math.random() * 0.6 + 0.15
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    const dx = mouse.x - particle.x;
    const dy = mouse.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 120) {
      particle.x -= dx * 0.004;
      particle.y -= dy * 0.004;
    }

    particle.x += particle.speedX;
    particle.y -= particle.speedY;

    if (particle.y < -10) {
      particle.y = canvas.height + 10;
      particle.x = Math.random() * canvas.width;
    }

    if (particle.x < -10) {
      particle.x = canvas.width + 10;
    }

    if (particle.x > canvas.width + 10) {
      particle.x = -10;
    }

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(142, 230, 192, ${particle.alpha})`;
    ctx.shadowColor = "rgba(142, 230, 192, 0.8)";
    ctx.shadowBlur = 12;
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
  createPetalLayer();
});

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

/* HELPERS */

function escapeHTML(text) {
  return text.replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return replacements[character];
  });
}

/* INIT */

loadTheme();
createPetalLayer();
decorateStaticPanels();

renderLegends();
renderDramas();
renderJournal();
loadCommunityDramas();

resizeCanvas();
createParticles();
animateParticles();

setTimeout(() => {
  showSpiritMessage("Welcome, traveler. The archive has been waiting.");
}, 800);