// Computer Systems (MBI07) – theorie en quizvragen per module.
// Gebaseerd op de syllabi M1–M7 en de labo's. Eigen samenvatting, geen kopie van de cursus.

COURSES.push({
  id: "cs",
  title: "Computer Systems",
  code: "MBI07 · 6 SP",
  status: "ready",
  intro: "Hardware, elektriciteit, bits en bytes, virtualisatie, de Linux command line, processen en opslag.",
  modules: [

    // ------------------------------------------------------------------ M1
    {
      id: "m1",
      title: "M1 · Hardware",
      summary: "De onderdelen van een computer en waar ze voor dienen.",
      goals: [
        "De onderdelen van een computersysteem benoemen en uitleggen waar ze voor dienen."
      ],
      theory: `
<h2>Moederbord</h2>
<p>Het moederbord is het centrale circuitbord dat alle andere componenten met elkaar verbindt. Bij een desktop zijn de componenten meestal losse onderdelen; bij een laptop zijn er veel vastgesoldeerd op het moederbord.</p>
${table(["Aansluiting", "Dient voor"], [
  ["CPU-slot (socket)", "De processor"],
  ["RAM-slots", "Het werkgeheugen"],
  ["SATA-poorten", "Harde schijven (en SATA-SSD's)"],
  ["Uitbreidingsslots (PCI Express)", "Grafische kaart, extra netwerkkaart, kaarten met extra SATA- of USB-poorten"],
  ["Externe aansluitingen", "Randapparatuur (USB, beeld, netwerk, geluid)"]
])}

<h2>Processor (CPU)</h2>
<ul>
  <li>CPU = Central Processing Unit, het "brein" van de computer. Voert de instructies van programma's uit via basisbewerkingen: rekenen, logica, besturing en invoer/uitvoer.</li>
  <li>Bestaat uit miljarden <strong>transistoren</strong> (kleine schakelingen) van enkele nanometers groot.</li>
  <li>Bijna alle energie die de CPU verbruikt, wordt <strong>warmte</strong>. Bovenop zit een <strong>heatspreader</strong> die de warmte helpt afvoeren. Elke processor heeft een maximumtemperatuur.</li>
  <li>Het driehoekje op de processor toont hoe hij in het slot moet; de onderkant heeft een raster van contactpunten.</li>
</ul>
<h3>Processorkernen</h3>
<p>Een moderne processor heeft meerdere <strong>kernen (cores)</strong> die tegelijk berekeningen uitvoeren. In Task Manager (CTRL+SHIFT+ESC) zie je bijvoorbeeld:</p>
<ul>
  <li><strong>Sockets: 1</strong> → er zit 1 CPU op het moederbord (servers kunnen er meerdere hebben).</li>
  <li><strong>Cores: 14</strong> → 14 fysieke kernen.</li>
  <li><strong>Logical processors: 20</strong> → meer dan het aantal kernen door <strong>simultaneous multithreading (SMT)</strong>, bij Intel <em>hyper-threading</em>. Het besturingssysteem ziet daardoor meer kernen dan er fysiek zijn.</li>
</ul>

<h2>Geheugen (RAM)</h2>
<ul>
  <li>Random Access Memory = het tijdelijke werkgeheugen. Bevat wat de CPU snel nodig heeft: instructies van lopende programma's, open webpagina's, …</li>
  <li><strong>Vluchtig</strong>: de inhoud is weg zodra de computer uitgaat.</li>
  <li>"Random access" betekent dat alle data in het geheugen even snel aangesproken kan worden.</li>
</ul>

<h2>Opslagapparaten</h2>
${table(["", "HDD (harde schijf)", "SSD"], [
  ["Techniek", "Magnetische schijven", "Flashgeheugen"],
  ["Snelheid", "Trager", "Sneller"],
  ["Kwetsbaarheid", "Gevoeliger (bewegende delen)", "Minder kwetsbaar"],
  ["Prijs", "Goedkoper bij grote capaciteit (meerdere TB)", "Standaard bij kleinere capaciteiten"]
])}
<p>Opslag is <strong>permanent</strong>: de data blijft bewaard zonder stroom. Meer details in M7.</p>

<h2>Grafische kaart (GPU)</h2>
<ul>
  <li>Graphics Processing Unit: neemt het verwerken van grafische gegevens over van de CPU (gamen, videobewerking, 3D).</li>
  <li><strong>Geïntegreerd</strong>: ingebouwd in de CPU, deelt het systeemgeheugen. Genoeg voor surfen en kantoorwerk.</li>
  <li><strong>Dedicated</strong>: aparte kaart met eigen geheugen, veel betere prestaties.</li>
</ul>

<h2>Voeding (PSU) en koeling</h2>
<ul>
  <li>De <strong>PSU</strong> (power supply unit) levert stroom aan alle onderdelen. Ze zet <strong>wisselstroom (AC) om in gelijkstroom (DC)</strong> en geeft elk onderdeel de juiste hoeveelheid stroom.</li>
  <li><strong>Koeling</strong> is nodig omdat het verbruik uiteindelijk vooral warmte wordt. Zonder koeling raken componenten beschadigd of werken ze slechter.</li>
</ul>

<h2>Overige componenten</h2>
<ul>
  <li><strong>Invoer</strong>: toetsenbord, muis, scanner.</li>
  <li><strong>Uitvoer</strong>: monitor, printer, luidsprekers.</li>
  <li><strong>Netwerk</strong>: netwerkkaart (tegenwoordig meestal ingebouwd in het moederbord), modem.</li>
</ul>
`,
      quiz: [
        { q: "Welk onderdeel verbindt alle andere hardwarecomponenten met elkaar?", o: ["Het moederbord", "De processor", "De voeding", "Het werkgeheugen"], a: 0, e: "Het moederbord is het centrale circuitbord met o.a. het CPU-slot, de RAM-slots en de uitbreidingsslots." },
        { q: "Waarvoor dienen de SATA-poorten op een moederbord?", o: ["Harde schijven aansluiten", "De processor aansluiten", "Het werkgeheugen inpluggen", "De grafische kaart inpluggen"], a: 0, e: "SATA-poorten zijn de aansluiting voor harde schijven (en SATA-SSD's)." },
        { q: "In welk slot plug je een dedicated grafische kaart?", o: ["Een PCI Express-uitbreidingsslot", "Een RAM-slot", "Een SATA-poort", "Het CPU-slot"], a: 0, e: "Uitbreidingskaarten zoals een GPU of extra netwerkkaart gaan in de PCI Express-slots." },
        { q: "Task Manager toont: Sockets 1, Cores 14, Logical processors 20. Waarom zijn er meer logische processoren dan cores?", o: ["Door simultaneous multithreading (hyper-threading)", "Omdat er twee processoren op het moederbord zitten", "Omdat de GPU ook als processor telt", "Omdat het werkgeheugen meetelt"], a: 0, e: "Met SMT ziet het besturingssysteem meer kernen dan er fysiek zijn. Sockets: 1 betekent dat er maar één CPU is." },
        { q: "Wat betekent het dat RAM 'vluchtig' geheugen is?", o: ["De gegevens gaan verloren wanneer de computer uitgaat", "Het geheugen is trager dan een harde schijf", "De gegevens worden magnetisch opgeslagen", "Het geheugen kan maar een beperkt aantal keer beschreven worden"], a: 0, e: "RAM is tijdelijk werkgeheugen. Permanente opslag gebeurt op een HDD of SSD." },
        { q: "Waar slaat 'random access' op in Random Access Memory?", o: ["Alle data in het geheugen is even snel aan te spreken", "De data wordt op een willekeurige plaats bewaard", "Het geheugen wordt willekeurig gewist", "Programma's krijgen willekeurig geheugen toegewezen"], a: 0, e: "Elke plaats in het werkgeheugen is even snel bereikbaar." },
        { q: "Wat is het verschil tussen een geïntegreerde en een dedicated GPU?", o: ["Geïntegreerd zit in de CPU en deelt het systeemgeheugen; dedicated heeft eigen geheugen", "Geïntegreerd heeft eigen geheugen; dedicated deelt het systeemgeheugen", "Geïntegreerd is altijd sneller", "Dedicated zit vastgesoldeerd in de processor"], a: 0, e: "Een dedicated GPU heeft eigen geheugen en presteert veel beter bij grafisch zware taken." },
        { q: "Wat doet de voeding (PSU)?", o: ["Wisselstroom omzetten in gelijkstroom en verdelen over de onderdelen", "Gelijkstroom omzetten in wisselstroom", "De processor koelen", "Gegevens tijdelijk opslaan"], a: 0, e: "Het stopcontact levert AC; computeronderdelen werken op DC." },
        { q: "In wat wordt de energie die een CPU verbruikt bijna volledig omgezet?", o: ["Warmte", "Licht", "Magnetisme", "Geluid"], a: 0, e: "Daarom zit er een heatspreader op de processor en is koeling nodig." },
        { q: "Wanneer kies je typisch nog voor een harde schijf in plaats van een SSD?", o: ["Voor grote opslagcapaciteit van meerdere terabytes, omdat dat goedkoper is", "Wanneer snelheid het belangrijkst is", "Wanneer de schijf veel schokken krijgt", "Voor het werkgeheugen"], a: 0, e: "HDD's zijn goedkoper per TB. SSD's zijn sneller en minder kwetsbaar." }
      ]
    },

    // ------------------------------------------------------------------ M2
    {
      id: "m2",
      title: "M2 · Elektriciteit",
      summary: "Wet van Ohm, vermogen, verbruik en veiligheid.",
      goals: [
        "Basisberekeningen maken met de wet van Ohm, vermogen, verbruik en zekeringen.",
        "Uitleggen wat de functie is van een zekering, een verliesstroomschakelaar (differentieel) en aarding."
      ],
      theory: `
<h2>Stroomsterkte, spanning en weerstand</h2>
${table(["Grootheid", "Symbool", "Eenheid", "Vergelijking met water"], [
  ["Stroomsterkte", "I", "ampère (A)", "Hoeveel water er door de buis stroomt"],
  ["Spanning", "U", "volt (V)", "Het niveauverschil tussen twee vaten"],
  ["Weerstand", "R", "ohm (Ω)", "De diameter van de buis: dunner = meer weerstand"]
])}
<p>Elektronen (negatief geladen) bewegen van de min- naar de pluskant. De <strong>stroomrichting</strong> stellen we omgekeerd voor: van plus naar min.</p>

<h2>Wet van Ohm</h2>
${code`
U = I × R        spanning = stroomsterkte × weerstand
I = U / R
R = U / I
`}
<ul>
  <li>Lagere weerstand (dikkere kabel) → meer stroom.</li>
  <li>Hogere spanning → meer stroom.</li>
</ul>
<p><strong>Voorbeeld:</strong> een lamp met weerstand 28 Ω, gemeten stroom 500 mA = 0,5 A. Dan is U = 0,5 A × 28 Ω = <strong>14 V</strong>.</p>
${note("Zet milliampère eerst om naar ampère: 500 mA = 0,5 A.", "warn")}

<h2>AC en DC</h2>
<ul>
  <li>Het net in Europa levert ongeveer <strong>230 V wisselstroom (AC)</strong>: de spanning tussen fasedraad en nuldraad wisselt 50 keer per seconde (<strong>50 Hz</strong>).</li>
  <li>Elektronica zoals een pc werkt op <strong>gelijkstroom (DC)</strong>: de spanning blijft constant.</li>
  <li>De voeding of laptopadapter doet twee dingen: de <strong>transformator</strong> verlaagt de spanning (bv. 230 V → 12 V) en andere componenten zetten AC om in DC.</li>
</ul>

<h2>Vermogen</h2>
${code`P = U × I        vermogen (watt, W) = spanning × stroomsterkte`}
<p><strong>Voorbeeld:</strong> een adapter met output 18,5 V en maximaal 3,5 A levert 18,5 × 3,5 = 64,75 W, afgerond <strong>65 W</strong>.</p>
<p>De spanning is constant; de stroomsterkte (en dus het vermogen) op het label is een <strong>maximum</strong>. Een toestel in rust (idle) verbruikt minder dan tijdens gamen.</p>

<h2>Verbruik</h2>
${code`verbruik (kWh) = vermogen (kW) × tijd (uur)`}
<ul>
  <li>1000 W gedurende 1 uur = 1 kWh.</li>
  <li>Een ledlamp van 6 W die 1 uur brandt: 0,006 kWh.</li>
</ul>

<h2>Veiligheid</h2>
<p>Een onveilige installatie kan leiden tot schade aan apparatuur, elektrocutie of brand. In België worden installaties gekeurd volgens het <strong>AREI</strong> (Algemeen Reglement op de Elektrische Installaties). Dat schrijft onder meer voor: kabeltypes, waar kabels mogen lopen, het aantal stopcontacten en lichtpunten per kring, zekeringen, differentieel en aarding.</p>
${table(["Draad", "Kleur"], [
  ["Fasedraad", "Bruin"],
  ["Nuldraad", "Blauw"],
  ["Aardingsdraad", "Geel-groen gestreept"]
])}
<h3>Zekering (automaat)</h3>
<p>Beschermt tegen <strong>overbelasting en kortsluiting</strong> (en dus tegen schade en brand). Ze onderbreekt de stroom wanneer de stroomsterkte te hoog wordt.</p>
<ul><li>16 A voor een verlichtingskring</li><li>20 A voor stopcontacten</li><li>32 A voor een kookplaat</li></ul>
<p>Rekenvoorbeeld: op een kring van 20 A bij 230 V kan je maximaal 230 × 20 = 4600 W aansluiten.</p>
<h3>Differentieel (verliesstroomschakelaar)</h3>
<p>Beschermt tegen <strong>elektrocutie</strong>. Normaal is de stroom die via de fasedraad binnenkomt gelijk aan de stroom die via de nuldraad terugkeert. Is het verschil (de verliesstroom) te groot, dan onderbreekt de differentieel de kring.</p>
<ul><li>30 mA voor vochtige ruimtes</li><li>300 mA voor gewone ruimtes</li></ul>
<h3>Aarding</h3>
<p>Beschermt ook tegen elektrocutie en werkt samen met de differentieel. Bij een isolatiefout kan de behuizing van een toestel onder stroom staan. Is de behuizing geaard, dan vloeit die stroom weg naar de aarding; de differentieel merkt de lekstroom en schakelt uit. Een aarding is een pin of lus in de grond met een lage weerstand (<strong>kleiner dan 30 Ω</strong>).</p>
`,
      quiz: [
        { q: "Een lamp heeft een weerstand van 28 Ω en er loopt 500 mA door. Hoe groot is de spanning over de lamp?", o: ["14 V", "56 V", "14 000 V", "0,018 V"], a: 0, e: "U = I × R = 0,5 A × 28 Ω = 14 V. Zet 500 mA eerst om naar 0,5 A." },
        { q: "Over een toestel met een weerstand van 46 Ω staat 230 V. Hoe groot is de stroomsterkte?", o: ["5 A", "0,2 A", "10 580 A", "184 A"], a: 0, e: "I = U / R = 230 / 46 = 5 A." },
        { q: "Bij een spanning van 12 V meet je een stroom van 0,5 A. Hoe groot is de weerstand?", o: ["24 Ω", "6 Ω", "0,04 Ω", "12,5 Ω"], a: 0, e: "R = U / I = 12 / 0,5 = 24 Ω." },
        { q: "Een laptopadapter levert 18,5 V en maximaal 3,5 A. Welk vermogen kan hij maximaal leveren?", o: ["Ongeveer 65 W", "Ongeveer 5,3 W", "22 W", "Ongeveer 650 W"], a: 0, e: "P = U × I = 18,5 × 3,5 = 64,75 W ≈ 65 W." },
        { q: "Een pc verbruikt gemiddeld 300 W en staat 5 uur aan. Hoeveel energie is dat?", o: ["1,5 kWh", "1500 kWh", "60 kWh", "0,06 kWh"], a: 0, e: "300 W = 0,3 kW. 0,3 kW × 5 uur = 1,5 kWh." },
        { q: "Hoeveel vermogen kan je maximaal aansluiten op een stopcontactkring met een zekering van 20 A bij 230 V?", o: ["4600 W", "11,5 W", "250 W", "2300 W"], a: 0, e: "P = U × I = 230 V × 20 A = 4600 W." },
        { q: "Waartegen beschermt een zekering (automaat)?", o: ["Overbelasting en kortsluiting", "Elektrocutie door verliesstroom", "Te lage spanning", "Blikseminslag"], a: 0, e: "Ze onderbreekt de kring bij een te hoge stroomsterkte. De differentieel beschermt tegen elektrocutie." },
        { q: "Hoe werkt een differentieel (verliesstroomschakelaar)?", o: ["Hij vergelijkt de ingaande en uitgaande stroom en schakelt uit bij een te groot verschil", "Hij schakelt uit wanneer de stroomsterkte boven 20 A komt", "Hij zet wisselstroom om in gelijkstroom", "Hij leidt lekstroom af naar de grond"], a: 0, e: "Stroom via de fasedraad moet gelijk zijn aan stroom via de nuldraad. Een verschil wijst op verliesstroom." },
        { q: "Welke waarde heeft een differentieel voor vochtige ruimtes?", o: ["30 mA", "300 mA", "16 A", "30 A"], a: 0, e: "30 mA voor vochtige ruimtes, 300 mA voor gewone ruimtes." },
        { q: "Welke kleur heeft de aardingsdraad in een conforme installatie?", o: ["Geel-groen gestreept", "Bruin", "Blauw", "Zwart"], a: 0, e: "Bruin = fasedraad, blauw = nuldraad, geel-groen = aarding." },
        { q: "Wat levert het elektriciteitsnet in Europa?", o: ["Ongeveer 230 V wisselstroom aan 50 Hz", "Ongeveer 230 V gelijkstroom", "Ongeveer 110 V wisselstroom aan 60 Hz", "12 V gelijkstroom"], a: 0, e: "De spanning wisselt 50 keer per seconde tussen positief en negatief." },
        { q: "Welk onderdeel van een adapter verlaagt de netspanning naar bijvoorbeeld 12 V?", o: ["De transformator", "De zekering", "De differentieel", "De heatspreader"], a: 0, e: "De transformator verlaagt de spanning; andere componenten zetten AC om in DC." },
        { q: "Hoe groot mag de weerstand van een aarding maximaal zijn?", o: ["Kleiner dan 30 Ω", "Kleiner dan 300 Ω", "Groter dan 30 Ω", "Precies 230 Ω"], a: 0, e: "Een lage weerstand zorgt dat lekstroom gemakkelijk naar de grond kan." },
        { q: "Welke zekering hoort bij een verlichtingskring?", o: ["16 A", "20 A", "32 A", "300 mA"], a: 0, e: "16 A voor verlichting, 20 A voor stopcontacten, 32 A voor een kookplaat." }
      ]
    },

    // ------------------------------------------------------------------ M3
    {
      id: "m3",
      title: "M3 · Bits en bytes",
      summary: "Talstelsels, binair rekenen, 2-complement en ASCII.",
      goals: [
        "Omzetten tussen binair, octaal, decimaal en hexadecimaal.",
        "Een willekeurig ander talstelsel omzetten van en naar decimaal.",
        "Binaire getallen optellen en bepalen of er overflow is.",
        "Gehele getallen in 2-complementsvoorstelling omzetten in beide richtingen.",
        "Tekst omzetten naar ASCII (hexadecimaal) en terug."
      ],
      theory: `
<h2>Het binair talstelsel</h2>
<p>Computers gebruiken 2 cijfers (0 = uit, 1 = aan) omdat twee waarden eenvoudig voor te stellen zijn in elektronica. Tellen gaat zoals decimaal, maar de cijfers zijn al op na 1: 0, 1, 10, 11, 100, …</p>

<h3>Binair naar decimaal</h3>
<p>Vermenigvuldig elk cijfer met de bijhorende macht van 2 en tel op.</p>
${code`1101 = 1·2³ + 1·2² + 0·2¹ + 1·2⁰ = 8 + 4 + 0 + 1 = 13`}

<h3>Decimaal naar binair</h3>
<p>Deel herhaaldelijk door 2 en noteer de rest. Lees de resten <strong>van onder naar boven</strong>.</p>
${code`
13 ÷ 2 = 6 rest 1
 6 ÷ 2 = 3 rest 0
 3 ÷ 2 = 1 rest 1
 1 ÷ 2 = 0 rest 1      →  1101
`}
${note("Ga door tot je 0 overhoudt. Stoppen bij 1 is een veelgemaakte fout.", "warn")}

<h2>Bytes en datagroottes</h2>
<ul>
  <li><strong>Byte</strong> = 8 bits → 2⁸ = 256 waarden, van 0 t.e.m. 255.</li>
  <li><strong>Nibble</strong> = een halve byte = 4 bits.</li>
</ul>
<p>Voor grote hoeveelheden gebruiken we veelvouden van 1024 (= 2¹⁰), omdat 1000 geen macht van 2 is.</p>
${table(["Afkorting", "Naam", "Grootte"], [
  ["KiB", "kibibyte", "2¹⁰ = 1024 bytes"],
  ["MiB", "mebibyte", "2²⁰ bytes = 1024 KiB"],
  ["GiB", "gibibyte", "2³⁰ bytes = 1024 MiB"],
  ["TiB", "tebibyte", "2⁴⁰ bytes = 1024 GiB"],
  ["PiB", "pebibyte", "2⁵⁰ bytes = 1024 TiB"],
  ["EiB", "exbibyte", "2⁶⁰ bytes = 1024 PiB"]
])}
<p>In de praktijk zegt men vaak "gigabyte" terwijl "gibibyte" bedoeld wordt.</p>

<h2>Hexadecimaal</h2>
<p>Binaire getallen worden snel lang. Hexadecimaal (16-tallig) gebruikt de cijfers 0–9 en A–F. Eén hexadecimaal cijfer komt overeen met precies 4 bits.</p>
${table(["Dec", "Hex", "Bin", "Dec", "Hex", "Bin"], [
  ["0", "0", "0000", "8", "8", "1000"],
  ["1", "1", "0001", "9", "9", "1001"],
  ["2", "2", "0010", "10", "A", "1010"],
  ["3", "3", "0011", "11", "B", "1011"],
  ["4", "4", "0100", "12", "C", "1100"],
  ["5", "5", "0101", "13", "D", "1101"],
  ["6", "6", "0110", "14", "E", "1110"],
  ["7", "7", "0111", "15", "F", "1111"]
])}
<ul>
  <li><strong>Binair → hex</strong>: splits in groepjes van 4 (vul vooraan aan met nullen). 0101 1100 → 5 C → <strong>5C</strong>.</li>
  <li><strong>Hex → binair</strong>: zoek elk cijfer op. AE → 1010 1110 → <strong>10101110</strong>.</li>
</ul>

<h2>Octaal</h2>
<p>Groepjes van 3 bits geven 8 cijfers (0–7). Je komt dit tegen bij bestandsrechten in Linux: 755 = 111 101 101.</p>

<h2>Andere talstelsels</h2>
<p>Voor een N-tallig stelsel gebruik je machten van N (naar decimaal) of deel je door N (vanuit decimaal).</p>
${code`
Ternair 210 naar decimaal:  2·3² + 1·3¹ + 0·3⁰ = 18 + 3 + 0 = 21

Decimaal 19 naar ternair:   19 ÷ 3 = 6 rest 1
                             6 ÷ 3 = 2 rest 0
                             2 ÷ 3 = 0 rest 2     →  201
`}
${note("Omzetten van en naar een willekeurig talstelsel is een typische examenvraag.", "exam")}

<h2>Binair optellen</h2>
<p>Werkt zoals decimaal, van rechts naar links, maar je draagt over vanaf 2 in plaats van 10.</p>
${code`
0+0 = 0    0+1 = 1    1+0 = 1    1+1 = 10 (schrijf 0, draag 1 over)

    1
  0 1 1 0     (6)
+ 0 1 0 1     (5)
---------
  1 0 1 1     (11)
`}
<h3>Overflow</h3>
<p>Er is een vast aantal bits (bv. 32 of 64). Heeft het resultaat meer bits nodig dan beschikbaar, dan is er <strong>overflow</strong>: de meest linkse bit valt weg. Met 4 bits: 1111 + 0001 = 1 0000 → er blijft 0000 over (zoals een kilometerteller die terug naar 0 springt).</p>

<h2>Negatieve getallen: 2-complement</h2>
<p>De meest linkse bit is de <strong>tekenbit</strong>: 0 = positief of nul, 1 = negatief. Met 8 bits stel je <strong>−128 tot +127</strong> voor.</p>
<h3>Decimaal → 2-complement (negatief getal)</h3>
<ol>
  <li>Schrijf het positieve getal binair.</li>
  <li>Keer alle bits om.</li>
  <li>Tel 1 op.</li>
</ol>
${code`
-5 in 8 bits:   5      = 0000 0101
                omkeren → 1111 1010
                + 1     → 1111 1011
`}
<h3>2-complement → decimaal (begint met 1)</h3>
<ol>
  <li>Keer alle bits om.</li>
  <li>Tel 1 op.</li>
  <li>Zet om naar decimaal en zet er een minteken voor.</li>
</ol>
${code`1111 1011  → omkeren 0000 0100 → +1 = 0000 0101 = 5  →  -5`}
<p>Voordeel: dezelfde optelschakeling werkt voor positieve en negatieve getallen. 0000 0101 (+5) + 1111 1011 (−5) = 1 0000 0000; de overflow-bit wordt genegeerd en er blijft 0 over.</p>

<h2>Tekst</h2>
<h3>ASCII</h3>
<p>Elk karakter krijgt een getal. ASCII gebruikt <strong>7 bits</strong>; één karakter past in één byte. In de tabel lees je rij en kolom als hexadecimaal getal: rij 5, kolom A → 5A = "Z".</p>
${table(["Hex", "Tekens"], [
  ["20", "spatie"],
  ["30 – 39", "0 – 9"],
  ["41 – 5A", "A – Z"],
  ["61 – 7A", "a – z"]
])}
<p>Voorbeeld: "Hi" = 48 69 (H = 48, i = 69). Een kleine letter is steeds 20 (hex) hoger dan de hoofdletter. Op het examen krijg je normaal de ASCII-tabel; oefen het aflezen.</p>
<h3>Unicode</h3>
<ul>
  <li>ASCII kan te weinig tekens voorstellen (geen é, andere alfabetten, emoji).</li>
  <li><strong>Unicode</strong> geeft elk karakter een uniek hexadecimaal getal, bv. U+263A voor ☺.</li>
  <li>Die waarde wordt in bytes omgezet met een encoding: UTF-8, UTF-16 of UTF-32. <strong>UTF-8</strong> is het meest gebruikt: eenvoudige Latijnse tekens nemen 1 byte, complexere tot 4 bytes.</li>
</ul>
`,
      quiz: [
        { q: "Zet het binaire getal 1101 om naar decimaal.", o: ["13", "11", "14", "26"], a: 0, e: "8 + 4 + 0 + 1 = 13." },
        { q: "Zet het decimale getal 45 om naar binair.", o: ["101101", "101011", "110101", "100101"], a: 0, e: "45 = 32 + 8 + 4 + 1 → 101101. Via delen door 2: resten 1,0,1,1,0,1, van onder naar boven gelezen." },
        { q: "Hoeveel verschillende waarden kan je voorstellen met één byte?", o: ["256", "255", "128", "8"], a: 0, e: "2⁸ = 256 waarden, van 0 t.e.m. 255." },
        { q: "Wat is een nibble?", o: ["4 bits", "8 bits", "2 bits", "1024 bytes"], a: 0, e: "Een nibble is een halve byte." },
        { q: "Hoeveel bytes is 1 MiB?", o: ["2²⁰ bytes", "2¹⁰ bytes", "1 000 000 bytes", "2³⁰ bytes"], a: 0, e: "1 MiB = 1024 KiB = 1024 × 1024 = 2²⁰ bytes." },
        { q: "Zet het binaire getal 01011100 om naar hexadecimaal.", o: ["5C", "B8", "C5", "5B"], a: 0, e: "0101 = 5 en 1100 = C." },
        { q: "Zet het hexadecimale getal AE om naar binair.", o: ["10101110", "10111010", "11101010", "10101101"], a: 0, e: "A = 1010 en E = 1110." },
        { q: "Zet het hexadecimale getal 2F om naar decimaal.", o: ["47", "215", "32", "45"], a: 0, e: "2 × 16 + 15 = 47." },
        { q: "Zet het binaire getal 110100 om naar octaal.", o: ["64", "34", "52", "46"], a: 0, e: "Groepjes van 3: 110 = 6 en 100 = 4." },
        { q: "Zet het ternaire (3-tallige) getal 1202 om naar decimaal.", o: ["47", "45", "50", "1202"], a: 0, e: "1·27 + 2·9 + 0·3 + 2·1 = 27 + 18 + 0 + 2 = 47." },
        { q: "Zet het decimale getal 100 om naar het 5-tallig talstelsel.", o: ["400", "200", "40", "1300"], a: 0, e: "100 ÷ 5 = 20 rest 0; 20 ÷ 5 = 4 rest 0; 4 ÷ 5 = 0 rest 4 → 400. Controle: 4 × 25 = 100." },
        { q: "Bereken binair: 0110 + 0101.", o: ["1011", "1101", "1001", "1111"], a: 0, e: "6 + 5 = 11 = 1011." },
        { q: "In een systeem met 4 bits tel je 1011 + 0110 op. Wat blijft er over en is er overflow?", o: ["0001, met overflow", "10001, zonder overflow", "1111, zonder overflow", "0001, zonder overflow"], a: 0, e: "11 + 6 = 17 = 1 0001. Dat heeft 5 bits nodig; de meest linkse bit valt weg." },
        { q: "Wat is de 8-bit 2-complementsvoorstelling van −20?", o: ["1110 1100", "1110 1011", "1001 0100", "0001 0100"], a: 0, e: "20 = 0001 0100 → omkeren: 1110 1011 → +1: 1110 1100." },
        { q: "Welk decimaal getal stelt 1111 0100 voor in 8-bit 2-complement?", o: ["−12", "−11", "244", "−116"], a: 0, e: "Omkeren: 0000 1011 → +1: 0000 1100 = 12 → −12." },
        { q: "Welk bereik kan je voorstellen met 8 bits in 2-complement?", o: ["−128 tot +127", "−127 tot +128", "0 tot 255", "−255 tot +255"], a: 0, e: "De tekenbit halveert het positieve bereik; er is één negatief getal meer." },
        { q: "Welke ASCII-code (hexadecimaal) hoort bij de tekst 'Hi'?", o: ["48 69", "68 49", "48 49", "72 105"], a: 0, e: "H = 48 en i = 69 (hex). 72 en 105 zijn de decimale waarden." },
        { q: "Hoeveel bits gebruikt ASCII per karakter?", o: ["7", "8", "16", "32"], a: 0, e: "7 bits; in een byte komt er een 0 voor." },
        { q: "Hoeveel bytes neemt een karakter in UTF-8 in?", o: ["1 tot 4 bytes", "Altijd 1 byte", "Altijd 2 bytes", "Altijd 4 bytes"], a: 0, e: "Eenvoudige Latijnse tekens 1 byte, complexere tekens tot 4 bytes." }
      ]
    },

    // ------------------------------------------------------------------ M4
    {
      id: "m4",
      title: "M4 · Virtualisatie",
      summary: "Hypervisor, virtuele machines en waarom we ze gebruiken.",
      goals: [
        "Uitleggen wat een virtuele machine is en waarvoor ze gebruikt wordt.",
        "Met een virtuele machine werken en er een importeren."
      ],
      theory: `
<h2>Wat is virtualisatie?</h2>
<p>Een techniek waarbij je op één fysiek systeem meerdere <strong>virtuele systemen</strong> draait met behulp van software: de <strong>hypervisor</strong>.</p>
<ul>
  <li>De hypervisor wordt in deze cursus bovenop het besturingssysteem van de <strong>host</strong> (de fysieke machine) geïnstalleerd.</li>
  <li>Hij maakt <strong>virtuele hardware</strong> aan: virtuele harde schijf, netwerkkaart, CPU, RAM, …</li>
  <li>Daarop installeer je een volledig nieuw computersysteem: de <strong>virtuele machine (VM)</strong> of guest, met een eigen besturingssysteem.</li>
  <li>Voorbeelden van hypervisors: VirtualBox (gebruikt in het labo), VMware Workstation.</li>
</ul>
${code`
  VM #1 (eigen OS)     VM #2 (eigen OS)
  -------------------------------------
              Hypervisor
  -------------------------------------
     Besturingssysteem van de host
  -------------------------------------
            Fysieke hardware
`}
<p>Voor de host is een VM <strong>niet meer dan een bestand</strong>. Dankzij de hypervisor start je daarmee een volledige machine op. VM's kunnen verschillende hardware-specificaties en verschillende besturingssystemen hebben.</p>

<h2>Waarom virtualisatie?</h2>
<h3>Flexibele sandbox</h3>
<p>Een veilige omgeving om te testen en te experimenteren. Gaat er iets kapot, dan maak je gewoon een nieuwe VM. Omdat een VM een bestand is, kan je er eenvoudig een kopie van nemen als back-up.</p>
<h3>Omgevingen delen</h3>
<p>Je deelt een VM door het bestand door te geven. Op elke machine met dezelfde hypervisor kan je collega de VM opstarten, met alles wat jij erin installeerde.</p>
<h3>Productieomgevingen</h3>
<p>Een productieomgeving is waar een bedrijf de applicaties en services host die voor de buitenwereld beschikbaar zijn. Die moeten altijd blijven werken. Met meerdere fysieke servers met een hypervisor kunnen VM's bij een defect of onderhoud <strong>automatisch naar een andere server</strong> verhuizen en daar opstarten.</p>

<h2>Uit het labo (VirtualBox)</h2>
<ul>
  <li><strong>ISO-bestand</strong>: een image van een installatieschijf. Je steekt het in de virtuele dvd-drive van de VM en start ervan op. Op een fysieke pc zet je een ISO op een USB-stick (bv. met Rufus).</li>
  <li><strong>Bootable media</strong>: een schijf waarvan een pc kan opstarten. Een nieuwe, lege VM heeft nog geen besturingssysteem.</li>
  <li><strong>Live-omgeving</strong>: het besturingssysteem draait rechtstreeks van het installatiemedium. Niets wordt permanent bewaard; alles staat in het werkgeheugen.</li>
  <li>Bij het aanmaken kies je hoeveel <strong>geheugen en processoren</strong> de VM krijgt en hoe groot de <strong>virtuele harde schijf</strong> is (25 GB volstaat voor Ubuntu).</li>
  <li><strong>Snapshot</strong>: een bewaarde toestand van de VM waar je later naar terug kan keren als er iets misloopt.</li>
  <li>Zet de map van je VM niet op OneDrive.</li>
</ul>
`,
      quiz: [
        { q: "Hoe heet de software waarmee je virtuele machines draait op een fysieke machine?", o: ["Hypervisor", "Bootloader", "Kernel", "Package manager"], a: 0, e: "De hypervisor maakt virtuele hardware aan waarop je een besturingssysteem installeert. VirtualBox is een voorbeeld." },
        { q: "Wat is de 'host' bij virtualisatie?", o: ["De fysieke machine waarop de hypervisor draait", "De virtuele machine", "Het ISO-bestand", "De virtuele harde schijf"], a: 0, e: "De VM zelf noemen we de guest." },
        { q: "Wat is een virtuele machine vanuit het standpunt van de host?", o: ["Een bestand", "Een aparte fysieke schijf", "Een extra processorkern", "Een netwerkapparaat"], a: 0, e: "Daarom kan je een VM eenvoudig kopiëren, back-uppen en delen." },
        { q: "Welke is GEEN voordeel van virtualisatie volgens de cursus?", o: ["Een VM is altijd sneller dan de fysieke machine", "Een veilige omgeving om te experimenteren", "Omgevingen eenvoudig delen met collega's", "VM's kunnen bij een defect naar een andere server verhuizen"], a: 0, e: "De drie voordelen zijn: flexibele sandbox, omgevingen delen en gebruik in productieomgevingen." },
        { q: "Wat gebeurt er in een productieomgeving als een fysieke server faalt?", o: ["De VM's kunnen automatisch op een andere fysieke server opstarten", "Alle VM's zijn onherroepelijk verloren", "De hypervisor installeert een nieuw besturingssysteem", "De VM's draaien verder zonder hardware"], a: 0, e: "Daarom gebruikt men meerdere fysieke servers met hypervisor-software." },
        { q: "Wat is een ISO-bestand?", o: ["Een image met de volledige inhoud van een installatieschijf in één bestand", "Een back-up van het werkgeheugen", "Het configuratiebestand van de hypervisor", "Een snapshot van een virtuele machine"], a: 0, e: "Je koppelt de ISO aan de virtuele dvd-drive om het besturingssysteem te installeren." },
        { q: "Wat is kenmerkend voor een live-omgeving?", o: ["Niets wordt permanent opgeslagen; alles staat in het werkgeheugen", "Het besturingssysteem is al op de schijf geïnstalleerd", "Je hebt er geen installatiemedium voor nodig", "Ze werkt enkel zonder hypervisor"], a: 0, e: "Je start rechtstreeks van het installatiemedium en kan het systeem al uitproberen." },
        { q: "Waarvoor dient een snapshot van een virtuele machine?", o: ["Terugkeren naar een eerder bewaarde toestand als er iets misloopt", "De VM sneller laten opstarten", "De virtuele schijf vergroten", "Een ISO-bestand aanmaken"], a: 0, e: "In labo 2 maak je een snapshot vóór de installatie van Fedora." }
      ]
    },

    // ------------------------------------------------------------------ M5
    {
      id: "m5",
      title: "M5 · Linux command line",
      summary: "Navigeren, bestanden beheren, rechten, grep, pipes, cut en tr.",
      goals: [
        "Alle commando's uit de oefeningen gebruiken: touch, cat, echo, pwd, cd, ls, mkdir, cp, mv, grep, cut, tr, …",
        "Je weg vinden in de Linux file system hierarchy.",
        "Documentatie raadplegen met man.",
        "Rechten inspecteren, interpreteren (ls -l en octaal) en aanpassen met chmod.",
        "Complexere commando's bouwen met pipes, output redirection, for-lussen en command substitution."
      ],
      theory: `
<h2>Waarom de command line?</h2>
<ul>
  <li><strong>Snelheid</strong>: een commando typen gaat vaak sneller dan menu's doorzoeken. Bv. ${c`mv Downloads/*.mp4 Videos/`}.</li>
  <li><strong>Efficiëntie</strong>: een GUI belast het systeem meer (CPU en geheugen) dan een CLI. Daarom hebben Linux-servers meestal geen grafische interface.</li>
  <li><strong>Automatisatie</strong>: commando's zet je gewoon in een script.</li>
  <li><strong>Meer controle</strong>: veel opties, en je kan commando's combineren.</li>
  <li><strong>Eenvoudige implementatie</strong>: een CLI is sneller gemaakt dan een GUI; veel tools hebben enkel een CLI.</li>
  <li><strong>Remote access</strong>: via SSH log je gemakkelijk in op meerdere servers.</li>
</ul>

<h2>Efficiënt werken</h2>
${table(["Toets", "Wat doet het?"], [
  ["CTRL+ALT+T", "Terminal openen (Ubuntu)"],
  ["TAB", "Commando of bestandsnaam aanvullen; twee keer TAB toont de mogelijkheden"],
  ["Pijltje omhoog / omlaag", "Door vorige commando's bladeren"],
  ["CTRL+R", "Zoeken in vorige commando's"],
  ["CTRL+C", "Een commando dat blijft hangen stoppen"],
  ["CTRL+D", "Een interactieve shell verlaten (bash, python3)"]
])}

<h2>Shell-commando's</h2>
<ul>
  <li><strong>Uitvoerbare bestanden</strong>: de meeste commando's. De shell zoekt ze in de mappen van de <strong>PATH</strong>-variabele (${c`echo $PATH`}), gescheiden door ":". Met ${c`which ls`} zie je waar het bestand staat (${c`/usr/bin/ls`}).</li>
  <li><strong>Built-in commando's</strong>: ingebouwd in de shell, zoals ${c`cd`}. ${c`which cd`} geeft niets. Bestaat een commando in beide vormen (echo), dan krijgt de built-in voorrang.</li>
</ul>
<h3>Structuur van een commando</h3>
${code`
cat -n /etc/passwd
 |   |       |
 |   |       argument (welk bestand)
 |   optie (lijnnummers tonen)
 commando
`}
${note("Spaties scheiden commando, opties en argumenten. Staat er een spatie in een naam, gebruik dan aanhalingstekens of een backslash: <code>cat \"mijn bestand\"</code> of <code>cat mijn\\ bestand</code>.", "warn")}

<h2>Documentatie</h2>
${table(["Commando", "Gebruik"], [
  [c`man ls`, "Manpage openen. Scrollen met pijltjes, Page Up/Down, d en u. Zoeken met / + zoekterm, daarna n (volgende) en N (vorige). Sluiten met q."],
  [c`man 2 write`, "Een specifieke sectie raadplegen. Sectie 1 = programma's, sectie 2 = system calls, sectie 5 = bestandsformaten."],
  [c`help cd`, "Hulp voor built-in commando's (die hebben geen manpage)"],
  [c`apropos zoekterm`, "Zoeken in alle manpages (met -s 1 enkel in sectie 1)"],
  [c`ls --help`, "Kort overzicht van opties, ingebouwd in het commando"]
])}

<h2>Navigeren</h2>
<h3>File System Hierarchy</h3>
<p>Alles hangt in één boom die begint bij de <strong>root directory</strong> ${c`/`}. Er zijn geen schijfletters; extra schijven of partities worden ergens in de boom <em>gemount</em>.</p>
${table(["Map", "Inhoud"], [
  [c`/etc`, "Configuratiebestanden"],
  [c`/home`, "Home directories van gebruikers, bv. /home/bassie"],
  [c`/var/log`, "Logbestanden"],
  [c`/usr/bin`, "Uitvoerbare bestanden (programma's)"],
  [c`/tmp`, "Tijdelijke bestanden"],
  [c`/proc`, "Virtuele bestanden met info over processen (zie M6)"]
])}
<h3>Paden</h3>
<ul>
  <li>${c`pwd`} toont de <strong>working directory</strong>. Een nieuwe shell start in je home directory.</li>
  <li><strong>Absoluut pad</strong>: begint bij de root, dus altijd met ${c`/`}.</li>
  <li><strong>Relatief pad</strong>: vertrekt vanuit de working directory. ${c`.`} = huidige map, ${c`..`} = bovenliggende map.</li>
  <li>${c`~`} = je home directory. ${c`cd`}, ${c`cd ~`} en ${c`cd /home/username`} doen hetzelfde.</li>
</ul>
${code`
cd Documents        naar de map Documents in de huidige map
cd ..               één map omhoog
cd ../../etc        twee mappen omhoog en dan naar etc
cd ~/Documents      naar Documents in je home directory, van eender waar
cat ../../etc/passwd    relatief pad vanuit /home/username
`}

<h2>Bestanden en mappen beheren</h2>
${table(["Commando", "Betekenis"], [
  [c`echo tekst`, "Toon de tekst"],
  [c`ls` + " / " + c`ls pad`, "Inhoud van de map tonen. -l = lange lijst, -a = ook verborgen bestanden, -R = recursief, -h = leesbare groottes"],
  [c`touch pad`, "Leeg bestand aanmaken (past eigenlijk de wijzigingstijd aan). Meerdere namen mogen: touch file1 file2 file3"],
  [c`cat pad`, "Inhoud van een bestand tonen (-n met lijnnummers)"],
  [c`mkdir pad`, "Map aanmaken"],
  [c`rmdir pad`, "Lege map verwijderen"],
  [c`rm pad`, "Bestand verwijderen"],
  [c`rm -rf map`, "Map met volledige inhoud verwijderen (-r recursief, -f zonder bevestiging)"],
  [c`cp van naar`, "Kopiëren. Voor mappen: cp -r"],
  [c`mv van naar`, "Verplaatsen of hernoemen (ook mappen)"]
])}
${code`
cp /etc/group Documents/groups.txt     kopiëren en meteen hernoemen
cp /etc/passwd .                       kopiëren naar de huidige map
cp -r dir1 dir2                        volledige map kopiëren
touch "mijn bestand"                   één bestand met een spatie in de naam
cd /tmp && touch HelloWorld.txt && cd  oneliner met &&
`}
<p>${c`&&`} voert het volgende commando enkel uit als het vorige geslaagd is.</p>

<h2>Variabelen</h2>
${code`
lector='Roel Standaert'     toekennen: GEEN spaties rond =
echo $lector                waarde opvragen met $
env                         alle omgevingsvariabelen tonen (zoals PATH)
`}

<h2>Teksteditor: nano</h2>
<p>${c`nano NewFile.txt`} opent (of maakt) het bestand. ^ staat voor CTRL: <strong>CTRL+O</strong> opslaan, <strong>CTRL+X</strong> afsluiten.</p>

<h2>Softwarebeheer met apt</h2>
<p>Ubuntu gebruikt de package manager <strong>APT</strong>. Die haalt info uit <strong>repositories</strong>, opgelijst in ${c`/etc/apt/sources.list.d`}. (Fedora gebruikt ${c`dnf`}.)</p>
${table(["Commando", "Wat doet het?"], [
  [c`apt list`, "Alle beschikbare pakketten tonen"],
  [c`sudo apt update`, "Enkel de info over pakketten ophalen. Installeert niets. (Get = nieuwe info, Hit = geen nieuwe info)"],
  [c`sudo apt upgrade`, "Alle geïnstalleerde pakketten bijwerken naar de nieuwste versie"],
  [c`sudo apt install nginx`, "Pakket installeren, samen met zijn dependencies"],
  [c`sudo apt remove nginx`, "Pakket verwijderen"]
])}
<p><strong>Dependencies</strong> zijn pakketten die een ander pakket nodig heeft om te werken; de package manager installeert ze automatisch. Bij [Y/n] is de hoofdletter de standaardkeuze.</p>

<h2>Rechten</h2>
<p>Per bestand zijn er rechten voor drie categorieën: <strong>owner</strong>, <strong>group</strong> en <strong>others</strong>. Elk krijgt <strong>r</strong>ead, <strong>w</strong>rite en e<strong>x</strong>ecute.</p>
${code`
$ ls -l
drwxr-xr-x 2 roel roel 4096 Oct 30 13:21 dir
-rw-r--r-- 1 roel roel    0 Oct 30 13:20 file1
-rwxr-x--- 1 roel roel    0 Oct 30 13:20 file3
|\ /\ /\ /    |    |
| |  |  |     |    group (kolom 4)
| |  |  |     owner (kolom 3)
| |  |  others
| |  group
| owner
d = directory, - = gewoon bestand
`}
<h3>Octale voorstelling</h3>
${table(["Recht", "Binair", "Octaal"], [["read", "100", "4"], ["write", "010", "2"], ["execute", "001", "1"]])}
<p>Tel de waarden op per categorie: rwx = 7, rw- = 6, r-x = 5, r-- = 4, --- = 0.</p>
${code`
chmod 755 file     rwxr-xr-x
chmod 764 file     rwxrw-r--
chmod 600 file     rw-------   (enkel lees- en schrijfbaar door de owner)
`}
${note("Let op de volgorde in de vraag. \"Leesbaar en schrijfbaar door de group, leesbaar en uitvoerbaar door de owner, leesbaar voor others\" is 564: de owner komt altijd eerst.", "exam")}
<p>Je kan enkel de rechten aanpassen van bestanden waarvan je de owner bent. ${c`id`} toont je user id, group id en al je groepen.</p>
<h3>Execute-rechten op een map</h3>
<ul>
  <li><strong>read</strong> op een map: je kan de lijst van bestanden zien (ls).</li>
  <li><strong>execute</strong> op een map: je kan aan de inhoud van de map.</li>
  <li>Map met rechten 100: ${c`ls`} geeft permission denied, maar ${c`cat dir1/file1`} werkt. Map met rechten 400: ${c`ls`} toont de namen, maar ${c`cat dir2/file2`} geeft permission denied.</li>
  <li>${c`mkdir`} geeft een map automatisch execute-rechten; ${c`touch`} geeft een bestand die niet.</li>
  <li>Een uitvoerbaar bestand in de huidige map start je met ${c`./mijn-programma`}.</li>
</ul>
<h3>De root-gebruiker</h3>
<p>De beheerder met <strong>user id 0</strong>. Root negeert de rechten op bestanden (behalve dat een bestand zonder execute-recht niet uitgevoerd wordt). Met ${c`sudo`} voor een commando voer je het uit als root.</p>

<h2>Zoeken met grep</h2>
${code`
grep student /etc/passwd           lijnen met "student"
grep ^root /etc/passwd             lijnen die beginnen met "root"   (^ = begin van de lijn)
grep no$ /etc/ssh/ssh_config       lijnen die eindigen op "no"      ($ = einde van de lijn)
grep -v ^# /etc/resolv.conf        lijnen die NIET beginnen met #   (-v = invert match)
grep ^-....w                       . = eender welk karakter (wildcard)
`}

<h2>Pipes</h2>
<p>Een pipe ${c`|`} geeft de output van het commando links als input aan het commando rechts.</p>
${code`
ls -l /etc | grep group
cat /usr/share/dict/american-english | grep ^f | grep s$     begint met f, eindigt op s
ls -la /etc | grep ^-rwx           gewone bestanden met rwx voor de owner
ls -la /var/log | grep ^-....w     gewone bestanden die schrijfbaar zijn door de group
`}

${note("Tel de posities in de eerste kolom van <code>ls -l</code>: teken 1 is het type, 2–4 de owner, 5–7 de group, 8–10 others. De w van de group is dus het zesde teken: een streepje, vier willekeurige tekens en dan w. In de syllabus staat <code>^....w</code>; tel het zelf na in je terminal.", "warn")}

<h2>Output redirection</h2>
${code`
echo "Hello world" > file1         overschrijft het bestand
echo "Goodbye" >> file1            voegt toe aan het einde
`}
${note("Een enkele pijl overschrijft altijd de volledige inhoud. Gebruik >> om toe te voegen.", "warn")}

<h2>Tekst transformeren</h2>
${code`
cut -d = -f 2 /etc/lsb-release       splits op = en hou veld 2
cut -d : -f 1,3 /etc/passwd          gebruikersnaam en user id
cat /etc/passwd | tr ':' ','         vervang : door ,
tr aeiou '*'                         vervang alle klinkers door *
tr -s ' '                            herhaalde spaties samendrukken tot één
`}
<h3>Gecombineerde oefening</h3>
<p>Toon alle gewone bestanden in /var/log met enkel permissies, grootte en naam:</p>
${code`ls -la /var/log | grep ^- | tr -s ' ' | cut -d ' ' -f 1,5,9`}
<p>Zonder ${c`tr -s ' '`} werkt cut niet goed, omdat er meerdere spaties tussen de kolommen staan.</p>

<h2>Extra: for-lussen en command substitution</h2>
${note("Dit staat in de doelstellingen maar niet in de syllabus. Vergelijk met de oefeningen en cheatsheets op Toledo.", "warn")}
${code`
for f in *.txt; do echo $f; done        herhaal een commando voor elk bestand
for i in 1 2 3; do touch file$i; done   maakt file1, file2 en file3

echo "Vandaag is $(date)"               $(...) wordt vervangen door de output van het commando
aantal=$(ls | wc -l)                    output van een commando in een variabele
`}
`,
      quiz: [
        { q: "Waarom hebben Linux-servers meestal geen grafische interface?", o: ["Een GUI gebruikt meer CPU en geheugen dan een CLI", "Linux ondersteunt geen grafische interface", "Een GUI is minder veilig dan SSH", "Servers hebben geen grafische kaart"], a: 0, e: "Dat is het efficiëntie-argument. Beheer gebeurt op afstand via SSH." },
        { q: "Een commando blijft hangen in je terminal. Hoe stop je het?", o: ["CTRL+C", "CTRL+D", "CTRL+R", "CTRL+O"], a: 0, e: "CTRL+C stopt het lopende commando. CTRL+D verlaat een interactieve shell." },
        { q: "`which cd` geeft geen output. Waarom?", o: ["`cd` is een built-in commando van de shell", "`cd` staat niet in de PATH-variabele door een fout", "`cd` is een alias voor `ls`", "Je hebt geen rechten om `cd` te zien"], a: 0, e: "cd verandert de map van de shell zelf en kan dus geen apart uitvoerbaar bestand zijn. Gebruik `help cd` voor documentatie." },
        { q: "Wat is `-n` in het commando `cat -n /etc/passwd`?", o: ["Een optie", "Een argument", "Het commando", "Een variabele"], a: 0, e: "cat is het commando, -n de optie (lijnnummers) en /etc/passwd het argument." },
        { q: "Hoe zoek je in een manpage naar het woord 'human'?", o: ["Typ `/human` en druk op Enter", "Typ `grep human`", "Druk op CTRL+F", "Typ `?find human`"], a: 0, e: "Daarna ga je met n naar de volgende en met N naar de vorige match. Met q sluit je de manpage." },
        { q: "In welke map staan de configuratiebestanden op een Linux-systeem?", o: ["/etc", "/var/log", "/usr/bin", "/home"], a: 0, e: "/var/log bevat logbestanden, /usr/bin programma's en /home de home directories." },
        { q: "Je bevindt je in /home/username. Met welk relatief pad toon je de inhoud van /etc/passwd?", o: ["cat ../../etc/passwd", "cat ../etc/passwd", "cat /etc/passwd", "cat ~/etc/passwd"], a: 0, e: "Twee mappen omhoog brengt je bij /. /etc/passwd werkt ook, maar is een absoluut pad." },
        { q: "Wat doet het commando `cd` zonder argumenten?", o: ["Naar je home directory gaan", "Naar de root directory gaan", "Eén map omhoog gaan", "De huidige map tonen"], a: 0, e: "cd, cd ~ en cd /home/username doen hetzelfde." },
        { q: "Welk commando maakt precies één bestand met de naam `mijn bestand`?", o: ["touch \"mijn bestand\"", "touch mijn bestand", "touch mijn+bestand", "mkdir \"mijn bestand\""], a: 0, e: "Zonder aanhalingstekens maakt touch twee bestanden: mijn en bestand." },
        { q: "Welk commando kopieert de map dir1 met volledige inhoud naar een nieuwe map dir2?", o: ["cp -r dir1 dir2", "cp dir1 dir2", "mv dir1 dir2", "cp -f dir1 dir2"], a: 0, e: "Voor mappen heeft cp de optie -r (recursief) nodig. mv zou de map verplaatsen." },
        { q: "Wat doet `rmdir map` als de map niet leeg is?", o: ["Het weigert de map te verwijderen", "Het verwijdert de map met volledige inhoud", "Het verwijdert enkel de bestanden", "Het vraagt om bevestiging en verwijdert dan alles"], a: 0, e: "rmdir verwijdert enkel lege mappen. Gebruik rm -rf voor een map met inhoud." },
        { q: "Welke toekenning van een variabele is correct?", o: ["lector='Roel Standaert'", "lector = 'Roel Standaert'", "$lector='Roel Standaert'", "lector= Roel Standaert"], a: 0, e: "Geen spaties rond het gelijkheidsteken, en aanhalingstekens omdat de waarde een spatie bevat." },
        { q: "Wat doet `sudo apt update`?", o: ["De info over beschikbare pakketten ophalen, zonder iets te installeren", "Alle geïnstalleerde pakketten bijwerken", "Het besturingssysteem herstarten", "Ongebruikte pakketten verwijderen"], a: 0, e: "Pas `sudo apt upgrade` werkt de geïnstalleerde pakketten bij." },
        { q: "Hoe sla je een bestand op in nano?", o: ["CTRL+O", "CTRL+S", "CTRL+X", "CTRL+W"], a: 0, e: "^O = Write Out. Met CTRL+X sluit je nano." },
        { q: "Welke octale rechten horen bij `-rwxr-x---`?", o: ["750", "760", "740", "057"], a: 0, e: "rwx = 7, r-x = 5, --- = 0." },
        { q: "Welke rechten geeft `chmod 644 file`?", o: ["rw-r--r--", "rwxr--r--", "rw-rw-r--", "r--rw-rw-"], a: 0, e: "6 = rw-, 4 = r--, 4 = r--." },
        { q: "Een bestand moet leesbaar en schrijfbaar zijn door de group, leesbaar en uitvoerbaar door de owner en leesbaar voor others. Welk commando?", o: ["chmod 564 file", "chmod 654 file", "chmod 546 file", "chmod 465 file"], a: 0, e: "Owner komt eerst: r-x = 5. Group rw- = 6. Others r-- = 4." },
        { q: "Een map heeft rechten 100 (enkel execute voor de owner). Wat kan de owner?", o: ["Een bestand in de map lezen als hij de naam kent, maar de lijst van bestanden niet zien", "De lijst van bestanden zien, maar de bestanden niet openen", "Niets", "Alles"], a: 0, e: "Execute op een map geeft toegang tot de inhoud; read is nodig om de lijst te zien." },
        { q: "Welk user id heeft de root-gebruiker?", o: ["0", "1", "1000", "-1"], a: 0, e: "Met sudo voer je een commando uit als root." },
        { q: "Welk commando toont alle lijnen in /etc/passwd die beginnen met 'root'?", o: ["grep ^root /etc/passwd", "grep root$ /etc/passwd", "grep -v root /etc/passwd", "grep *root /etc/passwd"], a: 0, e: "^ geeft het begin van de lijn aan, $ het einde." },
        { q: "Welk commando toont alle lijnen in /etc/resolv.conf die NIET beginnen met #?", o: ["grep -v ^# /etc/resolv.conf", "grep ^# /etc/resolv.conf", "grep -n #$ /etc/resolv.conf", "grep !# /etc/resolv.conf"], a: 0, e: "-v (invert match) selecteert de lijnen die niet matchen." },
        { q: "Wat doet `ls -la /etc | grep ^-rwx`?", o: ["De gewone bestanden in /etc tonen waarop de owner rwx-rechten heeft", "Alle mappen in /etc tonen", "De rechten van /etc aanpassen naar rwx", "Bestanden tonen waarvan de naam begint met -rwx"], a: 0, e: "De pipe geeft de output van ls door aan grep. Een lijn die met - begint is een gewoon bestand." },
        { q: "Wat is het verschil tussen `>` en `>>`?", o: ["`>` overschrijft het bestand, `>>` voegt toe aan het einde", "`>` voegt toe, `>>` overschrijft", "`>` werkt met bestanden, `>>` met mappen", "Er is geen verschil"], a: 0, e: "Kijk goed na dat je >> gebruikt wanneer je de bestaande inhoud wil behouden." },
        { q: "Welk commando haalt de gebruikersnaam (kolom 1) en het user id (kolom 3) uit /etc/passwd?", o: ["cut -d : -f 1,3 /etc/passwd", "cut -f : -d 1,3 /etc/passwd", "tr ':' '1,3' /etc/passwd", "grep -d : -f 1,3 /etc/passwd"], a: 0, e: "-d bepaalt het scheidingsteken, -f de velden (te tellen vanaf 1)." },
        { q: "Waarvoor dient `tr -s ' '` in `ls -la /var/log | grep ^- | tr -s ' ' | cut -d ' ' -f 1,5,9`?", o: ["Herhaalde spaties samendrukken tot één, zodat cut de kolommen juist telt", "Spaties vervangen door tabs", "De output sorteren", "Lege lijnen verwijderen"], a: 0, e: "ls -la gebruikt meerdere spaties tussen kolommen; zonder squeeze telt cut verkeerd." },
        { q: "Wat betekent `&&` in `mkdir NieuweMap && cd NieuweMap`?", o: ["Voer het tweede commando enkel uit als het eerste geslaagd is", "Voer beide commando's tegelijk uit", "Geef de output van het eerste door aan het tweede", "Voer het tweede commando uit als het eerste mislukt"], a: 0, e: "Zo bouw je een oneliner." }
      ]
    },

    // ------------------------------------------------------------------ M6
    {
      id: "m6",
      title: "M6 · Processen",
      summary: "Process scheduling (FCFS, SJF, RR), system calls en interrupts.",
      goals: [
        "De scheduling-algoritmes FCFS, SJF en RR vergelijken.",
        "FCFS, SJF en RR uitvoeren en starttijd, omlooptijd en relatieve omlooptijd bepalen.",
        "Uitleggen waarvoor system calls en interrupts dienen.",
        "De toestand van processen inspecteren en processen onderbreken via de command line.",
        "Een simpele systemd service maken of corrigeren op basis van een voorbeeld."
      ],
      theory: `
<h2>Processen</h2>
<p>Een <strong>proces</strong> is een programma in uitvoering. Het besturingssysteem houdt per proces onder meer bij:</p>
<ul>
  <li>waar het proces zich in de code bevindt (<strong>program counter</strong>);</li>
  <li>welke bestanden het gebruikt (<strong>open files</strong>);</li>
  <li>welk geheugen het gebruikt;</li>
  <li>de <strong>status</strong> (draaiend, wachtend op input, …).</li>
</ul>
<h3>Processen op Linux: /proc</h3>
<p>${c`/proc`} is een speciaal bestandssysteem met de info die de kernel over processen heeft. Elke genummerde map is een proces; het nummer is de <strong>process id (PID)</strong>. De bestanden staan niet op schijf: het zijn virtuele bestanden.</p>
${code`
ls /proc                     alle processen (genummerde mappen)
ls -la /proc/$BASHPID        info over je huidige shell
/proc/$BASHPID/exe           link naar het programma (/usr/bin/bash)
/proc/$BASHPID/fd            open file descriptors
/proc/$BASHPID/limits        limieten die de kernel oplegt
`}

<h2>Process scheduling</h2>
<p>Vroeger besliste een menselijke operator met ponskaarten welk programma wanneer draaide. Nu doet de <strong>process scheduler</strong> van het besturingssysteem dat: hij bepaalt welk proces wanneer op een processorkern mag uitvoeren. We gaan uit van één kern.</p>
<h3>Preëmptief of niet</h3>
<ul>
  <li><strong>Preëmptief</strong>: de scheduler kan een draaiend proces onderbreken. Bijna elk modern besturingssysteem werkt zo.</li>
  <li><strong>Niet-preëmptief</strong>: het proces beslist zelf wanneer het stopt of pauzeert (bv. Windows vóór Windows 95).</li>
</ul>
<h3>Begrippen</h3>
${table(["Begrip", "Betekenis"], [
  ["Aankomsttijd", "Het vroegst mogelijke tijdstip waarop het proces kan starten"],
  ["Uitvoertijd", "Hoe lang het proces moet uitvoeren"],
  ["Start", "Het moment waarop het proces effectief begint"],
  ["Omlooptijd", "Eindtijd − aankomsttijd"],
  ["Wachttijd", "Omlooptijd − uitvoertijd"],
  ["Relatieve omlooptijd", "Omlooptijd ÷ uitvoertijd (1 is het best mogelijke)"]
])}

<h3>First Come, First Serve (FCFS)</h3>
<p>Zoals één kassa in de supermarkt: wie eerst aankomt, wordt eerst volledig uitgevoerd. <strong>Niet-preëmptief.</strong></p>
${table(["Proces", "Aankomst", "Uitvoertijd", "Start", "Einde", "Omlooptijd", "Relatief"], [
  ["A", "0", "1", "0", "1", "1", "1"],
  ["B", "1", "100", "1", "101", "100", "1"],
  ["C", "2", "1", "101", "102", "100", "100"],
  ["D", "3", "100", "102", "202", "199", "1,99"]
])}
<ul>
  <li><strong>Voordeel</strong>: goed voor processen met lange CPU bursts (batch-processen, bv. een video exporteren).</li>
  <li><strong>Nadeel</strong>: korte processen die later aankomen wachten relatief lang (proces C). Een proces dat even pauzeert, moet weer achteraan aanschuiven.</li>
</ul>

<h3>Shortest Job First (SJF)</h3>
<p>Van de wachtende processen wordt telkens het <strong>kortste</strong> eerst uitgevoerd. Bij gelijke uitvoertijd gaat het proces dat eerst aankwam voor.</p>
${table(["Proces", "Aankomst", "Uitvoertijd", "Start", "Einde", "Omlooptijd", "Relatief"], [
  ["A", "0", "1", "0", "1", "1", "1"],
  ["B", "0", "100", "2", "102", "102", "1,02"],
  ["C", "1", "1", "1", "2", "1", "1"],
  ["D", "1", "100", "102", "202", "201", "2,01"]
])}
<ul>
  <li><strong>Voordeel</strong>: korte processen zijn snel klaar, dus een lage gemiddelde omlooptijd.</li>
  <li><strong>Nadeel</strong>: lange processen kunnen steeds uitgesteld worden. Een proces dat nooit aan de beurt komt = <strong>starvation</strong>. Oplossing: <strong>aging</strong>, waarbij de scheduler rekening houdt met hoe lang een proces al wacht.</li>
</ul>

<h3>Round Robin (RR)</h3>
<p>FCFS, maar <strong>preëmptief</strong>: elk proces mag maximaal één <strong>tijdsquantum</strong> uitvoeren, wordt dan onderbroken en gaat achteraan in de wachtrij.</p>
<p>Voorbeeld met tijdsquantum 60 (A komt aan op 0, B op 1, C op 2, D op 3):</p>
${table(["Tijd", "Wat gebeurt er?", "Wachtrij daarna"], [
  ["0 – 1", "A voert uit en is klaar", "–"],
  ["1 – 61", "B voert 60 uit (nog 40 over)", "C, D, B(40)"],
  ["61 – 62", "C voert uit en is klaar (omlooptijd 60)", "D, B(40)"],
  ["62 – 122", "D voert 60 uit (nog 40 over)", "B(40), D(40)"],
  ["122 – 162", "B is klaar (omlooptijd 161, relatief 1,61)", "D(40)"],
  ["162 – 202", "D is klaar (omlooptijd 199, relatief 1,99)", "–"]
])}
<ul>
  <li><strong>Voordelen</strong>: kortere wachttijden dan FCFS; korte processen komen sneller aan de beurt. <strong>Geen starvation</strong>: een proces op plaats N wacht hoogstens (N − 1) × Q.</li>
  <li><strong>Nadelen</strong>: wisselen tussen processen (<strong>context switch</strong>) kost tijd; hoe korter het quantum, hoe meer overhead. Processen die vaak vrijwillig pauzeren (bv. een tekstverwerker die op input wacht) moeten telkens achteraan aanschuiven en voelen traag aan.</li>
</ul>
<p>In de praktijk worden deze algoritmes gecombineerd en krijgen processen ook prioriteiten.</p>
${note("Werkwijze voor een scheduling-oefening: teken een tijdlijn, hou de wachtrij bij na elke stap en reken pas daarna omlooptijd (einde − aankomst) en relatieve omlooptijd (omlooptijd ÷ uitvoertijd) uit.", "exam")}

<h2>System calls en interrupts</h2>
<p>Het besturingssysteem staat tussen de processen en de hardware. Een proces spreekt de hardware niet rechtstreeks aan, omdat:</p>
<ul>
  <li>programma's zo eenvoudiger zijn (ze hoeven de details van de hardware niet te kennen);</li>
  <li>het besturingssysteem kan controleren wat programma's doen, bv. rechten op bestanden afdwingen.</li>
</ul>
<h3>System calls (proces → besturingssysteem)</h3>
<p>Heeft een proces iets nodig van de hardware, dan vraagt het dat via een <strong>system call</strong>. Het lijkt op een functieoproep, maar het proces geeft de controle door aan het besturingssysteem. Bij ${c`write`} pauzeert het proces, controleert het OS of het proces mag schrijven en stuurt het de hardware aan.</p>
${code`
strace ls          toont alle system calls van ls (openat, read, write, close, …)
man 2 write        manpage van een system call (sectie 2)
`}
<h3>Interrupts (hardware → besturingssysteem)</h3>
<p>Gebeurt er iets, bv. een netwerkpakket komt toe, dan stuurt de hardware een <strong>interrupt request</strong> naar de processor:</p>
<ol>
  <li>De processor stopt het proces in uitvoering.</li>
  <li>De gegevens over het proces (instruction pointer, registers, …) worden bewaard in het werkgeheugen.</li>
  <li>De processor laadt de code van het besturingssysteem om de interrupt af te handelen.</li>
  <li>De interrupt wordt afgehandeld.</li>
  <li>De oorspronkelijke code wordt terug ingeladen.</li>
</ol>
<p>Dat wisselen noemt men een <strong>context switch</strong>.</p>
<h3>Snelheidswinst met interrupts</h3>
<p>Zonder interrupts moet de CPU wachten terwijl de schijf leest. Met interrupts kan een ander programma uitvoeren terwijl de schijf leest; de schijf meldt met een interrupt dat de data klaar is. De CPU blijft dus benut.</p>

<h2>Extra: processen beheren en systemd</h2>
${note("Dit staat in de doelstellingen maar niet in de syllabus. Vergelijk met het labo en het materiaal op Toledo.", "warn")}
${code`
ps aux              alle processen met PID, gebruiker, CPU- en geheugengebruik
top                 live overzicht (afsluiten met q)
kill PID            proces vragen om te stoppen
kill -9 PID         proces geforceerd stoppen
CTRL+C              het commando op de voorgrond stoppen
`}
<p>Een service-bestand voor systemd staat in ${c`/etc/systemd/system/naam.service`}:</p>
${code`
[Unit]
Description=Mijn service

[Service]
ExecStart=/usr/bin/mijn-script.sh
Restart=always

[Install]
WantedBy=multi-user.target
`}
${code`
sudo systemctl daemon-reload     servicebestanden opnieuw inlezen
sudo systemctl start naam        starten (stop = stoppen)
sudo systemctl enable naam       automatisch starten bij het opstarten
systemctl status naam            status en foutmeldingen bekijken
`}
`,
      quiz: [
        { q: "Wat is een proces?", o: ["Een programma in uitvoering", "Een bestand op de harde schijf", "Een onderdeel van de processor", "Een system call"], a: 0, e: "Zodra je een programma start, wordt het een proces." },
        { q: "Wat houdt de program counter bij?", o: ["Waar het proces zich op dat moment in de code bevindt", "Hoeveel processen er draaien", "Hoeveel geheugen het proces gebruikt", "De aankomsttijd van het proces"], a: 0, e: "Het OS bewaart dit samen met o.a. de open bestanden, het geheugen en de status." },
        { q: "Wat vind je in de map /proc?", o: ["Virtuele bestanden met de info die de kernel over processen heeft", "De uitvoerbare bestanden van alle programma's", "De logbestanden van processen", "De home directories van gebruikers"], a: 0, e: "Elke genummerde map hoort bij een proces; het nummer is de process id." },
        { q: "Wat is een preëmptief scheduling-algoritme?", o: ["Een algoritme dat een draaiend proces kan onderbreken", "Een algoritme dat processen nooit onderbreekt", "Een algoritme dat altijd het kortste proces kiest", "Een algoritme zonder wachtrij"], a: 0, e: "Round Robin is preëmptief; FCFS niet." },
        { q: "FCFS. A (aankomst 0, uitvoertijd 4), B (aankomst 1, uitvoertijd 3), C (aankomst 2, uitvoertijd 1). Wat is de omlooptijd van C?", o: ["6", "1", "5", "8"], a: 0, e: "A: 0–4, B: 4–7, C: 7–8. Omlooptijd C = 8 − 2 = 6." },
        { q: "Zelfde processen met FCFS: A (0, 4), B (1, 3), C (2, 1). Wat is de relatieve omlooptijd van C?", o: ["6", "1", "0,17", "3"], a: 0, e: "Omlooptijd 6 ÷ uitvoertijd 1 = 6." },
        { q: "SJF. A (aankomst 0, uitvoertijd 4), B (aankomst 1, uitvoertijd 3), C (aankomst 2, uitvoertijd 1). In welke volgorde voeren de processen uit?", o: ["A, C, B", "C, B, A", "A, B, C", "C, A, B"], a: 0, e: "Op tijdstip 0 is enkel A er. Wanneer A klaar is (tijdstip 4), wachten B en C; C is het kortst." },
        { q: "SJF met A (0, 4), B (1, 3), C (2, 1). Wat is de omlooptijd van B?", o: ["7", "3", "6", "8"], a: 0, e: "A: 0–4, C: 4–5, B: 5–8. Omlooptijd B = 8 − 1 = 7." },
        { q: "Round Robin met tijdsquantum 3. A (aankomst 0, uitvoertijd 4), B (aankomst 1, uitvoertijd 3), C (aankomst 2, uitvoertijd 1). Wanneer is A klaar?", o: ["Op tijdstip 8", "Op tijdstip 4", "Op tijdstip 7", "Op tijdstip 6"], a: 0, e: "A: 0–3 (nog 1 over), wachtrij B, C, A. B: 3–6, C: 6–7, A: 7–8." },
        { q: "Zelfde Round Robin (quantum 3): A (0, 4), B (1, 3), C (2, 1). Wat is de omlooptijd van C?", o: ["5", "1", "7", "6"], a: 0, e: "C eindigt op tijdstip 7 en kwam aan op 2: 7 − 2 = 5." },
        { q: "Bij welk algoritme kan starvation optreden?", o: ["Shortest Job First", "Round Robin", "First Come, First Serve", "Bij geen van de drie"], a: 0, e: "Een lang proces kan bij SJF steeds uitgesteld worden door kortere processen. Aging gaat dit tegen." },
        { q: "Wat is aging?", o: ["De scheduler houdt rekening met hoe lang een proces al wacht", "Oude processen worden automatisch gestopt", "Het tijdsquantum wordt elke ronde korter", "Processen worden gesorteerd op aankomsttijd"], a: 0, e: "Zo komt ook een lang proces uiteindelijk aan de beurt." },
        { q: "Wat is het nadeel van een zeer kort tijdsquantum bij Round Robin?", o: ["De overhead van context switches weegt zwaarder door", "Er treedt starvation op", "Korte processen moeten langer wachten", "Het algoritme wordt niet-preëmptief"], a: 0, e: "Bij elke wissel moet het OS procesinformatie wegschrijven en inladen." },
        { q: "Voor welk soort processen is FCFS goed geschikt?", o: ["Batch-processen met lange CPU bursts", "Interactieve programma's zoals een tekstverwerker", "Processen die vaak op input wachten", "Zeer korte processen die laat aankomen"], a: 0, e: "Bv. een video exporteren. Korte processen die later aankomen wachten bij FCFS net lang." },
        { q: "Wat is een system call?", o: ["Een verzoek van een proces aan het besturingssysteem, bv. om naar een bestand te schrijven", "Een signaal van de hardware aan het besturingssysteem", "Een commando om een proces te stoppen", "Een fout in een programma"], a: 0, e: "Enkel het besturingssysteem heeft rechtstreeks toegang tot de hardware." },
        { q: "Met welk commando zie je welke system calls `ls` uitvoert?", o: ["strace ls", "man ls", "which ls", "ps ls"], a: 0, e: "Je ziet o.a. openat, read, write en close. De manpages van system calls staan in sectie 2." },
        { q: "Wat is een interrupt?", o: ["Een signaal waarmee hardware het besturingssysteem laat weten dat er iets afgehandeld moet worden", "Een verzoek van een proces om een bestand te lezen", "Een fout waardoor de computer crasht", "Een onderbreking van de stroomtoevoer"], a: 0, e: "Bv. de netwerkkaart meldt dat er een pakket is toegekomen." },
        { q: "Waarom leveren interrupts snelheidswinst op bij het lezen van een schijf?", o: ["De CPU kan een ander proces uitvoeren terwijl de schijf leest", "De schijf draait sneller", "Er zijn geen context switches meer nodig", "Het proces mag rechtstreeks de schijf aanspreken"], a: 0, e: "Zonder interrupts moet de CPU wachten tot de leesoperatie klaar is." },
        { q: "Hoe heet het wisselen tussen het proces in uitvoering en een ander proces of het besturingssysteem?", o: ["Context switch", "Starvation", "Tijdsquantum", "System call"], a: 0, e: "De gegevens van het proces worden bewaard zodat het later kan hervatten." }
      ]
    },

    // ------------------------------------------------------------------ M7
    {
      id: "m7",
      title: "M7 · Opslag",
      summary: "Harde schijven, RAID, SSD's, GPT, FAT en ext4.",
      goals: [
        "De onderdelen van een harde schijf aanwijzen en hun functie uitleggen.",
        "Basisbegrippen uitleggen: cylinder, head, sector, LBA, bruto/netto capaciteit, seek, search, blocks.",
        "Pariteitsbits berekenen met XOR.",
        "Voor RAID-levels bepalen: minimum aantal disks, capaciteit en hoeveel disks mogen falen.",
        "Uitleggen wat de functie is van de partitietabel en partities; een GPT-tabel inspecteren.",
        "Uitleggen hoe FAT32 en ext4 werken en verschillen.",
        "Berekenen hoeveel blokken nodig zijn om een bestand op te slaan."
      ],
      theory: `
<h2>Harde schijf: de hardware</h2>
<p>Een harde schijf (HDD) slaat data op via magnetisme. De eerste commerciële schijf was de IBM 350 (1956): 3,75 MB. De capaciteit steeg enorm, maar de basiscomponenten bleven dezelfde.</p>
${table(["Onderdeel", "Functie"], [
  ["Magneetschijven (platters)", "Schijven van aluminium of glas met aan beide kanten een dunne magnetische laag die de data bevat (0 of 1 volgens de magnetisatie)"],
  ["Filter", "Vangt stofdeeltjes op; stof is nefast door de hoge dichtheid van de data"],
  ["Arm", "Plaatst de lees- en schrijfkop op de juiste plaats (zoals de arm van een platenspeler)"],
  ["Lees- en schrijfkop", "Detecteert magnetisatie (lezen) of verandert ze (schrijven). Eén kop per laag"],
  ["Magneet", "Beweegt de arm. Twee stuks: één naar binnen, één naar buiten"],
  ["Draaimotor", "Laat de schijven draaien aan typisch 5400 of 7200 toeren per minuut (RPM)"]
])}
<p>Aantal koppen = 2 × aantal magneetschijven. Een schijf met 3 magneetschijven heeft 6 koppen.</p>

<h2>Harde schijf: logische indeling</h2>
<ul>
  <li><strong>Spoor (track)</strong>: een concentrische cirkel op een magneetschijf.</li>
  <li><strong>Sector</strong>: een deel van de schijf begrensd door twee stralen. Vaste grootte: 512 bytes, of sinds 2010 4096 bytes.</li>
  <li><strong>Cilinder</strong>: alle sporen recht onder elkaar op de verschillende magneetschijven.</li>
</ul>
<h3>Opbouw van een sector</h3>
<ol>
  <li><strong>Gap</strong>: scheidt de sectoren.</li>
  <li><strong>Sync</strong>: zorgt voor de uitlijning.</li>
  <li><strong>Address mark</strong>: bevat het sectornummer.</li>
  <li><strong>Data</strong>.</li>
  <li><strong>ECC</strong> (Error Correcting Code): extra bytes om data te recupereren bij corruptie.</li>
</ol>
<h3>Sectornummer: CHS en LBA</h3>
<ul>
  <li>Vroeger: <strong>CHS</strong> (Cylinder, Head, Sector).</li>
  <li>Nu: <strong>LBA</strong> (Logical Block Addressing): elke sector krijgt een uniek nummer, te beginnen bij <strong>0</strong>.</li>
  <li>Met 22-bit adressen: 2²² × 512 bytes = 2 GiB. Met 48-bit adressen: 2⁴⁸ × 512 bytes = 128 PiB.</li>
</ul>
<h3>Capaciteit</h3>
<ul>
  <li><strong>Netto</strong>: het aantal bytes dat voor data gebruikt kan worden.</li>
  <li><strong>Bruto</strong>: netto + hoofdingen, controlebits en gaps.</li>
</ul>
<h3>Zone bit recording</h3>
<p>De buitenste sporen zijn langer dan de binnenste. Door op de buitenste sporen <strong>meer sectoren</strong> te zetten, past er meer data op de schijf en is de dichtheid gelijkmatiger.</p>

<h2>Schijfbesturingseenheid (SBE, controller)</h2>
<ul>
  <li><strong>Seek</strong>: de arm bewegen tot de kop boven het juiste spoor staat.</li>
  <li><strong>Search</strong>: de hoofdingen van de sectoren lezen tot de juiste sector passeert.</li>
  <li><strong>Schrijven</strong>: gegevens van de CPU in een buffer zetten en elektrische informatie (0 V / 5 V) omzetten in magnetische (noord / zuid). <strong>Lezen</strong> is het omgekeerde.</li>
  <li><strong>Pariteitsbits</strong>: berekenen bij schrijven, controleren bij lezen (en eventueel opnieuw lezen).</li>
  <li><strong>Native Command Queuing (NCQ)</strong>: opdrachten in een andere volgorde uitvoeren dan gevraagd om seek- en searchtijd te beperken.</li>
</ul>
${table(["Standaard", "Kenmerk"], [
  ["ATA (IDE, EIDE)", "Oud, brede grijze lintkabels; niet meer gebruikt"],
  ["SCSI", "Duurder, vooral voor servers; nu Serial Attached SCSI (SAS)"],
  ["SATA", "Meest gebruikt in desktops en laptops; seriële ATA met 2 draden voor data en 2 voor besturing"],
  ["NVMe (M.2)", "Voor SSD's; zeer snel en klein. Een M.2-aansluiting kan ook in tragere SATA-modus werken"]
])}

<h2>Cache</h2>
<p>HDD's zijn traag door seek time en search time. Een snel stukje geheugen in de schijf (cache) houdt de meest gelezen en recentst geschreven data bij. Het werkt volgens het <strong>principe van lokaliteit</strong>: bytes die de CPU nodig heeft liggen meestal bij elkaar. Lees je één sector, dan wordt de volgende ook al in de cache geladen.</p>

<h2>RAID</h2>
<p><strong>Redundant Array of Independent Disks</strong>: data over meerdere schijven verdelen voor betrouwbaarheid en/of snelheid. Bij hardware-RAID ziet de CPU enkel de <strong>RAID-controller</strong>, niet de afzonderlijke schijven.</p>
${table(["Level", "Naam", "Min. schijven", "Mogen falen", "Bruikbare capaciteit (N schijven)", "Kenmerk"], [
  ["0", "Striping", "2", "0", "N schijven", "Sneller lezen en schrijven, geen redundantie. Eén defecte schijf = dataverlies"],
  ["1", "Mirroring", "2", "N − 1", "1 schijf", "Elke schijf is een exacte kopie. Sneller lezen, niet sneller schrijven"],
  ["5", "Gedistribueerde pariteit", "3", "1", "N − 1 schijven", "Eén pariteitsblok per N − 1 datablokken. Sneller lezen en schrijven"],
  ["6", "Dubbele pariteit", "4", "2", "N − 2 schijven", "Twee pariteitsblokken; robuuster maar minder capaciteit"]
])}
<p>RAID 2, 3 en 4 zijn voorlopers van RAID 5 en worden niet meer gebruikt.</p>
<h3>Pariteit met XOR</h3>
${code`
0 XOR 0 = 0     0 XOR 1 = 1     1 XOR 0 = 1     1 XOR 1 = 0

    00101001   (byte 1)
    10010101   (byte 2)
    00101011   (byte 3)
XOR --------
    10010111   (pariteitsbyte)
`}
<p>Per kolom: een oneven aantal enen geeft 1, een even aantal geeft 0. Gaat één blok verloren, dan krijg je het terug door de overige blokken en het pariteitsblok te XOR'en.</p>
<h3>RAID-levels combineren</h3>
<p>Lees de cijfers van links naar rechts: het <strong>eerste cijfer is het onderste niveau</strong>. RAID 10 = RAID 1 onderaan (mirrors), daarboven RAID 0 (striping). RAID 01 = RAID 0 onderaan, daarboven RAID 1.</p>
<ul>
  <li><strong>Minimum aantal schijven</strong>: vermenigvuldig de minima. RAID 156 = 2 × 3 × 4 = 24. RAID 550 = 3 × 3 × 2 = 18.</li>
  <li><strong>RAID 51 met minimum schijven (6)</strong>: twee gespiegelde RAID 5-arrays van 3 schijven. Eén array mag volledig wegvallen (3) en in de andere nog 1 schijf: maximaal <strong>4</strong> schijven.</li>
  <li><strong>Capaciteit RAID 550 met schijven van 4 TB</strong>: onderste RAID 5 benut 2 van de 3 schijven, de middelste RAID 5 benut 2 van de 3 arrays, RAID 0 benut alles: 2 × 2 × 2 × 4 TB = <strong>32 TB</strong>.</li>
</ul>

<h2>SSD's</h2>
<p>Volledig elektronisch, geen bewegende onderdelen, met een gelijkaardige schijfbesturingseenheid.</p>
${table(["Voordelen", "Nadelen"], [
  ["Hoge IOPS: veel hogere lees- en schrijfsnelheden", "Kan trager worden naarmate ze meer gebruikt wordt"],
  ["Duurzaam: geen last van schokken, geen mechanische slijtage", "Eindig aantal schrijfbeurten, uitgedrukt in Terabytes Written (TBW)"],
  ["Lager energieverbruik", "Duurder per capaciteit dan een harde schijf"],
  ["Lagere toegangstijd: geen seek of search", ""]
])}

<h2>Partities en GPT</h2>
<p>Met partities deel je één schijf op in meerdere logische schijven, bv. om twee besturingssystemen te installeren (dual boot). De <strong>partitietabel</strong> beschrijft die indeling.</p>
<ul>
  <li><strong>GPT</strong> = GUID Partition Table, het meest gebruikte systeem.</li>
  <li>Elke partitie krijgt een <strong>GUID/UUID</strong>: een uniek label van <strong>128 bits</strong>. Het staat los van de fysieke eigenschappen, dus het OS vindt de partitie ook terug als de schijf op een andere SATA-poort zit.</li>
  <li><strong>LBA 1</strong> (de tweede sector) bevat de <strong>GPT header</strong>. <strong>LBA 2 t.e.m. 33</strong> bevatten <strong>128 entries</strong>, één per partitie.</li>
  <li>Op het einde van de schijf staan header en entries nog eens, als back-up.</li>
</ul>
${table(["GPT header bevat", "GPT entry bevat"], [
  ["Signature: altijd \"EFI PART\"", "Partition type GUID (welk soort partitie)"],
  ["Current LBA (plaats van de tabel)", "De GUID van de partitie"],
  ["Backup LBA (plaats van de kopie)", "Eerste en laatste LBA van de partitie"],
  ["Aantal entries en grootte van één entry", "Attributen en een zelfgekozen naam"]
])}
<h3>Uit labo 2 (dual boot)</h3>
${code`
lsblk              schijven en partities tonen (lsblk --fs toont ook de filesystems)
df                 vrije ruimte per filesystem (df -i toont gebruikte en vrije inodes)
`}
<ul>
  <li><strong>GRUB</strong> is een <strong>boot loader</strong>: hij laadt het besturingssysteem in en toont bij dual boot een keuzemenu.</li>
  <li>Een partitie moet <strong>gemount</strong> zijn voor je aan de bestanden kan.</li>
  <li>Fedora gebruikt ${c`dnf`} in plaats van apt en <strong>btrfs</strong> naast ext4. De EFI System-partitie is FAT.</li>
</ul>
${note("GPT inspecteren met <code>dd</code> en <code>hexyl</code> staat in de doelstellingen maar niet in de syllabus. Het idee: <code>sudo dd if=/dev/sda bs=512 skip=1 count=1 | hexyl</code> leest de sector op LBA 1 en toont hem als hexdump; die begint met \"EFI PART\". Vergelijk met het materiaal op Toledo.", "warn")}

<h2>Bestandssystemen</h2>
<p>Het bestandssysteem (filesystem) zorgt voor de logische ordening in bestanden en mappen.</p>
<h3>Blokken</h3>
<p>Het filesystem groepeert sectoren in <strong>blokken</strong>; voor het besturingssysteem is het blok de kleinst adresseerbare eenheid. Een block size van 4096 bytes = 8 sectoren van 512 bytes. <strong>Elk bestand gebruikt minstens één blok.</strong></p>
${note("Sectorgrootte 4096 bytes, blokken van 16 KiB, bestand van 3345 bytes: het bestand gebruikt 1 blok = 16 KiB ÷ 4 KiB = <strong>4 sectoren</strong>.", "exam")}
<h3>Metadata</h3>
<p>Naast de data houdt het filesystem per bestand ook bij: bestandsnaam, aantal blokken en verwijzingen ernaar, timestamps, grootte, rechten, …</p>
<p>Windows: NTFS en het oudere FAT. Linux: ext4.</p>

<h3>FAT</h3>
<ul>
  <li>FAT = <strong>File Allocation Table</strong>. USB-sticks en SD-kaartjes gebruiken nog exFAT.</li>
  <li>De schijf heeft een <strong>FAT Region</strong> (de tabel) en een <strong>Data Region</strong> (de data).</li>
  <li>De tabel heeft <strong>één entry per blok</strong> (32 bits bij FAT32). Die zegt of het blok in gebruik is en <strong>waar het volgende blok van het bestand staat</strong>, of dat dit het laatste blok is. Zo worden de blokken aan elkaar geregen.</li>
  <li>De <strong>Directory Table</strong> (een speciaal bestand) bevat per bestand de naam, de extensie en het <strong>eerste blok</strong>.</li>
</ul>

<h3>Ext (ext4)</h3>
${table(["Soort blok", "Functie"], [
  ["Bootblok", "Eerste blok; bevat code die het OS laadt en opstart"],
  ["Superblok", "Globale gegevens en instellingen van het filesystem, plus de lijsten van lege inodes en lege datablokken"],
  ["Inode blokken", "Eén inode per bestand: metadata en verwijzingen naar de datablokken"],
  ["Datablokken", "De eigenlijke data"]
])}
<ul>
  <li>De <strong>bestandsnaam staat niet in de inode</strong> maar in de directory. Een directory is een speciaal bestand met een lijst van namen en verwijzingen naar inodes.</li>
  <li>Het aantal inodes ligt vast bij het aanmaken van het filesystem en bepaalt het maximum aantal bestanden.</li>
  <li>Een inode heeft <strong>15 adressen</strong>: 12 directe, 1 indirect, 1 dubbel indirect en 1 drievoudig indirect.</li>
  <li>Een <strong>indirect adres</strong> wijst naar een extra datablok dat de adressen van de volgende datablokken bevat.</li>
  <li>Maximale bestandsgrootte bij ext4 met blokken van 4096 bytes: 16 TiB.</li>
</ul>
${note("Examenvraag: een bestand van 54 KB, block size 4 KiB. 54 ÷ 4 = 13,5 → 14 datablokken voor de data. 12 zijn direct adresseerbaar; voor de laatste 2 is één indirect blok nodig. Totaal: <strong>15 datablokken</strong>. Het inodeblok tel je niet mee.", "exam")}
<h3>Lege blokken vinden</h3>
<p>Het superblok bevat een lijst van 100 lege inode blokken en een lijst van lege datablokken. Bij verwijderen komen de adressen terug in die lijsten. Zijn de lijsten leeg, dan scant de kernel het filesystem om ze aan te vullen.</p>

<h3>FAT en ext4 vergeleken</h3>
${table(["", "FAT32", "ext4"], [
  ["Waar staan de blokken van een bestand?", "In de File Allocation Table: een ketting van blok naar volgend blok", "In de inode: directe en indirecte adressen"],
  ["Waar staat de bestandsnaam?", "In de Directory Table, samen met extensie en eerste blok", "In de directory entry, met een verwijzing naar de inode"],
  ["Waar staat de metadata?", "In de Directory Table", "In de inode"],
  ["Typisch gebruik", "USB-sticks, SD-kaartjes (exFAT), EFI-partitie", "Linux"]
])}
`,
      quiz: [
        { q: "Welk onderdeel van een harde schijf bevat de eigenlijke data?", o: ["De magnetische laag op de magneetschijven", "De arm", "De filter", "De draaimotor"], a: 0, e: "Beide kanten van elke magneetschijf hebben een dunne magnetische laag." },
        { q: "Hoeveel lees- en schrijfkoppen heeft een harde schijf met 3 magneetschijven?", o: ["6", "3", "2", "9"], a: 0, e: "Eén kop per laag en twee lagen per schijf: 2 × 3 = 6." },
        { q: "Wat is de functie van de filter in een harde schijf?", o: ["Stofdeeltjes opvangen en vasthouden", "De magneetschijven koelen", "Fouten in de data corrigeren", "De arm laten bewegen"], a: 0, e: "Door de hoge dichtheid van de data is stof nefast." },
        { q: "Wat is een cilinder?", o: ["De verzameling van alle sporen onder elkaar op de verschillende magneetschijven", "Een concentrische cirkel op één magneetschijf", "Een deel van de schijf tussen twee stralen", "De as waarrond de schijven draaien"], a: 0, e: "Een concentrische cirkel is een spoor; het deel tussen twee stralen is een sector." },
        { q: "Welk deel van een sector dient om data te recupereren als de sector beschadigd is?", o: ["ECC", "Gap", "Sync", "Address mark"], a: 0, e: "ECC = Error Correcting Code. De address mark bevat het sectornummer." },
        { q: "Wat doet Logical Block Addressing (LBA)?", o: ["Elke sector een uniek nummer geven, te beginnen bij 0", "Sectoren adresseren met cylinder, head en sector", "Blokken groeperen in bestanden", "De schijf opdelen in partities"], a: 0, e: "CHS is het oudere systeem." },
        { q: "Wat is het verschil tussen netto- en bruto-capaciteit?", o: ["Bruto is netto plus hoofdingen, controlebits en gaps", "Netto is bruto plus de cache", "Bruto telt enkel de data", "Er is geen verschil"], a: 0, e: "Netto is het aantal bytes dat voor data gebruikt kan worden." },
        { q: "Wat is zone bit recording?", o: ["Meer sectoren plaatsen op de langere buitenste sporen", "Data in een andere volgorde lezen om tijd te winnen", "Pariteitsbits toevoegen aan elke sector", "Veelgebruikte data in de cache bewaren"], a: 0, e: "Zo past er meer data op de schijf en is de dichtheid van de bits gelijkmatiger." },
        { q: "Wat is het verschil tussen seek en search?", o: ["Seek = de arm naar het juiste spoor bewegen; search = wachten tot de juiste sector passeert", "Seek = de juiste sector zoeken; search = het juiste spoor zoeken", "Seek is lezen, search is schrijven", "Het zijn synoniemen"], a: 0, e: "Beide samen maken een harde schijf relatief traag." },
        { q: "Wat doet Native Command Queuing?", o: ["Opdrachten in een andere volgorde uitvoeren om wachttijden te beperken", "Opdrachten dubbel uitvoeren ter controle", "De data versleutelen", "Sectoren groeperen in blokken"], a: 0, e: "De SBE probeert de seek- en searchtijd te minimaliseren." },
        { q: "Welke standaard wordt het meest gebruikt voor harde schijven in gewone desktops en laptops?", o: ["SATA", "SCSI", "IDE", "NVMe"], a: 0, e: "NVMe (M.2) is voor snelle SSD's, SCSI/SAS vooral voor servers." },
        { q: "Op welk principe steunt de cache van een harde schijf?", o: ["Lokaliteit: bytes die de CPU nodig heeft liggen meestal bij elkaar", "Pariteit: elke byte wordt dubbel bewaard", "Striping: data wordt over schijven verdeeld", "Aging: oude data wordt eerst gelezen"], a: 0, e: "Daarom wordt de volgende sector alvast in de cache geladen." },
        { q: "Welke eigenschap heeft RAID 0?", o: ["Sneller lezen en schrijven, maar geen redundantie", "Elke schijf is een exacte kopie", "Eén schijf mag falen", "Twee schijven mogen falen"], a: 0, e: "Bij striping ben je data kwijt zodra één schijf faalt." },
        { q: "Je zet 3 schijven van 1 TB in RAID 1. Wat is de bruikbare capaciteit en hoeveel schijven mogen falen?", o: ["1 TB, 2 schijven", "3 TB, 0 schijven", "2 TB, 1 schijf", "1 TB, 1 schijf"], a: 0, e: "Alle schijven zijn kopieën: capaciteit van één schijf, en N − 1 schijven mogen falen." },
        { q: "Je zet 4 schijven van 2 TB in RAID 5. Wat is de bruikbare capaciteit?", o: ["6 TB", "8 TB", "4 TB", "2 TB"], a: 0, e: "Eén schijf aan capaciteit gaat naar pariteit: (4 − 1) × 2 TB = 6 TB." },
        { q: "Je zet 5 schijven van 4 TB in RAID 6. Wat is de bruikbare capaciteit?", o: ["12 TB", "16 TB", "20 TB", "8 TB"], a: 0, e: "Twee schijven aan capaciteit gaan naar pariteit: (5 − 2) × 4 TB = 12 TB." },
        { q: "Hoeveel schijven heb je minimaal nodig voor RAID 6 en hoeveel mogen er falen?", o: ["4 schijven, 2 mogen falen", "3 schijven, 1 mag falen", "3 schijven, 2 mogen falen", "2 schijven, 1 mag falen"], a: 0, e: "RAID 5: minimaal 3 schijven, 1 mag falen." },
        { q: "Bereken de pariteit: 1100 XOR 1010.", o: ["0110", "1110", "1000", "0111"], a: 0, e: "Per bit: 1⊕1=0, 1⊕0=1, 0⊕1=1, 0⊕0=0." },
        { q: "RAID 5 met blok A = 1100 en pariteitsblok P = 0110. Blok B is verloren. Wat was B?", o: ["1010", "0110", "1110", "0101"], a: 0, e: "B = A XOR P = 1100 XOR 0110 = 1010." },
        { q: "Hoeveel schijven heb je minimaal nodig voor een RAID 10?", o: ["4", "2", "3", "6"], a: 0, e: "RAID 1 (min. 2) × RAID 0 (min. 2) = 4." },
        { q: "Hoeveel schijven kunnen er maximaal verloren gaan in een RAID 51 met het minimum aantal schijven?", o: ["4", "1", "2", "3"], a: 0, e: "Twee gespiegelde RAID 5-arrays van 3 schijven. Eén array volledig (3) plus nog 1 schijf in de andere." },
        { q: "Wat is de capaciteit van een RAID 550 met het minimum aantal schijven van elk 4 TB?", o: ["32 TB", "72 TB", "48 TB", "16 TB"], a: 0, e: "18 schijven. 2 × 2 × 2 × 4 TB = 32 TB." },
        { q: "Welke is een nadeel van een SSD?", o: ["Een eindig aantal schrijfbeurten (TBW)", "Gevoelig voor schokken", "Hoge seek time", "Hoger energieverbruik dan een HDD"], a: 0, e: "TBW = Terabytes Written. In de praktijk wordt die limiet zelden bereikt." },
        { q: "Op welke plaats staat de GPT header en waarmee begint hij?", o: ["Op LBA 1, met de signature \"EFI PART\"", "Op LBA 0, met de signature \"GPT\"", "Op LBA 2, met de GUID van de schijf", "Op LBA 33, met de backup"], a: 0, e: "LBA 2 t.e.m. 33 bevatten de 128 entries." },
        { q: "Hoeveel bits telt een GUID van een partitie?", o: ["128", "32", "48", "64"], a: 0, e: "Het label staat los van de fysieke eigenschappen van de partitie." },
        { q: "Sectorgrootte 4096 bytes, blokken van 16 KiB. Hoeveel sectoren gebruikt een bestand van 3345 bytes?", o: ["4", "1", "8", "16"], a: 0, e: "Elk bestand gebruikt minstens één blok. Eén blok = 16 KiB ÷ 4 KiB = 4 sectoren." },
        { q: "Wat staat er in een entry van de File Allocation Table?", o: ["Of het blok in gebruik is en waar het volgende blok van het bestand staat", "De naam en de extensie van het bestand", "De rechten van het bestand", "De GUID van de partitie"], a: 0, e: "Naam, extensie en eerste blok staan in de Directory Table." },
        { q: "Waar wordt de bestandsnaam bewaard in een ext4-bestandssysteem?", o: ["In de directory entry", "In de inode", "In het superblok", "In het bootblok"], a: 0, e: "De inode bevat de metadata en de adressen van de datablokken, maar niet de naam." },
        { q: "Hoeveel adressen bevat een inode en hoe zijn ze verdeeld?", o: ["15: 12 directe, 1 indirect, 1 dubbel indirect, 1 drievoudig indirect", "12: allemaal direct", "15: 10 directe en 5 indirecte", "16: 12 directe en 4 indirecte"], a: 0, e: "Een indirect adres wijst naar een datablok met adressen van volgende datablokken." },
        { q: "Ext4 met block size 4 KiB. Hoeveel datablokken zijn er nodig voor een bestand van 54 KB?", o: ["15", "14", "13", "16"], a: 0, e: "54 ÷ 4 = 13,5 → 14 blokken data. 12 direct, 2 via één indirect blok dat zelf ook een datablok is: 15." },
        { q: "Ext4 met block size 4 KiB. Hoeveel datablokken zijn er nodig voor een bestand van 40 KiB?", o: ["10", "11", "12", "40"], a: 0, e: "40 ÷ 4 = 10 blokken. Dat past binnen de 12 directe adressen, dus er is geen indirect blok nodig." },
        { q: "Ext4 met block size 4 KiB. Hoeveel datablokken zijn er nodig voor een bestand van 100 KiB?", o: ["26", "25", "27", "13"], a: 0, e: "100 ÷ 4 = 25 blokken data. 12 direct en 13 via één indirect blok: 25 + 1 = 26." },
        { q: "Welk blok in ext bevat de lijsten van lege inodes en lege datablokken?", o: ["Het superblok", "Het bootblok", "Het inode blok", "De directory"], a: 0, e: "Het bootblok bevat code om het OS te laden." },
        { q: "Wat is GRUB?", o: ["Een boot loader die het besturingssysteem inlaadt", "Een package manager", "Een bestandssysteem", "Een hypervisor"], a: 0, e: "Bij dual boot toont GRUB een menu om het besturingssysteem te kiezen." }
      ]
    }
  ]
});
