// Spel: punten, combo, badges, shop, kisten en de kamer.
// Alles wordt lokaal in de browser bewaard, net als je voortgang.
window.Game = (function () {
  "use strict";

  const S = window.SPEL;
  const KEY = "studiesite-spel-v1";
  let env = { progress: () => ({}), courses: [] };

  // ---------- toestand ----------
  function fresh() {
    const owned = {};
    const room = {};
    S.ITEMS.forEach(it => { if (it.start) { owned[it.id] = 1; room[it.slot] = it.id; } });
    return {
      punten: 0, verdiend: 0,
      opgehaald: {},                 // badge-id -> true
      items: owned,                  // item-id -> 1
      kamer: room,                   // plek -> item-id
      themas: { standaard: 1 }, thema: "standaard",
      beloningen: S.REWARDS.map((r, i) => ({ id: "b" + i, name: r.name, prijs: r.prijs })),
      ingewisseld: [],               // { name, prijs, t }
      fouten: {},                    // vraagsleutel -> aantal keer fout
      foutloos: {},                  // "cs/m5" -> true
      dagen: {},                     // "2026-11-16" -> true
      stats: { rondes: 0, besteCombo: 0, kaarten: 0, aankopen: 0, rechtgezet: 0, perfecteMix: 0,
               nacht: 0, doorzetter: 0, legendarisch: 0, hoogsteSaldo: 0, kisten: 0 }
    };
  }
  let state = fresh();
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && typeof saved === "object") {
      const base = fresh();
      state = Object.assign(base, saved);
      state.stats = Object.assign(fresh().stats, saved.stats || {});
    }
  } catch (e) { /* geen opslag: het spel werkt, maar onthoudt niets */ }

  function save() {
    if (state.punten > state.stats.hoogsteSaldo) state.stats.hoogsteSaldo = state.punten;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* idem */ }
    refreshCoins();
  }

  // ---------- kleine hulpjes ----------
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function item(id) { return S.ITEMS.find(i => i.id === id); }
  function rar(r) { return S.RARITY[r]; }
  const calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function toast(html) {
    let box = document.getElementById("toasts");
    if (!box) { box = el("div", "toasts"); box.id = "toasts"; document.body.appendChild(box); }
    const t = el("div", "toast", html);
    box.appendChild(t);
    setTimeout(() => { t.classList.add("weg"); setTimeout(() => t.remove(), 400); }, 2600);
  }

  function refreshCoins(bump) {
    const c = document.getElementById("coins");
    if (!c) return;
    c.querySelector("b").textContent = state.punten;
    if (bump && !calm) { c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump"); }
    const n = unclaimed();
    document.querySelectorAll("[data-badge-dot]").forEach(d => { d.textContent = n ? n : ""; d.hidden = !n; });
  }

  function add(points) {
    state.punten += points; state.verdiend += points;
    save(); refreshCoins(true);
  }
  function spend(points) {
    if (state.punten < points) return false;
    state.punten -= points; state.stats.aankopen++;
    save();
    return true;
  }

  // ---------- kamerbonus ----------
  function bonus() {
    let b = 0;
    S.SLOTS.forEach(sl => { const it = item(state.kamer[sl.id]); if (it) b += rar(it.rarity).bonus; });
    return b;
  }

  // ---------- punten per antwoord ----------
  // reeks = aantal juiste antwoorden op rij, dit antwoord inbegrepen
  function multiplier(reeks) {
    const R = S.REGELS;
    return Math.min(R.comboMax, 1 + Math.floor(Math.max(reeks - 1, 0) / R.comboStap) * R.comboPlus);
  }

  // info: { key, correct, al (had je ze al juist), wasFout, reeks, zonderCombo }
  function answer(info) {
    const R = S.REGELS;
    const today = new Date();
    state.dagen[today.toISOString().slice(0, 10)] = true;

    if (!info.correct) {
      state.fouten[info.key] = (state.fouten[info.key] || 0) + 1;
      save();
      return { punten: 0, mult: 1 };
    }
    let base, mult = 1;
    if (info.zonderCombo) base = info.al ? R.herhaling : R.herkansing;
    else { base = info.al ? R.herhaling : R.eersteKeer; mult = multiplier(info.reeks); }

    if (!info.zonderCombo && info.reeks > state.stats.besteCombo) state.stats.besteCombo = info.reeks;
    if (info.wasFout) state.stats.rechtgezet++;
    if ((state.fouten[info.key] || 0) >= 3 && !info.al) state.stats.doorzetter++;
    if (today.getHours() < 5) state.stats.nacht++;

    const punten = Math.round(base * mult * (1 + bonus() / 100));
    add(punten);
    return { punten: punten, mult: mult };
  }

  // info: { routeKey, total, moduleTotal, fout, mix }
  function roundDone(info) {
    state.stats.rondes++;
    if (info.fout === 0) {
      if (info.mix && info.total >= 15) state.stats.perfecteMix++;
      if (!info.mix && info.moduleTotal && info.total === info.moduleTotal) state.foutloos[info.routeKey] = true;
    }
    save();
  }
  function cardFlip() { state.stats.kaarten++; save(); }

  // ---------- badges ----------
  function context() {
    const prog = env.progress();
    const c = { stats: state.stats, juist: 0, totaal: 0, hoofdstukkenUit: 0, vakUit: {}, vakFoutloos: {},
                foutloos: Object.keys(state.foutloos).length, dagen: Object.keys(state.dagen).length,
                plekken: S.SLOTS.length, plekkenGevuld: S.SLOTS.filter(s => state.kamer[s.id]).length };
    env.courses.forEach(course => {
      if (course.status !== "ready") return;
      let vakOk = true, vakFl = true;
      course.modules.forEach(m => {
        let ok = true;
        m.quiz.forEach((q, i) => {
          c.totaal++;
          if (prog[course.id + "/" + m.id + "/" + i] === 1) c.juist++; else ok = false;
        });
        if (ok) c.hoofdstukkenUit++; else vakOk = false;
        if (!state.foutloos[course.id + "/" + m.id]) vakFl = false;
      });
      c.vakUit[course.id] = vakOk; c.vakFoutloos[course.id] = vakFl;
    });
    return c;
  }
  function badgeStates() {
    const c = context();
    return S.BADGES.map(b => {
      let earned = false;
      try { earned = !!b.test(c); } catch (e) { earned = false; }
      return { b: b, earned: earned || !!state.opgehaald[b.id], claimed: !!state.opgehaald[b.id] };
    });
  }
  function unclaimed() { return badgeStates().filter(x => x.earned && !x.claimed).length; }

  function medal(color, dim) {
    return '<svg viewBox="0 0 48 48" class="medal" aria-hidden="true"><path d="M16 4 h16 l-4 14 h-8 z" fill="' + (dim ? "#9aa1ab" : "#b3261e") + '"/>' +
      '<circle cx="24" cy="29" r="14" fill="' + color + '"/><circle cx="24" cy="29" r="10" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2"/>' +
      '<path d="M24 21.5 l2.3 4.7 l5.2 .7 l-3.8 3.6 l.9 5.1 l-4.6 -2.4 l-4.6 2.4 l.9 -5.1 l-3.8 -3.6 l5.2 -.7 z" fill="#fff" fill-opacity=".9"/></svg>';
  }

  function pageBadges() {
    const wrap = el("div", "content");
    function render() {
      const all = badgeStates();
      const got = all.filter(x => x.claimed).length, ready = all.filter(x => x.earned && !x.claimed).length;
      let html = '<h1>Badges</h1><p class="lead">' + got + " van " + all.length + " opgehaald" +
        (ready ? ' · <strong class="ready">' + ready + " klaar om op te halen</strong>" : "") +
        ". Klik op een behaalde badge om de punten te krijgen.</p>";
      Object.keys(S.RARITY).forEach(rk => {
        const R = rar(rk);
        const list = all.filter(x => x.b.rarity === rk);
        html += '<h2 class="rar-title" style="--rar:' + R.color + '">' + R.label + ' <span>' + R.punten + " punten per badge</span></h2><div class=\"badges\">";
        list.forEach(x => {
          const secret = x.b.hidden && !x.earned;
          const cls = x.claimed ? "claimed" : x.earned ? "ready" : "locked";
          html += '<button type="button" class="badge-card ' + cls + '" style="--rar:' + R.color + '" data-id="' + x.b.id + '"' + (x.earned && !x.claimed ? "" : " disabled") + ">" +
            medal(x.earned ? R.color : "#c3c7cf", !x.earned) +
            '<span class="b-name">' + (secret ? "???" : esc(x.b.name)) + "</span>" +
            '<span class="b-text">' + (secret ? "Verborgen badge" : esc(x.b.text)) + "</span>" +
            '<span class="b-state">' + (x.claimed ? "✓ Opgehaald" : x.earned ? "Ophalen +" + R.punten : "Nog niet behaald") + "</span></button>";
        });
        html += "</div>";
      });
      wrap.innerHTML = html;
    }
    wrap.addEventListener("click", e => {
      const card = e.target.closest(".badge-card.ready");
      if (!card) return;
      const b = S.BADGES.find(x => x.id === card.dataset.id);
      if (!b || state.opgehaald[b.id]) return;
      state.opgehaald[b.id] = true;
      const p = rar(b.rarity).punten;
      add(p);
      toast("Badge <b>" + esc(b.name) + "</b> opgehaald: +" + p + " punten");
      card.classList.add("collect");
      setTimeout(render, calm ? 0 : 450);
    });
    render();
    return wrap;
  }

  // ---------- tekeningen ----------
  function tile(it) {
    return '<svg viewBox="' + it.box.join(" ") + '" class="item-art" aria-hidden="true">' + it.draw + "</svg>";
  }
  function skyline() {
    // silhouetten met verlichte raampjes, binnen het raam (x 92-184, y 26-98)
    const b = [[94, 70, 12], [107, 58, 14], [122, 76, 10], [133, 50, 13], [147, 66, 12], [160, 80, 9], [170, 60, 13]];
    let out = "";
    b.forEach(function (r, i) {
      out += '<rect x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + (98 - r[1]) + '" fill="#0a1020"/>';
      for (let y = r[1] + 4; y < 94; y += 6) for (let x = r[0] + 2; x < r[0] + r[2] - 2; x += 4) {
        if ((x * 7 + y * 13 + i) % 5 < 2) out += '<rect' + ((x + y) % 7 === 0 ? ' class="led" style="animation-duration:5s;animation-delay:' + ((x + y) % 4) + 's"' : "") +
          ' x="' + x + '" y="' + y + '" width="2" height="2.6" fill="' + ((x + y) % 3 ? "#f0c060" : "#7ff3ea") + '"/>';
      }
    });
    return out;
  }
  function roomSVG() {
    const k = state.kamer;
    const d = slot => { const it = item(k[slot]); return it ? it.draw : ""; };
    return '<svg viewBox="0 0 420 280" class="room" role="img" aria-label="Je kamer">' +
      '<defs>' +
        '<linearGradient id="rg-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#131a26"/><stop offset="1" stop-color="#222c3b"/></linearGradient>' +
        '<linearGradient id="rg-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2c25"/><stop offset="1" stop-color="#231a16"/></linearGradient>' +
        '<linearGradient id="rg-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1030"/><stop offset="1" stop-color="#3b1d6e"/></linearGradient>' +
        '<radialGradient id="rg-light"><stop offset="0" stop-color="#5fd0c8" stop-opacity=".34"/><stop offset="1" stop-color="#5fd0c8" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="rg-pool"><stop offset="0" stop-color="#5fd0c8" stop-opacity=".22"/><stop offset="1" stop-color="#5fd0c8" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      // muur
      '<rect width="420" height="200" fill="url(#rg-wall)"/>' +
      '<path d="M0 150 h420" stroke="#0e141d" stroke-width="1.5"/><path d="M60 150 v50 M210 150 v50 M330 150 v50" stroke="#0e141d" stroke-width="1"/>' +
      '<rect class="rgb" y="0" width="420" height="3" fill="#c084fc"/><rect class="rgb scr-glow" y="0" width="420" height="10" fill="#c084fc"/>' +
      // raam met skyline
      '<rect x="88" y="22" width="100" height="80" rx="4" fill="#0b0e12"/><rect x="92" y="26" width="92" height="72" fill="url(#rg-sky)"/>' +
      '<circle cx="164" cy="42" r="8" fill="#f4f2ec"/><circle cx="161" cy="40" r="1.8" fill="#d9d6cc"/><circle cx="167" cy="45" r="1.2" fill="#d9d6cc"/>' +
      '<circle class="star" cx="104" cy="36" r="1"/><circle class="star" style="animation-delay:1.2s" cx="126" cy="32" r=".9"/><circle class="star" style="animation-delay:.6s" cx="142" cy="40" r="1"/><circle class="star" style="animation-delay:2s" cx="114" cy="48" r=".8"/>' +
      skyline() +
      '<path d="M138 26 v72 M92 60 h92" stroke="#0b0e12" stroke-width="3"/><rect x="84" y="100" width="108" height="5" rx="1.500" fill="#2b3442"/>' +
      d("muur") +
      '<ellipse cx="310" cy="150" rx="150" ry="95" fill="url(#rg-light)"/>' +
      // vloer
      '<rect y="200" width="420" height="80" fill="url(#rg-floor)"/><rect y="198" width="420" height="4" fill="#0e141d"/>' +
      '<path d="M0 224 h420 M0 250 h420 M70 202 v22 M190 202 v22 M310 202 v22 M130 224 v26 M250 224 v26 M370 224 v26 M40 250 v30 M200 250 v30 M340 250 v30" stroke="#1c1512" stroke-width="1.200"/>' +
      '<ellipse cx="300" cy="236" rx="130" ry="26" fill="url(#rg-pool)"/>' +
      // pc-kast onder het bureau
      '<rect x="318" y="196" width="52" height="64" rx="3" fill="#0b0e12"/><rect x="322" y="200" width="44" height="56" rx="2" fill="#10202a"/>' +
      '<rect class="rgb scr-glow" x="322" y="200" width="44" height="56" rx="2" fill="#c084fc"/>' +
      '<g class="rgb"><circle cx="344" cy="216" r="10" fill="none" stroke="#c084fc" stroke-width="2"/><circle cx="344" cy="242" r="10" fill="none" stroke="#c084fc" stroke-width="2"/></g>' +
      '<g class="fan" style="transform-origin:344px 216px"><path d="M344 216 l0 -8 q5 1 5 5 z M344 216 l8 0 q-1 5 -5 5 z M344 216 l0 8 q-5 -1 -5 -5 z M344 216 l-8 0 q1 -5 5 -5 z" fill="#3b4350"/></g>' +
      '<g class="fan" style="transform-origin:344px 242px"><path d="M344 242 l0 -8 q5 1 5 5 z M344 242 l8 0 q-1 5 -5 5 z M344 242 l0 8 q-5 -1 -5 -5 z M344 242 l-8 0 q1 -5 5 -5 z" fill="#3b4350"/></g>' +
      '<path d="M332 196 q-6 -6 -2 -14 M356 196 q4 -8 0 -14" fill="none" stroke="#0b0e12" stroke-width="2"/>' +
      d("vloer") +
      // stoelpoot, stoel, lijf
      '<rect x="147" y="184" width="6" height="52" fill="#11151a"/><path d="M128 246 q22 -14 44 0" fill="none" stroke="#11151a" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="128" cy="248" r="3.500" fill="#11151a"/><circle cx="172" cy="248" r="3.500" fill="#11151a"/>' +
      d("stoel") + d("outfit") +
      // hoofd, met het licht van de schermen op het gezicht
      '<rect x="145" y="144" width="10" height="8" fill="#c99b78"/><circle cx="150" cy="134" r="14" fill="#e3b591"/>' +
      '<path d="M150 120 a14 14 0 0 1 0 28 a20 20 0 0 0 0 -28 z" fill="#7ff3ea" opacity=".13"/>' +
      '<path d="M135.500 133 a14.500 14.500 0 0 1 29 -1 q-4 -7 -10 -6 q-3 3 -8 1 q-7 0 -11 6 z" fill="#2a1d15"/>' +
      '<g class="eyes"><circle cx="144.500" cy="135.500" r="1.700" fill="#1d1f23"/><circle cx="155.500" cy="135.500" r="1.700" fill="#1d1f23"/></g>' +
      '<path d="M141.500 131.500 h6 M152.500 131.500 h6" stroke="#2a1d15" stroke-width="1.200" stroke-linecap="round"/><path d="M146 141.500 q4 2.500 8 0" fill="none" stroke="#1d1f23" stroke-width="1.300" stroke-linecap="round"/>' +
      d("hoofd") +
      // bureau met ledstrip
      '<rect x="80" y="184" width="6" height="74" fill="#11151a"/><rect x="384" y="184" width="6" height="74" fill="#11151a"/><rect x="74" y="256" width="18" height="3" rx="1.500" fill="#11151a"/><rect x="378" y="256" width="18" height="3" rx="1.500" fill="#11151a"/>' +
      '<rect x="68" y="176" width="334" height="9" rx="2" fill="#2b3442"/><rect x="68" y="176" width="334" height="2.500" rx="1.200" fill="#3d4959"/>' +
      '<rect class="rgb" x="72" y="185" width="326" height="1.800" fill="#c084fc"/><rect class="rgb scr-glow" x="72" y="184" width="326" height="9" fill="#c084fc"/>' +
      d("toetsenbord") +
      '<g class="hands"><ellipse cx="134" cy="169" rx="6.500" ry="4" fill="#e3b591"/><ellipse cx="166" cy="169" rx="6.500" ry="4" fill="#e3b591"/></g>' +
      d("scherm") + d("bureau") +
      "</svg>";
  }

  // ---------- kamer ----------
  function pageRoom() {
    const wrap = el("div", "content");
    function render() {
      let html = '<h1>Je kamer</h1><p class="lead">Richt je kamer in met wat je uit kisten haalt. Elk item geeft een bonus op de punten die je met vragen verdient.</p>' +
        '<div class="room-frame">' + roomSVG() + '<div class="room-bonus">Kamerbonus <b>+' + bonus() + "%</b></div></div>";
      S.SLOTS.forEach(sl => {
        const have = S.ITEMS.filter(i => i.slot === sl.id && state.items[i.id]);
        const total = S.ITEMS.filter(i => i.slot === sl.id).length;
        html += '<h3 class="slot-title">' + sl.label + ' <span class="muted">' + have.length + " van " + total + "</span></h3><div class=\"tiles\">";
        html += '<button type="button" class="tile none' + (state.kamer[sl.id] ? "" : " on") + '" data-slot="' + sl.id + '" data-id="">Niets</button>';
        have.forEach(i => {
          const R = rar(i.rarity);
          html += '<button type="button" class="tile' + (state.kamer[sl.id] === i.id ? " on" : "") + '" style="--rar:' + R.color + '" data-slot="' + sl.id + '" data-id="' + i.id + '" title="' + esc(i.name) + '">' +
            tile(i) + '<span class="t-name">' + esc(i.name) + '</span><span class="t-bonus">+' + R.bonus + "%</span></button>";
        });
        if (have.length < total) html += '<a class="tile more" href="#/shop">Meer via kisten</a>';
        html += "</div>";
      });
      wrap.innerHTML = html;
    }
    wrap.addEventListener("click", e => {
      const t = e.target.closest("button.tile");
      if (!t) return;
      if (t.dataset.id) state.kamer[t.dataset.slot] = t.dataset.id; else delete state.kamer[t.dataset.slot];
      save(); render();
    });
    render();
    return wrap;
  }

  // ---------- kisten ----------
  function roll(crate) {
    let r = Math.random() * 100, pick = "gewoon";
    for (const rk of Object.keys(crate.kansen)) { if (r < crate.kansen[rk]) { pick = rk; break; } r -= crate.kansen[rk]; }
    const pool = S.ITEMS.filter(i => i.rarity === pick && !i.start);
    return pool[Math.floor(Math.random() * pool.length)];
  }
  function randomFiller(crate) { return roll(crate); }

  function openCrate(crate, host, done) {
    const won = roll(crate);
    const dubbel = !!state.items[won.id];
    const R = rar(won.rarity);
    state.stats.kisten++;
    if (won.rarity === "legendarisch") state.stats.legendarisch++;
    if (dubbel) { state.punten += R.dubbel; state.verdiend += R.dubbel; } else state.items[won.id] = 1;
    save();   // het resultaat ligt vast vóór de animatie, ook als je de pagina sluit

    const N = 44, WIN = 38;
    let strip = "";
    for (let i = 0; i < N; i++) {
      const it = i === WIN ? won : randomFiller(crate);
      strip += '<div class="spin-tile" style="--rar:' + rar(it.rarity).color + '">' + tile(it) + "</div>";
    }
    host.innerHTML = '<div class="spinner"><div class="spin-mark"></div><div class="spin-strip">' + strip + "</div></div>";
    const box = host.querySelector(".spinner"), track = host.querySelector(".spin-strip");
    const W = track.children[0].getBoundingClientRect().width + 8;   // vakje + marge, verschilt op gsm
    const offset = WIN * W + W / 2 - box.clientWidth / 2 + (Math.random() * 0.5 - 0.25) * W;

    function reveal() {
      host.innerHTML = '<div class="won" style="--rar:' + R.color + '">' + tile(won) +
        '<div><div class="won-rar">' + R.label + '</div><div class="won-name">' + esc(won.name) + "</div>" +
        '<div class="muted">' + (dubbel ? "Die had je al: +" + R.dubbel + " punten terug." : "Nieuw! Zet het neer in je kamer (+" + R.bonus + "% bonus).") + "</div></div>" +
        '<div class="btn-row"><a class="btn" href="#/kamer">Naar je kamer</a><button type="button" class="btn ghost" data-close>Sluiten</button></div></div>';
      refreshCoins(dubbel);
      done();
    }
    if (calm) return reveal();
    requestAnimationFrame(() => requestAnimationFrame(() => { track.style.transform = "translateX(-" + offset + "px)"; }));
    setTimeout(reveal, 4300);
  }

  // ---------- shop ----------
  function pageShop() {
    const wrap = el("div", "content");
    let busy = false;
    function render() {
      let html = '<h1>Shop</h1><p class="lead">Je hebt <b>' + state.punten + "</b> punten. Kamerbonus: +" + bonus() + "%.</p>";

      html += "<h2>Kisten</h2><p>In een kist zit één item voor je kamer. Een dubbel item krijg je deels terug in punten.</p><div class=\"cards\">";
      S.CRATES.forEach(c => {
        html += '<div class="card crate"><div class="crate-art' + (c.id === "grote-kist" ? " big" : "") + '"><i></i></div><h3>' + esc(c.name) + "</h3>" +
          '<div class="odds">' + Object.keys(c.kansen).map(rk => '<span style="--rar:' + rar(rk).color + '">' + rar(rk).label + " " + c.kansen[rk] + "%</span>").join("") + "</div>" +
          '<button type="button" class="btn" data-crate="' + c.id + '"' + (state.punten < c.prijs ? " disabled" : "") + ">Openen · " + c.prijs + "</button></div>";
      });
      html += '</div><div id="spin-host"></div>';

      html += "<h2>Thema's</h2><div class=\"cards\">";
      S.THEMES.forEach(t => {
        const own = !!state.themas[t.id], on = state.thema === t.id;
        html += '<div class="card theme-card' + (on ? " on" : "") + '"><div class="swatch">' + t.swatch.map(c => '<i style="background:' + c + '"></i>').join("") + "</div><h3>" + esc(t.name) + "</h3>" +
          (on ? '<span class="badge">Actief</span>'
            : own ? '<button type="button" class="btn ghost" data-theme="' + t.id + '">Gebruiken</button>'
            : '<button type="button" class="btn" data-buy-theme="' + t.id + '"' + (state.punten < t.prijs ? " disabled" : "") + ">Kopen · " + t.prijs + "</button>") + "</div>";
      });
      html += "</div>";

      html += "<h2>Echte beloningen</h2><p>Dit lijstje is van jou: jij kiest de beloning en de prijs. Bij inwisselen gaan de punten van je saldo.</p><div class=\"rewards\">";
      state.beloningen.forEach(r => {
        html += '<div class="reward"><span class="r-name">' + esc(r.name) + '</span><span class="r-price">' + r.prijs + "</span>" +
          '<button type="button" class="btn" data-redeem="' + r.id + '"' + (state.punten < r.prijs ? " disabled" : "") + ">Inwisselen</button>" +
          '<button type="button" class="icon-btn" data-del="' + r.id + '" aria-label="Verwijder ' + esc(r.name) + '">✕</button></div>';
      });
      html += '</div><form class="reward-form"><input name="name" required maxlength="60" placeholder="Nieuwe beloning, bv. pizza bestellen" aria-label="Naam van de beloning">' +
        '<input name="prijs" type="number" required min="1" max="100000" placeholder="Prijs" aria-label="Prijs in punten"><button class="btn ghost">Toevoegen</button></form>';

      if (state.ingewisseld.length) {
        html += "<h3>Ingewisseld</h3><ul class=\"history\">" + state.ingewisseld.slice(-8).reverse().map(x =>
          "<li>" + esc(x.name) + ' <span class="muted">· ' + x.prijs + " punten · " + new Date(x.t).toLocaleDateString("nl-BE", { day: "numeric", month: "short" }) + "</span></li>").join("") + "</ul>";
      }
      wrap.innerHTML = html;
    }

    wrap.addEventListener("click", e => {
      const b = e.target.closest("button");
      if (!b || busy) return;
      if (b.dataset.crate) {
        const c = S.CRATES.find(x => x.id === b.dataset.crate);
        if (!spend(c.prijs)) return;
        busy = true;
        wrap.querySelectorAll("[data-crate]").forEach(x => { x.disabled = true; });
        const host = wrap.querySelector("#spin-host");
        host.scrollIntoView({ block: "center", behavior: calm ? "auto" : "smooth" });
        openCrate(c, host, () => { busy = false; });
      } else if ("close" in b.dataset) {
        render();
      } else if (b.dataset.buyTheme) {
        const t = S.THEMES.find(x => x.id === b.dataset.buyTheme);
        if (!spend(t.prijs)) return;
        state.themas[t.id] = 1; state.thema = t.id; save(); applyTheme(); render();
        toast("Thema <b>" + esc(t.name) + "</b> gekocht en ingesteld");
      } else if (b.dataset.theme) {
        state.thema = b.dataset.theme; save(); applyTheme(); render();
      } else if (b.dataset.redeem) {
        const r = state.beloningen.find(x => x.id === b.dataset.redeem);
        if (!r || !window.confirm('"' + r.name + '" inwisselen voor ' + r.prijs + " punten?")) return;
        if (!spend(r.prijs)) return;
        state.ingewisseld.push({ name: r.name, prijs: r.prijs, t: Date.now() }); save(); render();
        toast("Ingewisseld: <b>" + esc(r.name) + "</b>. Geniet ervan.");
      } else if (b.dataset.del) {
        state.beloningen = state.beloningen.filter(x => x.id !== b.dataset.del); save(); render();
      }
    });
    wrap.addEventListener("submit", e => {
      e.preventDefault();
      const f = e.target, name = f.name.value.trim(), prijs = Math.round(Number(f.prijs.value));
      if (!name || !(prijs > 0)) return;
      state.beloningen.push({ id: "b" + Date.now(), name: name, prijs: prijs }); save(); render();
    });
    render();
    return wrap;
  }

  // ---------- thema ----------
  function applyTheme() {
    const root = document.documentElement;
    if (state.thema && state.thema !== "standaard") root.setAttribute("data-theme", state.thema);
    else root.removeAttribute("data-theme");
  }

  function reset() {
    state = fresh();
    save(); applyTheme();
  }

  function init(e) { env = e; applyTheme(); refreshCoins(); }

  return {
    init: init, answer: answer, multiplier: multiplier, roundDone: roundDone, cardFlip: cardFlip,
    bonus: bonus, unclaimed: unclaimed, refreshCoins: refreshCoins, reset: reset,
    pageBadges: pageBadges, pageShop: pageShop, pageRoom: pageRoom,
    points: () => state.punten
  };
})();
