// Studiesite – routing, weergave van theorie, quiz en flashcards.
(function () {
  "use strict";

  const COURSES = window.COURSES;
  const app = document.getElementById("app");
  const sidebar = document.getElementById("sidebar");
  const STORE_KEY = "studiesite-voortgang-v1";
  const SESSION_KEY = "studiesite-sessie-v1";

  // ---------- voortgang (lokaal in de browser) ----------
  let progress = {};
  try {
    progress = JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch (e) {
    progress = {};
  }
  function saveProgress() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(progress));
    } catch (e) { /* opslag niet beschikbaar: de site werkt gewoon verder */ }
  }
  // Een lopende quiz per onderdeel ("cs/m5" of "cs/mix"), zodat je naar de theorie
  // kan en daarna verdergaat waar je gebleven was.
  let sessions = {};
  try {
    sessions = JSON.parse(localStorage.getItem(SESSION_KEY)) || {};
  } catch (e) {
    sessions = {};
  }
  function saveSessions() {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessions));
    } catch (e) { /* opslag niet beschikbaar */ }
  }
  function clearSession(routeKey) {
    if (sessions[routeKey]) { delete sessions[routeKey]; saveSessions(); }
  }
  // Een vraag terugvinden via haar sleutel "vak/module/index".
  function itemFromKey(key, showFrom) {
    const parts = String(key).split("/");
    const course = findCourse(parts[0]);
    if (!course) return null;
    const mod = (course.modules || []).find(m => m.id === parts[1]);
    const q = mod && mod.quiz[Number(parts[2])];
    if (!q) return null;
    return showFrom ? { q, key, from: mod.title } : { q, key };
  }
  function loadSession(routeKey) {
    const saved = sessions[routeKey];
    if (!saved || !Array.isArray(saved.keys)) return null;
    const items = saved.keys.map(k => itemFromKey(k, saved.showFrom));
    if (items.some(it => !it)) { clearSession(routeKey); return null; }   // leerstof gewijzigd
    if (!(saved.index > 0) || saved.index >= items.length) return null;   // niets of alles gedaan
    return {
      items: items,
      missed: (saved.missed || []).map(k => itemFromKey(k, saved.showFrom)).filter(Boolean),
      results: saved.results || [],
      index: saved.index, right: saved.right || 0,
      streak: saved.streak || 0, bestStreak: saved.bestStreak || 0,
      noCombo: !!saved.noCombo, earned: saved.earned || 0
    };
  }

  function qKey(course, mod, index) {
    return course.id + "/" + mod.id + "/" + index;
  }
  function modStats(course, mod) {
    const total = (mod.quiz || []).length;
    let done = 0;
    let wrong = 0;
    for (let i = 0; i < total; i++) {
      const v = progress[qKey(course, mod, i)];
      if (v === 1) done++;
      else if (v === 2) wrong++;
    }
    return { done, wrong, total };
  }
  function courseStats(course) {
    let done = 0, total = 0;
    (course.modules || []).forEach(m => {
      const s = modStats(course, m);
      done += s.done; total += s.total;
    });
    return { done, total };
  }
  function pct(s) {
    return s.total ? Math.round((s.done / s.total) * 100) : 0;
  }

  // ---------- kleine hulpjes ----------
  function h(tag, attrs, html) {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === "class") el.className = attrs[k];
      else el.setAttribute(k, attrs[k]);
    }
    if (html !== undefined) el.innerHTML = html;
    return el;
  }
  // Tekst uit de vragen: HTML ontsnappen, `code` omzetten naar <code>
  function fmt(text) {
    return esc(text).replace(/`([^`]+)`/g, "<code>$1</code>");
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function findCourse(id) { return COURSES.find(c => c.id === id); }

  // Eén toetsenbord-handler tegelijk; wordt opgeruimd bij elke navigatie.
  let keyHandler = null;
  function setKeys(fn) {
    if (keyHandler) document.removeEventListener("keydown", keyHandler);
    keyHandler = fn;
    if (fn) document.addEventListener("keydown", fn);
  }

  const calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Kleine confetti-regen bij een perfecte score.
  function confetti(host) {
    if (calm) return;
    const colors = ["#0b6e69", "#5fd0c8", "#f0c060", "#1f7a3d", "#e8734a"];
    const layer = h("div", { class: "confetti" });
    for (let i = 0; i < 36; i++) {
      const piece = h("i");
      piece.style.left = Math.random() * 100 + "%";
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = (Math.random() * 0.45).toFixed(2) + "s";
      piece.style.animationDuration = (1.5 + Math.random()).toFixed(2) + "s";
      piece.style.transform = "rotate(" + Math.floor(Math.random() * 360) + "deg)";
      layer.appendChild(piece);
    }
    host.appendChild(layer);
    setTimeout(() => layer.remove(), 3200);
  }

  // Balkjes vullen zich na het renderen, zodat je de voortgang ziet groeien.
  function animateBars(root) {
    const bars = root.querySelectorAll(".bar > i");
    bars.forEach(el => {
      const w = el.style.width;
      if (calm) return;
      el.style.width = "0%";
      requestAnimationFrame(() => requestAnimationFrame(() => { el.style.width = w; }));
    });
  }

  // ---------- zijbalk ----------
  function renderSidebar(route) {
    let html = '<a href="#/" class="' + (route.length === 0 ? "active" : "") + '">Overzicht</a>' +
      '<a href="#/badges" class="' + (route[0] === "badges" ? "active" : "") + '">Badges<span class="dot" data-badge-dot hidden></span></a>' +
      '<a href="#/shop" class="' + (route[0] === "shop" ? "active" : "") + '">Shop</a>' +
      '<a href="#/kamer" class="' + (route[0] === "kamer" ? "active" : "") + '">Je kamer</a>';
    COURSES.forEach(course => {
      html += "<h4>" + esc(course.code || "") + "</h4>";
      const cActive = route[0] === course.id && route.length === 1;
      if (course.status === "todo") {
        html += '<a class="course-link todo ' + (cActive ? "active" : "") + '" href="#/' + course.id + '">' +
          esc(course.title) + '<span class="pct">nog te maken</span></a>';
        return;
      }
      html += '<a class="course-link ' + (cActive ? "active" : "") + '" href="#/' + course.id + '">' +
        esc(course.title) + '<span class="pct">' + pct(courseStats(course)) + "%</span></a>";
      course.modules.forEach(m => {
        const active = route[0] === course.id && route[1] === m.id;
        const s = modStats(course, m);
        html += '<a class="' + (active ? "active" : "") + '" href="#/' + course.id + "/" + m.id + '">' +
          esc(m.title) + '<span class="pct">' + (s.total ? s.done + "/" + s.total : "") + "</span></a>";
      });
    });
    sidebar.innerHTML = html;
    document.querySelectorAll("#tabbar [data-tab]").forEach(a => a.classList.toggle("active", a.dataset.tab === route[0]));
    Game.refreshCoins();
  }

  // ---------- pagina's ----------
  function renderHome() {
    const wrap = h("div", { class: "content" });
    wrap.appendChild(h("h1", null, "Studiesite Toegepaste Informatica"));
    wrap.appendChild(h("p", { class: "lead" },
      "Theorie en oefenvragen per vak en per module. Je voortgang wordt bewaard in deze browser."));
    const cards = h("div", { class: "cards" });
    COURSES.forEach(course => {
      if (course.status === "todo") {
        cards.appendChild(h("a", { class: "card is-todo", href: "#/" + course.id },
          "<h3>" + esc(course.title) + "</h3>" +
          '<div class="meta">' + esc(course.code) + '</div><p><span class="badge">Nog te maken</span></p>'));
        return;
      }
      const s = courseStats(course);
      cards.appendChild(h("a", { class: "card", href: "#/" + course.id },
        "<h3>" + esc(course.title) + "</h3>" +
        '<div class="meta">' + esc(course.code) + " · " + course.modules.length + " modules · " + s.total + " vragen</div>" +
        '<div class="bar"><i style="width:' + pct(s) + '%"></i></div>' +
        '<div class="meta">' + s.done + " van " + s.total + " vragen juist beantwoord</div>"));
    });
    wrap.appendChild(cards);
    const reset = h("button", { class: "btn ghost", type: "button" }, "Alles wissen");
    reset.addEventListener("click", () => {
      if (window.confirm("Alles wissen: je voortgang, punten, badges en spullen?")) {
        progress = {}; saveProgress(); sessions = {}; saveSessions(); Game.reset(); route();
      }
    });
    wrap.appendChild(reset);

    // ---- voortgang meenemen naar een ander toestel ----
    const KEYS = [STORE_KEY, SESSION_KEY, "studiesite-spel-v1"];
    const box = h("div", { class: "transfer" },
      "<h2>Verder op een ander toestel</h2>" +
      "<p>Je voortgang, punten en spullen staan alleen in deze browser. Met een code neem je ze mee, bijvoorbeeld van je laptop naar je gsm.</p>" +
      '<div class="btn-row"><button type="button" class="btn ghost" data-act="export">Code kopiëren</button>' +
      '<button type="button" class="btn ghost" data-act="show">Code plakken</button></div>' +
      '<div class="transfer-in" hidden><textarea rows="4" placeholder="Plak hier de code van je andere toestel" aria-label="Code"></textarea>' +
      '<button type="button" class="btn" data-act="import">Overnemen</button></div><p class="transfer-msg muted" role="status"></p>');
    const msg = box.querySelector(".transfer-msg"), area = box.querySelector("textarea");
    box.addEventListener("click", e => {
      const act = e.target.dataset && e.target.dataset.act;
      if (act === "export") {
        const data = {};
        try { KEYS.forEach(k => { data[k] = localStorage.getItem(k); }); } catch (err) { /* geen opslag */ }
        const code = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
        const shown = () => { box.querySelector(".transfer-in").hidden = false; area.value = code; area.select(); msg.textContent = "Kopieer de code hierboven en plak ze op je andere toestel."; };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(() => { msg.textContent = "Code gekopieerd. Stuur ze naar jezelf en plak ze op je andere toestel."; }, shown);
        } else shown();
      } else if (act === "show") {
        box.querySelector(".transfer-in").hidden = false; area.value = ""; area.focus();
      } else if (act === "import") {
        let data = null;
        try { data = JSON.parse(decodeURIComponent(escape(atob(area.value.trim())))); } catch (err) { data = null; }
        if (!data || typeof data !== "object" || !(STORE_KEY in data)) { msg.textContent = "Deze code klopt niet. Kopieer ze opnieuw, volledig."; return; }
        if (!window.confirm("De voortgang op dit toestel vervangen door die uit de code?")) return;
        try {
          KEYS.forEach(k => { if (typeof data[k] === "string") localStorage.setItem(k, data[k]); else localStorage.removeItem(k); });
        } catch (err) { msg.textContent = "Opslaan lukt niet in deze browser."; return; }
        location.reload();
      }
    });
    wrap.appendChild(box);
    return wrap;
  }

  function renderCourse(course) {
    const wrap = h("div", { class: "content" });
    wrap.appendChild(h("div", { class: "crumbs" }, '<a href="#/">Overzicht</a> ›'));
    wrap.appendChild(h("h1", null, esc(course.title)));
    if (course.status === "todo") {
      wrap.appendChild(h("p", null, '<span class="badge">Nog te maken</span>'));
      wrap.appendChild(h("p", { class: "lead" }, esc(course.intro ||
        "Voor dit vak is er nog geen leerstof toegevoegd. De theorie en oefenvragen moeten nog gemaakt worden.")));
      return wrap;
    }
    wrap.appendChild(h("p", { class: "lead" }, esc(course.intro || "")));
    const mix = h("a", { class: "btn", href: "#/" + course.id + "/mix" }, "Examenmix: 15 willekeurige vragen");
    wrap.appendChild(mix);
    const cards = h("div", { class: "cards" });
    course.modules.forEach(m => {
      const s = modStats(course, m);
      cards.appendChild(h("a", { class: "card", href: "#/" + course.id + "/" + m.id },
        "<h3>" + esc(m.title) + "</h3>" +
        '<div class="meta">' + esc(m.summary || "") + "</div>" +
        '<div class="bar"><i style="width:' + pct(s) + '%"></i></div>' +
        '<div class="meta">' + s.done + "/" + s.total + " vragen juist</div>"));
    });
    wrap.appendChild(cards);
    return wrap;
  }

  function renderModule(course, mod, tab) {
    const wrap = h("div", { class: "content" });
    wrap.appendChild(h("div", { class: "crumbs" },
      '<a href="#/">Overzicht</a> › <a href="#/' + course.id + '">' + esc(course.title) + "</a> ›"));
    wrap.appendChild(h("h1", null, esc(mod.title)));

    const tabs = h("div", { class: "tabs" });
    const body = h("div");
    const defs = [["theorie", "Theorie"], ["quiz", "Quiz (" + mod.quiz.length + ")"], ["flashcards", "Flashcards"]];
    defs.forEach(([id, label]) => {
      const b = h("button", { type: "button", class: id === tab ? "active" : "" }, label);
      b.addEventListener("click", () => { location.hash = "#/" + course.id + "/" + mod.id + "/" + id; });
      tabs.appendChild(b);
    });
    wrap.appendChild(tabs);
    wrap.appendChild(body);

    if (tab === "quiz") {
      quizStart(body, course, mod);
    } else if (tab === "flashcards") {
      runFlashcards(body, mod.quiz);
    } else {
      const running = sessions[course.id + "/" + mod.id];
      if (running && running.index) {
        body.appendChild(h("p", { class: "resume" },
          'Je quiz loopt nog: vraag ' + (running.index + 1) + " van " + running.keys.length +
          '. <a href="#/' + course.id + "/" + mod.id + '/quiz">Verder met de quiz</a>'));
      }
      if (mod.goals && mod.goals.length) {
        body.appendChild(h("div", { class: "goals" },
          "<h3>Wat je moet kunnen</h3><ul>" + mod.goals.map(g => "<li>" + g + "</li>").join("") + "</ul>"));
      }
      body.appendChild(h("div", { class: "theory" }, mod.theory));
      const go = h("a", { class: "btn", href: "#/" + course.id + "/" + mod.id + "/quiz" },
        running && running.index ? "Verder met de quiz" : "Naar de quiz");
      body.appendChild(go);
    }
    return wrap;
  }

  function renderMix(course) {
    const wrap = h("div", { class: "content" });
    wrap.appendChild(h("div", { class: "crumbs" },
      '<a href="#/">Overzicht</a> › <a href="#/' + course.id + '">' + esc(course.title) + "</a> ›"));
    wrap.appendChild(h("h1", null, "Examenmix"));
    wrap.appendChild(h("p", { class: "lead" }, "15 willekeurige vragen uit alle modules van " + esc(course.title) + "."));
    let all = [];
    course.modules.forEach(m => m.quiz.forEach((q, i) => all.push({ q, key: qKey(course, m, i), from: m.title })));
    const body = h("div");
    wrap.appendChild(body);
    const routeKey = course.id + "/mix";
    const opts = { back: "#/" + course.id, routeKey: routeKey, keepOrder: true, showFrom: true, mix: true };
    const open_ = loadSession(routeKey);
    if (open_) runQuiz(body, open_.items, Object.assign({ resume: open_ }, opts));
    else runQuiz(body, shuffle(all).slice(0, 15), opts);
    return wrap;
  }

  // ---------- startscherm van een modulequiz ----------
  // Loopt er nog een quiz? Dan gaan we daar meteen mee verder. Anders toont dit scherm
  // wat er al gedaan is en kan je kiezen: enkel de foute vragen, de openstaande vragen,
  // alles opnieuw, of het hoofdstuk wissen.
  function quizStart(container, course, mod) {
    const routeKey = course.id + "/" + mod.id;
    const back = "#/" + routeKey + "/quiz";
    const items = mod.quiz.map((q, i) => ({ q, key: qKey(course, mod, i) }));
    const opts = { back: back, routeKey: routeKey, moduleTotal: items.length };
    const retry = Object.assign({}, opts, { noCombo: true });   // herkansing: punten, maar geen combo

    const open_ = loadSession(routeKey);
    if (open_) return runQuiz(container, open_.items, Object.assign({ resume: open_, noCombo: open_.noCombo }, opts));

    const wrong = items.filter(it => progress[it.key] === 2);
    const todo = items.filter(it => progress[it.key] !== 1);
    const s = modStats(course, mod);

    // Nog niets gedaan: meteen beginnen.
    if (s.done === 0 && s.wrong === 0) return runQuiz(container, items, opts);

    container.innerHTML = "";
    const card = h("div", { class: "q-card" });
    card.appendChild(h("p", { class: "q-text" }, "Je voortgang in dit hoofdstuk"));
    card.appendChild(h("p", { class: "stats" },
      '<span class="good">' + s.done + " juist</span> · " +
      '<span class="bad">' + s.wrong + " fout</span> · " +
      (s.total - s.done - s.wrong) + " nog niet gemaakt"));
    const row = h("div", { class: "btn-row" });
    function add(label, cls, fn) {
      const b = h("button", { type: "button", class: cls }, label);
      b.addEventListener("click", fn);
      row.appendChild(b);
    }
    if (wrong.length) {
      add("Foute vragen opnieuw (" + wrong.length + ")", "btn", () => runQuiz(container, wrong, retry));
    }
    if (todo.length > wrong.length) {
      add("Verdergaan: alles wat nog niet juist is (" + todo.length + ")", wrong.length ? "btn ghost" : "btn",
        () => runQuiz(container, todo, opts));
    }
    add("Alle vragen (" + items.length + ")", todo.length ? "btn ghost" : "btn", () => runQuiz(container, items, opts));
    add("Hoofdstuk opnieuw beginnen", "btn ghost danger", () => {
      if (!window.confirm("De voortgang van dit hoofdstuk wissen en opnieuw beginnen?")) return;
      items.forEach(it => { delete progress[it.key]; });
      saveProgress();
      clearSession(routeKey);
      renderSidebar(currentRoute());
      runQuiz(container, items, opts);
    });
    card.appendChild(row);
    container.appendChild(card);
  }

  // ---------- quiz ----------
  // opts: { back, routeKey, keepOrder, showFrom, resume }
  function runQuiz(container, items, opts) {
    opts = opts || {};
    const backHref = opts.back;
    const routeKey = opts.routeKey;
    const resume = opts.resume;

    const order = resume ? resume.items : (opts.keepOrder ? items : shuffle(items));
    const results = resume ? resume.results.slice() : new Array(order.length).fill(0);
    const missed = resume ? resume.missed.slice() : [];
    let index = resume ? resume.index : 0;
    let right = resume ? resume.right : 0;
    let streak = resume ? resume.streak : 0;
    let bestStreak = resume ? resume.bestStreak : 0;
    let earned = resume ? resume.earned : 0;          // punten verdiend in deze ronde
    const noCombo = !!opts.noCombo;

    // De stand wordt bij het begin van elke vraag bewaard, dus nooit midden in een vraag.
    // Zo tellen we een antwoord niet dubbel als je tussendoor naar de theorie gaat.
    function remember() {
      if (!routeKey) return;
      if (index <= 0 || index >= order.length) { clearSession(routeKey); return; }
      sessions[routeKey] = {
        keys: order.map(it => it.key), missed: missed.map(it => it.key),
        results: results, index: index, right: right,
        streak: streak, bestStreak: bestStreak, showFrom: !!opts.showFrom,
        noCombo: !!opts.noCombo, earned: earned
      };
      saveSessions();
    }

    function segments() {
      let html = "";
      for (let i = 0; i < order.length; i++) {
        const cls = results[i] === 1 ? "ok" : results[i] === 2 ? "ko" : (i === index ? "now" : "");
        html += '<i class="' + cls + '"></i>';
      }
      return html;
    }

    function tally() {
      const mult = noCombo ? 1 : Game.multiplier(streak + 1);   // wat het volgende juiste antwoord waard is
      return '<span class="count">' + right + "</span> juist" +
        (noCombo ? ' <span class="streak off">herkansing: geen combo</span>'
          : streak >= 2 ? ' <span class="streak' + (mult > 1 ? " hot" : "") + '">' + streak + " op rij" + (mult > 1 ? " · ×" + String(mult).replace(".", ",") : "") + "</span>" : "") +
        ' <span class="earned">+' + earned + "</span>";
    }

    function show() {
      remember();
      container.innerHTML = "";
      if (index >= order.length) return finish();
      const item = order[index], q = item.q;

      const head = h("div", { class: "quiz-head" },
        "<span>Vraag " + (index + 1) + " van " + order.length + (item.from ? " · " + esc(item.from) : "") + "</span>" +
        '<span class="tally">' + tally() + "</span>");
      container.appendChild(head);
      const segs = h("div", { class: "segs" }, segments());
      container.appendChild(segs);

      const card = h("div", { class: "q-card" });
      card.appendChild(h("p", { class: "q-text" }, fmt(q.q)));
      if (q.code) card.appendChild(h("pre", null, "<code>" + esc(q.code) + "</code>"));
      const list = h("div", { class: "options" });
      const shuffled = shuffle(q.o.map((text, i) => ({ text, correct: i === q.a })));
      shuffled.forEach((o, i) => {
        const b = h("button", { type: "button", class: "opt" },
          '<span class="key">' + (i + 1) + '</span><span class="label">' + fmt(o.text) + "</span>");
        b.addEventListener("click", () => answer(o, b));
        o.el = b;
        list.appendChild(b);
      });
      card.appendChild(list);
      container.appendChild(card);

      // onderaan: stoppen en opnieuw kiezen wat je wil oefenen
      if (routeKey && index === 0) {
        const quit = h("button", { type: "button", class: "linkish" }, "Andere vragen kiezen");
        quit.addEventListener("click", () => { clearSession(routeKey); route(); });
        container.appendChild(quit);
      }

      let answered = false;
      let next = null;
      setKeys(e => {
        if (e.target.tagName === "INPUT" || e.metaKey || e.ctrlKey || e.altKey) return;
        if (!answered) {
          const n = parseInt(e.key, 10);
          if (n >= 1 && n <= shuffled.length) { e.preventDefault(); shuffled[n - 1].el.click(); }
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(); if (next) next.click();
        }
      });

      function answer(chosen, btn) {
        if (answered) return;
        answered = true;
        shuffled.forEach(o => {
          o.el.disabled = true;
          o.el.classList.add("done");
          if (o.correct) o.el.classList.add("correct");
        });

        const before = progress[item.key];
        let gained = 0;
        if (chosen.correct) {
          right++; streak++;
          if (streak > bestStreak) bestStreak = streak;
          results[index] = 1;
          progress[item.key] = 1;
          btn.classList.add("pop");
          gained = Game.answer({ key: item.key, correct: true, al: before === 1, wasFout: before === 2,
                                 reeks: streak, zonderCombo: noCombo }).punten;
          earned += gained;
        } else {
          Game.answer({ key: item.key, correct: false });
          if (streak >= 3 && !noCombo) head.classList.add("combo-lost");
          streak = 0;
          results[index] = 2;
          btn.classList.add("wrong", "shake");
          if (!missed.some(m => m.key === item.key)) missed.push(item);
          progress[item.key] = 2;
        }
        saveProgress();
        renderSidebar(currentRoute());
        head.querySelector(".tally").innerHTML = tally();
        segs.innerHTML = segments();
        if (gained) {
          const plus = h("span", { class: "plus" }, "+" + gained);
          head.querySelector(".tally").appendChild(plus);
          setTimeout(() => plus.remove(), 900);
        }

        const fb = h("div", { class: "feedback " + (chosen.correct ? "ok" : "ko") },
          '<span class="verdict">' + (chosen.correct ? "Juist." : "Niet juist.") + "</span> " + fmt(q.e || ""));
        card.appendChild(fb);
        next = h("button", { type: "button", class: "btn" },
          index + 1 < order.length ? "Volgende vraag" : "Bekijk resultaat");
        next.addEventListener("click", () => { index++; show(); });
        card.appendChild(next);
        next.focus({ preventScroll: true });
        // op een klein scherm staat de knop vaak onder de rand: breng uitleg en knop in beeld
        next.scrollIntoView({ block: "nearest", behavior: calm ? "auto" : "smooth" });
      }
    }

    function finish() {
      setKeys(null);
      if (routeKey) clearSession(routeKey);
      const total = order.length;
      Game.roundDone({ routeKey: routeKey, total: total, moduleTotal: opts.moduleTotal, fout: total - right, mix: !!opts.mix });
      renderSidebar(currentRoute());
      const score = Math.round((right / total) * 100);
      const card = h("div", { class: "q-card result" });

      const circumference = 2 * Math.PI * 52;
      card.appendChild(h("div", { class: "ring-wrap" },
        '<svg class="ring ' + (score === 100 ? "perfect" : score >= 80 ? "great" : "") + '" viewBox="0 0 120 120" aria-hidden="true">' +
          '<circle class="track" cx="60" cy="60" r="52"></circle>' +
          '<circle class="fill" cx="60" cy="60" r="52" stroke-dasharray="' + circumference +
            '" stroke-dashoffset="' + circumference + '"></circle>' +
        "</svg>" +
        '<div class="ring-label"><span class="num">0</span><span class="of">van ' + total + "</span></div>"));

      const praise = score === 100 ? "Alles juist."
        : score >= 80 ? "Mooi resultaat."
        : score >= 50 ? "Goed op weg."
        : "Nog even oefenen.";
      card.appendChild(h("p", { class: "praise" }, praise +
        ' <span class="muted">+' + earned + " punten" + (bestStreak >= 3 && !noCombo ? " · langste reeks " + bestStreak : "") + ".</span>"));
      if (Game.unclaimed()) {
        card.appendChild(h("p", null, '<a class="badge-hint" href="#/badges">Er ligt een badge klaar om op te halen</a>'));
      }

      if (missed.length) {
        card.appendChild(h("p", { class: "muted" }, "Deze vragen had je fout:"));
        card.appendChild(h("ul", null, missed.map(m => "<li>" + fmt(m.q.q) + "</li>").join("")));
      }

      const row = h("div", { class: "btn-row" });
      if (missed.length) {
        const retry = h("button", { type: "button", class: "btn" }, "Foute vragen opnieuw (" + missed.length + ")");
        retry.addEventListener("click", () => runQuiz(container, missed, Object.assign({}, opts, { noCombo: true, resume: null })));
        row.appendChild(retry);
      }
      const again = h("button", { type: "button", class: missed.length ? "btn ghost" : "btn" }, "Opnieuw beginnen");
      again.addEventListener("click", () => runQuiz(container, items, Object.assign({}, opts, { resume: null })));
      row.appendChild(again);
      const back = h("a", { class: "btn ghost", href: backHref }, "Terug naar overzicht");
      back.addEventListener("click", () => { if (location.hash === backHref) route(); });
      row.appendChild(back);
      card.appendChild(row);

      container.innerHTML = "";
      container.appendChild(card);

      // de ring vult zich en het cijfer telt mee omhoog
      const fill = card.querySelector(".fill");
      const num = card.querySelector(".num");
      if (calm) {
        fill.style.strokeDashoffset = circumference * (1 - right / total);
        num.textContent = right;
      } else {
        requestAnimationFrame(() => {
          fill.style.strokeDashoffset = circumference * (1 - right / total);
        });
        const start = performance.now(), duration = 900;
        (function tick(now) {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          num.textContent = Math.round(right * eased);
          if (t < 1) requestAnimationFrame(tick);
          else num.textContent = right;
        })(start);
      }
      if (score === 100) setTimeout(() => confetti(card), 400);
    }

    show();
  }

  // ---------- flashcards ----------
  function runFlashcards(container, quiz) {
    const order = shuffle(quiz);
    let index = 0, flipped = false, busy = false;

    const head = h("div", { class: "quiz-head" }, "");
    const card = h("div", { class: "flash", tabindex: "0", role: "button", "aria-label": "Kaart draaien" });
    const row = h("div", { class: "btn-row" });
    const prev = h("button", { type: "button", class: "btn ghost" }, "Vorige");
    const next = h("button", { type: "button", class: "btn" }, "Volgende");
    row.appendChild(prev); row.appendChild(next);
    container.innerHTML = "";
    container.appendChild(head); container.appendChild(card); container.appendChild(row);

    function content() {
      const q = order[index];
      if (!flipped) {
        return '<div class="side">Vraag</div><p class="q-text">' + fmt(q.q) + "</p>" +
          (q.code ? "<pre><code>" + esc(q.code) + "</code></pre>" : "") +
          '<div class="hint">Klik, of druk op spatie, om te draaien</div>';
      }
      return '<div class="side">Antwoord</div><p class="answer">' + fmt(q.o[q.a]) + "</p><p>" + fmt(q.e || "") + "</p>";
    }

    function paint() {
      head.innerHTML = "<span>Kaart " + (index + 1) + " van " + order.length + "</span>" +
        '<span class="muted">← → bladeren</span>';
      card.innerHTML = content();
      card.classList.toggle("is-back", flipped);
    }

    // halve draai, inhoud wisselen, tweede helft: het voelt als een echt kaartje
    function flip() {
      if (busy) return;
      if (calm) { flipped = !flipped; if (flipped) Game.cardFlip(); paint(); return; }
      busy = true;
      card.classList.add("turning");
      setTimeout(() => {
        flipped = !flipped;
        if (flipped) Game.cardFlip();
        paint();
        card.classList.remove("turning");
        card.classList.add("turned");
        setTimeout(() => { card.classList.remove("turned"); busy = false; }, 180);
      }, 180);
    }

    function go(step) {
      index = (index + step + order.length) % order.length;
      flipped = false;
      paint();
      if (!calm) {
        card.classList.remove("slide");
        void card.offsetWidth;
        card.classList.add("slide");
      }
    }

    card.addEventListener("click", flip);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
    });
    prev.addEventListener("click", () => go(-1));
    next.addEventListener("click", () => go(1));
    setKeys(e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      else if (e.key === " " && e.target !== card) { e.preventDefault(); flip(); }
    });

    paint();
  }

  // ---------- routing ----------
  function currentRoute() {
    return location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  }
  function route() {
    const r = currentRoute();
    setKeys(null);          // oude toetsenbord-handler weg vóór de nieuwe pagina er is
    let page;
    const course = r[0] && findCourse(r[0]);
    if (r[0] === "badges") {
      page = Game.pageBadges();
    } else if (r[0] === "shop") {
      page = Game.pageShop();
    } else if (r[0] === "kamer") {
      page = Game.pageRoom();
    } else if (!course) {
      page = renderHome();
    } else if (!r[1] || course.status === "todo") {
      page = renderCourse(course);
    } else if (r[1] === "mix") {
      page = renderMix(course);
    } else {
      const mod = course.modules.find(m => m.id === r[1]);
      page = mod ? renderModule(course, mod, r[2] || "theorie") : renderCourse(course);
    }
    app.innerHTML = "";
    app.appendChild(page);
    animateBars(app);
    renderSidebar(r);
    sidebar.classList.remove("open");
    window.scrollTo(0, 0);
  }

  Game.init({ progress: () => progress, courses: COURSES });
  document.getElementById("menu-btn").addEventListener("click", () => sidebar.classList.toggle("open"));
  document.getElementById("tab-menu").addEventListener("click", () => sidebar.classList.toggle("open"));
  // tik naast het menu om het te sluiten
  app.addEventListener("click", () => sidebar.classList.remove("open"));
  window.addEventListener("hashchange", route);
  route();
})();
