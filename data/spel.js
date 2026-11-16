// Spelgegevens: zeldzaamheden, kamerspullen, thema's, kisten, badges en standaardbeloningen.
// Alles hier mag je aanpassen: prijzen, kansen, namen.

window.SPEL = (function () {
  "use strict";

  // punten = waarde van een badge; dubbel = wat je terugkrijgt voor een dubbel item; bonus = % extra punten in je kamer
  const RARITY = {
    gewoon:       { label: "Gewoon",       color: "#8a93a0", punten: 25,  dubbel: 25,  bonus: 1 },
    zeldzaam:     { label: "Zeldzaam",     color: "#3b82f6", punten: 75,  dubbel: 75,  bonus: 3 },
    episch:       { label: "Episch",       color: "#a855f7", punten: 200, dubbel: 200, bonus: 6 },
    legendarisch: { label: "Legendarisch", color: "#f59e0b", punten: 600, dubbel: 500, bonus: 12 }
  };

  const SLOTS = [
    { id: "scherm", label: "Scherm" },
    { id: "toetsenbord", label: "Toetsenbord" },
    { id: "bureau", label: "Op het bureau" },
    { id: "muur", label: "Aan de muur" },
    { id: "vloer", label: "Op de vloer" },
    { id: "stoel", label: "Stoel" },
    { id: "outfit", label: "Hoodie" },
    { id: "hoofd", label: "Hoofd" }
  ];

  // Kleine hulpjes om de tekeningen kort te houden. Alles staat in kamercoördinaten (420 x 280).
  // Klassen zoals "ln", "cur", "led" en "rgb" krijgen hun beweging in css/style.css.
  function monitor(x, w, h, lines, accent) {
    const y = 172 - h, cx = x + w / 2;
    accent = accent || "#5fd0c8";
    let s = '<rect class="scr-glow" x="' + (x - 6) + '" y="' + (y - 6) + '" width="' + (w + 12) + '" height="' + (h + 12) + '" rx="10" fill="' + accent + '"/>' +
      '<rect x="' + (cx - 4) + '" y="164" width="8" height="11" fill="#11151a"/>' +
      '<path d="M' + (cx - 18) + ' 177 q18 -6 36 0 z" fill="#11151a"/>' +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4" fill="#0b0e12"/>' +
      '<rect x="' + (x + 2.5) + '" y="' + (y + 2.5) + '" width="' + (w - 5) + '" height="' + (h - 6) + '" rx="2.5" fill="#07130f"/>' +
      '<rect x="' + (x + 2.5) + '" y="' + (y + 2.5) + '" width="' + (w - 5) + '" height="5" rx="2.5" fill="#12251f"/>' +
      '<circle cx="' + (x + 6) + '" cy="' + (y + 5) + '" r="1" fill="#ff5d73"/><circle cx="' + (x + 10) + '" cy="' + (y + 5) + '" r="1" fill="#f0c060"/><circle cx="' + (x + 14) + '" cy="' + (y + 5) + '" r="1" fill="#6fd08c"/>';
    const cols = [accent, "#6fd08c", "#f0c060", accent, "#c084fc", "#6fd08c", "#ff5d73"];
    let last = null;
    for (let i = 0; i < lines; i++) {
      const lw = [0.62, 0.4, 0.55, 0.28, 0.5, 0.36, 0.45][i % 7] * (w - 18);
      const lx = x + 7 + [0, 6, 6, 12, 6, 0, 6][i % 7], ly = y + 11.5 + i * 6.2;
      s += '<rect class="ln" style="animation-delay:' + (i * 0.35).toFixed(2) + 's" x="' + lx + '" y="' + ly.toFixed(1) + '" width="' + lw.toFixed(1) +
        '" height="2.2" rx="1" fill="' + cols[i % 7] + '"/>';
      last = [lx + lw + 2, ly - 0.6];
    }
    if (last) s += '<rect class="cur" x="' + last[0].toFixed(1) + '" y="' + last[1].toFixed(1) + '" width="2.6" height="3.6" fill="#e8fff6"/>';
    s += '<path d="M' + (x + w * 0.55) + " " + (y + 2.5) + " L" + (x + w - 2.5) + " " + (y + 2.5) + " L" + (x + w - 2.5) + " " + (y + h * 0.5) + ' Z" fill="#fff" opacity=".05"/>';
    return s;
  }
  function keyboard(body, keys, rgb) {
    let s = '<path d="M110 177 l3 -11 h82 l3 11 z" fill="' + body + '"/><rect x="110" y="176" width="88" height="2.4" rx="1" fill="#000" opacity=".35"/>';
    let k = "";
    for (let r = 0; r < 3; r++) for (let i = 0; i < 13; i++) {
      const c = typeof keys === "string" ? keys : keys[(i + r) % keys.length];
      k += '<rect x="' + (114.5 + i * 6.1 - r * 0.6).toFixed(1) + '" y="' + (167.3 + r * 2.9).toFixed(1) + '" width="5" height="2.1" rx=".7" fill="' + c + '"/>';
    }
    return s + (rgb ? '<g class="rgb">' + k + "</g>" : k);
  }
  // kap = kap op het hoofd (achter het gezicht getekend)
  function hoodie(color, dark, kap) {
    return (kap ? '<path d="M131 139 C129 116 141 111 150 111 C159 111 171 116 169 139 C169 150 131 150 131 139 Z" fill="' + color + '"/>' +
        '<path d="M135.5 138 C134 121 143 116 150 116 C157 116 166 121 164.5 138" fill="none" stroke="' + dark + '" stroke-width="2"/>' : "") +
      '<path d="M116 177 C116 157 130 148 150 148 C170 148 184 157 184 177 Z" fill="' + color + '"/>' +
      '<path d="M116 177 C116 166 120 158 127 154 L131 177 Z M184 177 C184 166 180 158 173 154 L169 177 Z" fill="' + dark + '" opacity=".45"/>' +
      '<path d="M139 150 C142 159 158 159 161 150" fill="none" stroke="' + dark + '" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M147.5 157 v11 M152.5 157 v11" stroke="' + dark + '" stroke-width="1.8" stroke-linecap="round"/>' +
      '<path d="M140 171 h20 v6 h-20 z" fill="' + dark + '" opacity=".4"/>';
  }
  function rackUnit(i) {
    const y = 164 + i * 17;
    return '<rect x="18" y="' + y + '" width="40" height="13" rx="1.5" fill="#1e252e"/>' +
      '<circle class="led" style="animation-delay:' + (i * 0.37).toFixed(2) + 's" cx="23" cy="' + (y + 6.5) + '" r="1.7" fill="' + (i % 3 === 1 ? "#f0c060" : "#6fd08c") + '"/>' +
      '<circle class="led" style="animation-delay:' + (0.6 + i * 0.23).toFixed(2) + 's" cx="28.5" cy="' + (y + 6.5) + '" r="1.7" fill="#5fd0c8"/>' +
      [0, 1, 2, 3, 4, 5].map(function (j) { return '<rect x="' + (34 + j * 3.6) + '" y="' + (y + 3) + '" width="2" height="7" rx=".6" fill="#0b0e12"/>'; }).join("");
  }

  const ITEMS = [
    // ---- scherm ----
    { id: "scherm-1", name: "Eén scherm", slot: "scherm", rarity: "gewoon", start: true, box: [248, 104, 104, 78], draw: monitor(258, 84, 58, 6) },
    { id: "scherm-2", name: "Dubbel scherm", slot: "scherm", rarity: "zeldzaam", box: [226, 104, 166, 78], draw: monitor(234, 74, 58, 6) + monitor(312, 74, 58, 6, "#6fd08c") },
    { id: "scherm-ultra", name: "Ultrawide", slot: "scherm", rarity: "episch", box: [222, 94, 174, 88],
      draw: '<rect class="rgb" x="232" y="173" width="156" height="2.5" rx="1.2" fill="#c084fc"/>' + monitor(232, 156, 68, 8, "#c084fc") },
    { id: "scherm-drie", name: "Drie schermen", slot: "scherm", rarity: "legendarisch", box: [216, 92, 184, 90],
      draw: '<g transform="translate(0 4) skewY(4)" style="transform-origin:224px 172px">' + monitor(222, 54, 52, 5, "#f0c060") + "</g>" +
        '<g transform="translate(0 4) skewY(-4)" style="transform-origin:394px 172px">' + monitor(342, 54, 52, 5, "#f0c060") + "</g>" + monitor(279, 60, 70, 8, "#5fd0c8") },

    // ---- toetsenbord ----
    { id: "tb-basis", name: "Standaard toetsenbord", slot: "toetsenbord", rarity: "gewoon", start: true, box: [106, 158, 96, 26], draw: keyboard("#aeb3bb", "#eef0f3") },
    { id: "tb-mech", name: "Mechanisch toetsenbord", slot: "toetsenbord", rarity: "zeldzaam", box: [106, 158, 96, 26], draw: keyboard("#1e252e", ["#e8e6e1", "#e8e6e1", "#e8e6e1", "#5fd0c8"]) },
    { id: "tb-rgb", name: "RGB-toetsenbord", slot: "toetsenbord", rarity: "episch", box: [106, 158, 96, 26],
      draw: '<rect class="rgb scr-glow" x="108" y="164" width="92" height="15" rx="5" fill="#c084fc"/>' + keyboard("#0b0e12", ["#ff5d73", "#f0c060", "#6fd08c", "#5fd0c8", "#3b82f6", "#c084fc"], true) },

    // ---- op het bureau ----
    { id: "mok", name: "Mok koffie", slot: "bureau", rarity: "gewoon", box: [200, 144, 42, 38],
      draw: '<ellipse cx="219" cy="177" rx="10" ry="1.6" fill="#000" opacity=".3"/><path d="M211 161 h16 v12 a4 4 0 0 1 -4 4 h-8 a4 4 0 0 1 -4 -4 z" fill="#e8734a"/><rect x="211" y="161" width="16" height="3" fill="#3a2118"/>' +
        '<path d="M227 164 h3 a3.5 3.5 0 0 1 0 8 h-3" fill="none" stroke="#e8734a" stroke-width="2.4"/><path d="M214 169 l3 3 l5 -6" fill="none" stroke="#fff" stroke-width="1.5" opacity=".8"/>' +
        '<path class="steam" d="M215 157 q3 -4 0 -8 M222 157 q3 -4 0 -8" fill="none" stroke="#dfe3ea" stroke-width="1.5" stroke-linecap="round"/>' },
    { id: "lamp", name: "Bureaulamp", slot: "bureau", rarity: "gewoon", box: [196, 130, 50, 52],
      draw: '<path class="lamp-light" d="M229 150 l-17 26 h30 z" fill="#f0c060"/><rect x="210" y="174" width="22" height="3" rx="1.5" fill="#11151a"/>' +
        '<path d="M221 174 L213 152 L229 143" fill="none" stroke="#3b4350" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/><circle cx="213" cy="152" r="2.2" fill="#11151a"/>' +
        '<path d="M223 137 l13 6 l-5 9 l-12 -6 z" fill="#f0c060"/><path d="M222 146 l10 5" stroke="#fff7d6" stroke-width="2" stroke-linecap="round"/>' },
    { id: "eend", name: "Debug-eendje", slot: "bureau", rarity: "zeldzaam", box: [200, 146, 42, 36],
      draw: '<ellipse cx="220" cy="177" rx="12" ry="1.6" fill="#000" opacity=".3"/><g class="bob"><path d="M208 170 q-1 -7 7 -7 h7 q9 0 9 7 q0 7 -11 7 h-3 q-9 0 -9 -7 z" fill="#f6c945"/><circle cx="227" cy="160" r="6.5" fill="#f6c945"/>' +
        '<path d="M232 159.5 l7 1.6 l-7 3 z" fill="#e8734a"/><circle cx="228.5" cy="158.5" r="1.3" fill="#1d1f23"/><circle cx="229" cy="158" r=".45" fill="#fff"/>' +
        '<path d="M211 169 q5 -5 10 0" fill="none" stroke="#d8a520" stroke-width="1.5" stroke-linecap="round"/><path d="M222 153 q5 -4 9 0" fill="none" stroke="#1d1f23" stroke-width="1.6" stroke-linecap="round"/></g>' },
    { id: "kat", name: "Kat op het bureau", slot: "bureau", rarity: "episch", box: [194, 142, 54, 40],
      draw: '<ellipse cx="222" cy="177" rx="18" ry="1.8" fill="#000" opacity=".3"/><path class="tail" d="M237 171 q9 -1 6 -13" fill="none" stroke="#3b3f47" stroke-width="3.4" stroke-linecap="round"/>' +
        '<ellipse cx="222" cy="168" rx="16" ry="9" fill="#3b3f47"/><path d="M212 172 q10 5 22 0" fill="none" stroke="#2c3037" stroke-width="1.5"/>' +
        '<circle cx="208" cy="162" r="7.5" fill="#3b3f47"/><path d="M201.5 158 l.5 -8 l5.5 4.5 z M210 154.5 l4.5 -5.5 l2 8 z" fill="#3b3f47"/><path d="M203 155.5 l.3 -3 l2 1.8 z" fill="#f4a6b4"/>' +
        '<path d="M204 162 q1.6 1.6 3.2 0 M209.5 162 q1.6 1.6 3.2 0" fill="none" stroke="#f0c060" stroke-width="1.3" stroke-linecap="round"/><path d="M207 165 l1 1 l1 -1" fill="none" stroke="#f4a6b4" stroke-width="1"/>' +
        '<text class="zzz" x="196" y="150" font-size="7" font-weight="700" fill="#b9c2cf" font-family="sans-serif">z</text>' },
    { id: "trofee", name: "Gouden trofee", slot: "bureau", rarity: "legendarisch", box: [198, 134, 48, 48],
      draw: '<g class="glow-gold"><rect x="212" y="172" width="20" height="5" rx="1" fill="#5c3d0c"/><rect x="215" y="168" width="14" height="4" rx="1" fill="#7a5a12"/><rect x="220" y="160" width="4" height="9" fill="#f59e0b"/>' +
        '<path d="M211 142 h22 v6 a11 11 0 0 1 -22 0 z" fill="#f6c945"/><path d="M211 142 h22 v3 h-22 z" fill="#fde68a"/>' +
        '<path d="M211 145 h-5 a5.5 5.5 0 0 0 5.5 7.5 M233 145 h5 a5.5 5.5 0 0 1 -5.5 7.5" fill="none" stroke="#f6c945" stroke-width="2.4"/>' +
        '<path d="M222 145 l1.7 3.4 l3.7 .5 l-2.7 2.6 l.7 3.7 l-3.4 -1.8 l-3.4 1.8 l.7 -3.7 l-2.7 -2.6 l3.7 -.5 z" fill="#fff" opacity=".9"/></g>' +
        '<path class="spark" d="M238 138 l1 3 l3 1 l-3 1 l-1 3 l-1 -3 l-3 -1 l3 -1 z" fill="#fff"/><path class="spark" style="animation-delay:.9s" d="M205 150 l.8 2.2 l2.2 .8 l-2.2 .8 l-.8 2.2 l-.8 -2.2 l-2.2 -.8 l2.2 -.8 z" fill="#fde68a"/>' },

    // ---- aan de muur ----
    { id: "poster", name: "Poster", slot: "muur", rarity: "gewoon", box: [262, 20, 76, 84],
      draw: '<rect x="270" y="26" width="60" height="72" rx="2" fill="#0d1620"/><rect x="273" y="29" width="54" height="66" fill="#16263a"/>' +
        '<circle cx="300" cy="52" r="15" fill="#ff5d73"/><path d="M285 52 h30 M287 46 h26 M287 58 h26" stroke="#16263a" stroke-width="1.6"/>' +
        '<path d="M273 80 l14 -15 l10 9 l9 -12 l21 20 v13 h-54 z" fill="#5fd0c8"/><path d="M273 88 l12 -9 l9 5 l13 -10 l20 14 v7 h-54 z" fill="#2a8f89"/>' +
        '<circle cx="272" cy="27" r="1.6" fill="#b9c2cf"/><circle cx="328" cy="27" r="1.6" fill="#b9c2cf"/>' },
    { id: "klok", name: "Klok", slot: "muur", rarity: "gewoon", box: [264, 24, 72, 72],
      draw: '<circle cx="300" cy="60" r="29" fill="#11151a"/><circle cx="300" cy="60" r="25" fill="#f4f2ec"/>' +
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (i) { return '<rect x="299.2" y="37.5" width="1.6" height="' + (i % 3 ? 3 : 5.5) + '" fill="#2b3038" transform="rotate(' + i * 30 + ' 300 60)"/>'; }).join("") +
        '<path d="M300 60 v-14" stroke="#2b3038" stroke-width="3" stroke-linecap="round"/><path d="M300 60 l11 6" stroke="#2b3038" stroke-width="2.4" stroke-linecap="round"/>' +
        '<path class="seconds" d="M300 64 v-23" stroke="#e8734a" stroke-width="1.2" stroke-linecap="round"/><circle cx="300" cy="60" r="2.4" fill="#e8734a"/>' },
    { id: "whiteboard", name: "Whiteboard", slot: "muur", rarity: "zeldzaam", box: [236, 22, 128, 82],
      draw: '<rect x="242" y="28" width="116" height="66" rx="3" fill="#c5cad3"/><rect x="245" y="31" width="110" height="60" rx="1.5" fill="#fbfbf8"/>' +
        '<rect x="253" y="40" width="26" height="14" rx="2.5" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.8"/><rect x="301" y="40" width="26" height="14" rx="2.5" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.8"/><rect x="277" y="68" width="26" height="14" rx="2.5" fill="#fde2d8" stroke="#e8734a" stroke-width="1.8"/>' +
        '<path d="M279 47 h20 m-5 -3 l5 3 l-5 3 M266 54 v21 h9 m-4 -3 l4 3 l-4 3 M314 54 v21 h-9 m4 -3 l-4 3 l4 3" fill="none" stroke="#2b3038" stroke-width="1.5" stroke-linejoin="round"/>' +
        '<path d="M334 42 h14 M334 48 h10 M334 54 h13 M334 66 l3 3 l6 -7" fill="none" stroke="#1f7a3d" stroke-width="1.8" stroke-linecap="round"/>' +
        '<rect x="262" y="93" width="76" height="4" rx="1" fill="#9aa1ab"/><rect x="270" y="90.5" width="10" height="3" rx="1" fill="#3b82f6"/><rect x="284" y="90.5" width="10" height="3" rx="1" fill="#e8734a"/>' },
    { id: "neon", name: "Neonbord", slot: "muur", rarity: "episch", box: [234, 24, 132, 76],
      draw: '<rect x="248" y="38" width="104" height="48" rx="12" fill="#1a1230" opacity=".7"/><g class="neon-p"><rect x="250" y="40" width="100" height="44" rx="11" fill="none" stroke="#c084fc" stroke-width="3"/></g>' +
        '<g class="neon-c"><path d="M270 53 l-10 9 l10 9 M330 53 l10 9 l-10 9 M307 49 l-13 26" fill="none" stroke="#7ff3ea" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></g>' +
        '<path d="M300 84 v6 q0 4 -6 4" fill="none" stroke="#11151a" stroke-width="1.6"/>' },
    { id: "diploma", name: "Ingekaderd diploma", slot: "muur", rarity: "legendarisch", box: [242, 18, 116, 88],
      draw: '<g class="glow-gold"><rect x="250" y="26" width="100" height="72" rx="3" fill="#b45309"/><rect x="253" y="29" width="94" height="66" rx="2" fill="#f6c945"/><rect x="258" y="34" width="84" height="56" fill="#fbf7ea"/></g>' +
        '<rect x="261" y="37" width="78" height="50" fill="none" stroke="#d9b45a" stroke-width="1"/><rect x="274" y="43" width="52" height="4.5" rx="2" fill="#2b3038"/>' +
        '<rect x="268" y="53" width="64" height="2.4" rx="1" fill="#9aa1ab"/><rect x="276" y="59" width="48" height="2.4" rx="1" fill="#9aa1ab"/><path d="M268 78 q6 -6 10 0 t10 0 t8 -2" fill="none" stroke="#2b3038" stroke-width="1.4"/>' +
        '<path d="M318 80 l-3 9 l7 -3 l7 3 l-3 -9" fill="#8f1d18"/><circle cx="322" cy="75" r="7.5" fill="#b3261e"/><circle cx="322" cy="75" r="4.5" fill="none" stroke="#f6c945" stroke-width="1.2"/>' +
        '<path class="spark" d="M345 26 l1.2 3.4 l3.4 1.2 l-3.4 1.2 l-1.2 3.4 l-1.2 -3.4 l-3.4 -1.2 l3.4 -1.2 z" fill="#fff"/>' },

    // ---- op de vloer ----
    { id: "plant", name: "Plant", slot: "vloer", rarity: "gewoon", box: [6, 172, 66, 100],
      draw: '<ellipse cx="40" cy="267" rx="20" ry="3" fill="#000" opacity=".3"/><path d="M25 238 h30 l-4 28 h-22 z" fill="#c2703a"/><rect x="23" y="236" width="34" height="6" rx="2" fill="#d98a52"/>' +
        '<g class="sway"><path d="M40 238 C37 212 25 204 16 198 C19 220 28 232 40 238 Z" fill="#2f9e58"/><path d="M40 238 C39 206 46 192 53 182 C58 206 51 226 40 238 Z" fill="#3fb86a"/>' +
        '<path d="M40 238 C46 220 57 214 68 212 C63 227 53 236 40 238 Z" fill="#268a4b"/><path d="M40 238 C32 226 22 224 12 226 C19 234 28 238 40 238 Z" fill="#268a4b"/>' +
        '<path d="M40 238 C39 220 44 204 52 186 M40 238 C35 222 27 210 17 200" fill="none" stroke="#1d6b3a" stroke-width="1"/></g>' },
    { id: "tapijt", name: "Tapijt", slot: "vloer", rarity: "gewoon", box: [2, 226, 72, 48],
      draw: '<ellipse cx="38" cy="251" rx="34" ry="14" fill="#7a1612"/><ellipse cx="38" cy="250" rx="34" ry="14" fill="#b3261e"/><ellipse cx="38" cy="250" rx="26" ry="10.5" fill="none" stroke="#f0c060" stroke-width="2"/>' +
        '<ellipse cx="38" cy="250" rx="18" ry="7" fill="#8f1d18"/><path d="M38 244.5 l8 5.5 l-8 5.5 l-8 -5.5 z" fill="#f0c060"/><circle cx="38" cy="250" r="2" fill="#b3261e"/>' },
    { id: "prullenbak", name: "Prullenmand", slot: "vloer", rarity: "gewoon", box: [10, 204, 58, 68],
      draw: '<ellipse cx="39" cy="267" rx="15" ry="2.6" fill="#000" opacity=".3"/><circle cx="31" cy="222" r="6.5" fill="#f4f2ec"/><circle cx="45" cy="219" r="7.5" fill="#dfe3ea"/><path d="M41 216 l5 4 M28 221 l5 2" stroke="#b9c2cf" stroke-width="1"/>' +
        '<path d="M21 226 h36 l-5 40 h-26 z" fill="#5b6472"/><path d="M27 232 l3 30 M33.5 232 l1.5 30 M39 232 v30 M44.5 232 l-1.5 30 M51 232 l-3 30" stroke="#3b4350" stroke-width="1.6"/><rect x="19" y="224" width="40" height="5" rx="2" fill="#7b8594"/>' +
        '<circle cx="62" cy="262" r="4" fill="#f4f2ec"/>' },
    { id: "rack", name: "Serverrack", slot: "vloer", rarity: "zeldzaam", box: [4, 146, 68, 128],
      draw: '<ellipse cx="38" cy="268" rx="28" ry="3" fill="#000" opacity=".35"/><rect x="12" y="154" width="52" height="114" rx="3" fill="#0b0e12"/><rect x="14" y="156" width="48" height="110" rx="2" fill="#141a21"/>' +
        [0, 1, 2, 3, 4, 5].map(rackUnit).join("") + '<path d="M64 180 q8 4 4 20 q-3 14 4 30" fill="none" stroke="#3b82f6" stroke-width="1.6"/><path d="M64 198 q6 6 2 24" fill="none" stroke="#f0c060" stroke-width="1.6"/>' },
    { id: "zitzak", name: "Zitzak", slot: "vloer", rarity: "zeldzaam", box: [0, 206, 74, 68],
      draw: '<ellipse cx="38" cy="267" rx="32" ry="3.5" fill="#000" opacity=".3"/><path d="M7 262 C0 236 15 216 36 216 C59 216 74 238 67 262 C57 271 17 271 7 262 Z" fill="#3b82f6"/>' +
        '<path d="M7 262 C4 250 6 240 12 232 C14 250 30 262 52 266 C36 270 16 269 7 262 Z" fill="#2563eb"/><path d="M22 236 C32 229 48 230 56 240" fill="none" stroke="#1d4ed8" stroke-width="3" stroke-linecap="round"/>' +
        '<path d="M26 224 q10 -5 20 0" fill="none" stroke="#93c5fd" stroke-width="2" stroke-linecap="round" opacity=".7"/>' },
    { id: "arcade", name: "Arcadekast", slot: "vloer", rarity: "legendarisch", box: [0, 134, 74, 140],
      draw: '<ellipse cx="38" cy="268" rx="30" ry="3.5" fill="#000" opacity=".35"/><path d="M10 268 V162 l9 -16 h38 l9 16 v106 z" fill="#2a1450"/><path d="M14 268 V163 l7 -13 h34 l7 13 v105 z" fill="#3b1d6e"/>' +
        '<g class="glow-gold"><rect x="19" y="151" width="38" height="12" rx="2" fill="#f59e0b"/></g><path d="M26 160 v-6 l4 6 v-6 M34 154 h5 M36.500 154 v6 M43 160 v-6 h4 v3 h-4 M43 157 l4 3" fill="none" stroke="#3b1d6e" stroke-width="1.4"/>' +
        '<rect class="scr-glow" x="15" y="165" width="46" height="40" rx="4" fill="#6fd08c"/><rect x="18" y="168" width="40" height="34" rx="2" fill="#07130f"/>' +
        '<path d="M22 196 h32" stroke="#6fd08c" stroke-width="1.4"/><rect class="invader" x="27" y="174" width="5" height="4" fill="#ff5d73"/><rect class="invader" x="36" y="174" width="5" height="4" fill="#f0c060"/><rect class="invader" x="45" y="174" width="5" height="4" fill="#5fd0c8"/>' +
        '<path class="ship" d="M36 193 l3 -5 l3 5 z" fill="#e8fff6"/><rect class="cur" x="38.300" y="181" width="1.4" height="4" fill="#e8fff6"/>' +
        '<path d="M12 208 h52 l-4 15 h-44 z" fill="#5b2fa8"/><circle cx="27" cy="213" r="3.4" fill="#ff5d73"/><rect x="26.200" y="206" width="1.6" height="7" fill="#e8e6e1"/><circle class="led" cx="41" cy="216" r="2.6" fill="#5fd0c8"/><circle class="led" style="animation-delay:.5s" cx="49" cy="214" r="2.6" fill="#f0c060"/>' +
        '<rect x="19" y="232" width="38" height="28" rx="2" fill="#1f0f3d"/><rect x="33" y="240" width="10" height="3" rx="1" fill="#f59e0b"/><path d="M10 268 V162 M66 268 V162" stroke="#c084fc" stroke-width="1.5" class="rgb"/>' },

    // ---- stoel ----
    { id: "stoel-basis", name: "Bureaustoel", slot: "stoel", rarity: "gewoon", start: true, box: [114, 124, 72, 64],
      draw: '<rect x="127" y="136" width="46" height="46" rx="9" fill="#3d4654"/><rect x="131" y="140" width="38" height="38" rx="6" fill="#4b5563"/>' },
    { id: "stoel-game", name: "Gamingstoel", slot: "stoel", rarity: "zeldzaam", box: [108, 100, 84, 88],
      draw: '<path d="M122 182 V130 q-2 -18 14 -22 h28 q16 4 14 22 v52 z" fill="#0b0e12"/><path d="M129 182 V132 q0 -12 10 -16 M171 182 V132 q0 -12 -10 -16" fill="none" stroke="#ff5d73" stroke-width="4" stroke-linecap="round"/>' +
        '<rect x="137" y="112" width="26" height="10" rx="5" fill="#ff5d73"/><path d="M144 117 h12" stroke="#0b0e12" stroke-width="2" stroke-linecap="round"/><path d="M122 150 l-6 4 v14 l6 3 M178 150 l6 4 v14 l-6 3" fill="#1e252e"/>' },
    { id: "stoel-ergo", name: "Ergonomische stoel", slot: "stoel", rarity: "episch", box: [108, 98, 84, 90],
      draw: '<rect x="134" y="102" width="32" height="15" rx="7" fill="#465163"/><rect x="137" y="105" width="26" height="9" rx="4.500" fill="#5b6779"/><rect x="147.500" y="116" width="5" height="9" fill="#2b3038"/>' +
        '<rect x="122" y="123" width="56" height="60" rx="13" fill="#2b3038"/><rect x="125.500" y="126.500" width="49" height="53" rx="10" fill="#465163"/>' +
        '<path d="M130 136 h40 M130 144 h40 M130 152 h40 M130 160 h40 M130 168 h40 M138 129 v48 M146 129 v48 M154 129 v48 M162 129 v48" stroke="#7ff3ea" stroke-width="1" opacity=".55"/>' +
        '<path d="M120 160 h-5 v14 M180 160 h5 v14" fill="none" stroke="#2b3038" stroke-width="4" stroke-linecap="round"/>' },

    // ---- hoodie ----
    { id: "outfit-grijs", name: "Grijze hoodie", slot: "outfit", rarity: "gewoon", start: true, box: [112, 144, 76, 36], draw: hoodie("#6b7280", "#4b5563") },
    { id: "outfit-groen", name: "Groene hoodie", slot: "outfit", rarity: "gewoon", box: [112, 144, 76, 36], draw: hoodie("#1f7a3d", "#14532d") },
    { id: "outfit-zwart", name: "Zwarte hoodie met kap", slot: "outfit", rarity: "zeldzaam", box: [112, 108, 76, 72],
      draw: hoodie("#161a20", "#000", true) + '<path d="M143 171 l3 -3 l3 3 M151 171 l3 -3 l3 3" fill="none" stroke="#6fd08c" stroke-width="1.2"/>' },
    { id: "outfit-paars", name: "Paarse hoodie met kap", slot: "outfit", rarity: "episch", box: [112, 108, 76, 72],
      draw: hoodie("#7c3aed", "#4c1d95", true) + '<path d="M120 172 l6 -10 M180 172 l-6 -10" stroke="#c4b5fd" stroke-width="2" stroke-linecap="round"/>' },
    { id: "outfit-goud", name: "Gouden hoodie", slot: "outfit", rarity: "legendarisch", box: [112, 108, 76, 72],
      draw: '<g class="glow-gold">' + hoodie("#f59e0b", "#b45309", true) + "</g>" +
        '<path class="spark" d="M126 160 l1 2.800 l2.800 1 l-2.800 1 l-1 2.800 l-1 -2.800 l-2.800 -1 l2.800 -1 z" fill="#fff"/><path class="spark" style="animation-delay:.7s" d="M172 156 l1 2.800 l2.800 1 l-2.800 1 l-1 2.800 l-1 -2.800 l-2.800 -1 l2.800 -1 z" fill="#fff"/>' },

    // ---- hoofd ----
    { id: "hoofd-pet", name: "Pet", slot: "hoofd", rarity: "gewoon", box: [126, 106, 52, 34],
      draw: '<path d="M134 127 a16 16 0 0 1 32 0 z" fill="#b3261e"/><path d="M134 127 a16 16 0 0 1 9 -14 q-2 8 -1 14 z" fill="#8f1d18"/><path d="M158 124.500 h15 q4 .5 2 4 h-17 z" fill="#8f1d18"/><circle cx="150" cy="111.500" r="1.800" fill="#8f1d18"/><rect x="146" y="118" width="8" height="5" rx="1" fill="#fff" opacity=".85"/>' },
    { id: "hoofd-bril", name: "Hackerbril", slot: "hoofd", rarity: "zeldzaam", box: [128, 118, 44, 30],
      draw: '<g class="glow-cyan"><rect x="136.500" y="130" width="12" height="8" rx="2.500" fill="#0b2a2a" stroke="#7ff3ea" stroke-width="1.500"/><rect x="151.500" y="130" width="12" height="8" rx="2.500" fill="#0b2a2a" stroke="#7ff3ea" stroke-width="1.500"/></g>' +
        '<path d="M148.500 133 h3 M136.500 132 l-3 -1 M163.500 132 l3 -1" stroke="#7ff3ea" stroke-width="1.400"/><path class="ln" d="M139 133 h5 M139 135.500 h3 M154 133 h4 M154 135.500 h6" stroke="#6fd08c" stroke-width="1"/>' },
    { id: "hoofd-headset", name: "RGB-headset", slot: "hoofd", rarity: "episch", box: [124, 104, 52, 50],
      draw: '<path d="M132.500 133 a17.500 17.500 0 0 1 35 0" fill="none" stroke="#0b0e12" stroke-width="4.500"/><path d="M137 124 a14 14 0 0 1 26 0" fill="none" stroke="#3b4350" stroke-width="1.500"/>' +
        '<rect x="127.500" y="127" width="8.500" height="15" rx="4" fill="#0b0e12"/><rect x="164" y="127" width="8.500" height="15" rx="4" fill="#0b0e12"/>' +
        '<g class="rgb"><rect x="129" y="130" width="2.400" height="9" rx="1.200" fill="#c084fc"/><rect x="169" y="130" width="2.400" height="9" rx="1.200" fill="#c084fc"/></g>' +
        '<path d="M131 141 q2 9 13 8" fill="none" stroke="#0b0e12" stroke-width="2"/><rect x="143" y="146.500" width="6" height="4" rx="2" fill="#0b0e12"/>' },
    { id: "hoofd-kroon", name: "Kroon", slot: "hoofd", rarity: "legendarisch", box: [128, 96, 44, 36],
      draw: '<g class="glow-gold"><path d="M135 123 l-3 -16 l9 8 l9 -13 l9 13 l9 -8 l-3 16 z" fill="#f6c945" stroke="#b45309" stroke-width="1.200" stroke-linejoin="round"/><rect x="135" y="120" width="30" height="4" rx="1" fill="#f59e0b"/></g>' +
        '<circle cx="150" cy="114" r="2.400" fill="#b3261e"/><circle cx="141" cy="117" r="1.700" fill="#3b82f6"/><circle cx="159" cy="117" r="1.700" fill="#3b82f6"/><circle cx="132" cy="107" r="1.500" fill="#fde68a"/><circle cx="150" cy="102" r="1.500" fill="#fde68a"/><circle cx="168" cy="107" r="1.500" fill="#fde68a"/>' +
        '<path class="spark" d="M170 98 l1 2.800 l2.800 1 l-2.800 1 l-1 2.800 l-1 -2.800 l-2.800 -1 l2.800 -1 z" fill="#fff"/>' }
  ];

  // Thema's koop je rechtstreeks. De kleuren zelf staan in css/style.css.
  const THEMES = [
    { id: "standaard", name: "Standaard", prijs: 0, swatch: ["#f6f5f1", "#0b6e69", "#1d1f23"] },
    { id: "papier", name: "Papier", prijs: 300, swatch: ["#f3ead7", "#9a3412", "#3b2f20"] },
    { id: "zee", name: "Zee", prijs: 400, swatch: ["#0c1d2b", "#38bdf8", "#e2f1fb"] },
    { id: "nacht", name: "Middernacht", prijs: 400, swatch: ["#14122b", "#a78bfa", "#ebe9fb"] },
    { id: "terminal", name: "Terminal", prijs: 500, swatch: ["#050805", "#4ade80", "#b6f5c8"] },
    { id: "neon", name: "Neon", prijs: 700, swatch: ["#12081f", "#f472b6", "#f5e9ff"] }
  ];

  // kansen in procent per zeldzaamheid
  const CRATES = [
    { id: "kist", name: "Kist", prijs: 250, kansen: { gewoon: 60, zeldzaam: 28, episch: 10, legendarisch: 2 } },
    { id: "grote-kist", name: "Grote kist", prijs: 700, kansen: { gewoon: 18, zeldzaam: 45, episch: 29, legendarisch: 8 } }
  ];

  // Echte beloningen: dit is alleen het startlijstje. Op de shoppagina voeg je er zelf toe of verwijder je ze.
  const REWARDS = [
    { name: "Een half uur gamen", prijs: 400 },
    { name: "Een aflevering van een serie", prijs: 500 },
    { name: "Een avond vrij van studeren", prijs: 1500 }
  ];

  // Badges. test(c) krijgt een object met tellers; zie js/game.js (functie context).
  const BADGES = [
    { id: "start", name: "Eerste stappen", rarity: "gewoon", text: "Beantwoord je eerste vraag juist.", test: c => c.juist >= 1 },
    { id: "ronde", name: "Uitgespeeld", rarity: "gewoon", text: "Werk een quiz volledig af.", test: c => c.stats.rondes >= 1 },
    { id: "tien", name: "Op dreef", rarity: "gewoon", text: "Heb 10 verschillende vragen juist.", test: c => c.juist >= 10 },
    { id: "combo5", name: "Vijf op rij", rarity: "gewoon", text: "Haal een combo van 5.", test: c => c.stats.besteCombo >= 5 },
    { id: "kaarten", name: "Kaartenbak", rarity: "gewoon", text: "Draai 20 flashcards om.", test: c => c.stats.kaarten >= 20 },
    { id: "koper", name: "Eerste aankoop", rarity: "gewoon", text: "Koop iets in de shop.", test: c => c.stats.aankopen >= 1 },

    { id: "foutloos", name: "Foutloos", rarity: "zeldzaam", text: "Maak alle vragen van een hoofdstuk in één ronde zonder fout.", test: c => c.foutloos >= 1 },
    { id: "hoofdstuk", name: "Hoofdstuk uit", rarity: "zeldzaam", text: "Heb alle vragen van een hoofdstuk juist.", test: c => c.hoofdstukkenUit >= 1 },
    { id: "honderd", name: "Honderd", rarity: "zeldzaam", text: "Heb 100 verschillende vragen juist.", test: c => c.juist >= 100 },
    { id: "combo10", name: "Tien op rij", rarity: "zeldzaam", text: "Haal een combo van 10.", test: c => c.stats.besteCombo >= 10 },
    { id: "herkansing", name: "Rechtgezet", rarity: "zeldzaam", text: "Zet 10 vragen recht die je eerder fout had.", test: c => c.stats.rechtgezet >= 10 },
    { id: "inrichter", name: "Inrichter", rarity: "zeldzaam", text: "Zet op elke plek in je kamer iets neer.", test: c => c.plekkenGevuld >= c.plekken },
    { id: "drie-dagen", name: "Regelmaat", rarity: "zeldzaam", text: "Oefen op 3 verschillende dagen.", test: c => c.dagen >= 3 },

    { id: "vak-cs", name: "Computer Systems rond", rarity: "episch", text: "Heb elke vraag van Computer Systems juist.", test: c => c.vakUit.cs },
    { id: "vak-pf1", name: "Programming 1 rond", rarity: "episch", text: "Heb elke vraag van Programming Foundations 1 juist.", test: c => c.vakUit.pf1 },
    { id: "mix", name: "Examenklaar", rarity: "episch", text: "Haal 15 op 15 in een examenmix.", test: c => c.stats.perfecteMix >= 1 },
    { id: "combo20", name: "Twintig op rij", rarity: "episch", text: "Haal een combo van 20.", test: c => c.stats.besteCombo >= 20 },
    { id: "vijf-foutloos", name: "Perfectionist", rarity: "episch", text: "Maak 5 hoofdstukken foutloos in één ronde.", test: c => c.foutloos >= 5 },
    { id: "tien-dagen", name: "Volhouder", rarity: "episch", text: "Oefen op 10 verschillende dagen.", test: c => c.dagen >= 10 },

    { id: "meester-cs", name: "Meester van Computer Systems", rarity: "legendarisch", text: "Maak elk hoofdstuk van Computer Systems foutloos in één ronde.", test: c => c.vakFoutloos.cs },
    { id: "meester-pf1", name: "Meester van Programming 1", rarity: "legendarisch", text: "Maak elk hoofdstuk van Programming Foundations 1 foutloos in één ronde.", test: c => c.vakFoutloos.pf1 },
    { id: "combo30", name: "Dertig op rij", rarity: "legendarisch", text: "Haal een combo van 30.", test: c => c.stats.besteCombo >= 30 },
    { id: "alles", name: "Semester rond", rarity: "legendarisch", text: "Heb elke vraag van elk vak juist.", test: c => c.juist >= c.totaal && c.totaal > 0 },

    // verborgen: je ziet ze pas als je ze hebt
    { id: "nacht", name: "Nachtbraker", rarity: "zeldzaam", hidden: true, text: "Beantwoord een vraag juist tussen middernacht en 5 uur.", test: c => c.stats.nacht >= 1 },
    { id: "doorzetter", name: "Doorzetter", rarity: "episch", hidden: true, text: "Beantwoord een vraag juist die je drie keer fout had.", test: c => c.stats.doorzetter >= 1 },
    { id: "gelukzak", name: "Gelukzak", rarity: "episch", hidden: true, text: "Haal een legendarisch item uit een kist.", test: c => c.stats.legendarisch >= 1 },
    { id: "spaarder", name: "Spaarder", rarity: "legendarisch", hidden: true, text: "Heb 5000 punten tegelijk op zak.", test: c => c.stats.hoogsteSaldo >= 5000 }
  ];

  // Punten per antwoord en hoe de combo oploopt.
  const REGELS = {
    eersteKeer: 5,        // vraag voor het eerst juist (of rechtgezet in een gewone ronde)
    herhaling: 1,         // vraag die je al juist had
    herkansing: 5,        // foute vraag rechtgezet in een herkansingsronde, zonder combo
    comboStap: 3,         // om de zoveel juiste antwoorden stijgt de vermenigvuldiger
    comboPlus: 0.5,       // met zoveel
    comboMax: 3           // tot maximaal x3
  };

  return { RARITY: RARITY, SLOTS: SLOTS, ITEMS: ITEMS, THEMES: THEMES, CRATES: CRATES, REWARDS: REWARDS, BADGES: BADGES, REGELS: REGELS };
})();
