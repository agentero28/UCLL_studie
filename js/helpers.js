// Hulpfuncties om theorie te schrijven in de data-bestanden.
window.COURSES = window.COURSES || [];

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Codeblok: code`...` (backslashes blijven letterlijk staan)
function code(strings, ...values) {
  let raw = String.raw(strings, ...values).replace(/^\n/, "").replace(/\s+$/, "");
  return "<pre><code>" + esc(raw) + "</code></pre>";
}

// Inline code: c`...`
function c(strings, ...values) {
  return "<code>" + esc(String.raw(strings, ...values)) + "</code>";
}

// Tabel: table(["kop1", "kop2"], [["a", "b"], ...]) – cellen mogen HTML bevatten
function table(head, rows) {
  return '<div class="table-wrap"><table><thead><tr>' +
    head.map(h => "<th>" + h + "</th>").join("") + "</tr></thead><tbody>" +
    rows.map(r => "<tr>" + r.map(x => "<td>" + x + "</td>").join("") + "</tr>").join("") +
    "</tbody></table></div>";
}

// Kader: note("tekst") / note("tekst", "warn") / note("tekst", "exam")
function note(html, kind) {
  const labels = { warn: "Let op", exam: "Examen", tip: "Tip" };
  const k = kind || "tip";
  return '<div class="note note-' + k + '"><strong>' + labels[k] + ":</strong> " + html + "</div>";
}
