# Studiesite Toegepaste Informatica – semester 1

Een statische website met theorie en interactieve oefenvragen per vak en per module.

| Vak | Status |
|---|---|
| Computer Systems | 7 modules, theorie + quiz |
| Programming Foundations 1 | 9 modules + examenmodule (Cinema Management), theorie + quiz |
| Front-End Software Development | nog te maken |
| Introduction Project | nog te maken |

## Gebruiken

Open `index.html` in een browser. Er is geen installatie, build of server nodig.

Per module zijn er drie tabbladen:

- **Theorie** – samenvatting van de leerstof met de doelstellingen bovenaan.
- **Quiz** – meerkeuzevragen die meteen nagekeken worden, met uitleg bij elk antwoord. Bovenaan staat een balkje per vraag (groen = juist, rood = fout) en een teller met je reeks juiste antwoorden. Op het einde volgt een scorering.
- **Flashcards** – dezelfde vragen als kaartjes die omdraaien.

Per vak is er ook een **Examenmix**: 15 willekeurige vragen uit alle modules.

Een quiz die je niet afmaakt, loopt gewoon door: ga je tussendoor naar de theorie of sluit je de pagina, dan pik je de volgende keer weer op bij dezelfde vraag. Op de theoriepagina staat dan bovenaan een melding met een link terug. Met **Andere vragen kiezen** (onder de eerste vraag) begin je in de plaats aan een nieuwe reeks.

### Sneltoetsen

| Toets | In de quiz | Bij de flashcards |
|---|---|---|
| `1` – `4` | antwoord kiezen | – |
| `Enter` | volgende vraag | – |
| `spatie` | – | kaart draaien |
| `←` `→` | – | vorige of volgende kaart |

Animaties (ook het draaien van een kist) worden automatisch uitgeschakeld als je besturingssysteem op "beperk beweging" staat.

De voortgang (welke vragen je juist of fout had) wordt bewaard in de browser via `localStorage`. Kom je later terug naar een quiz, dan kan je kiezen: enkel de foute vragen opnieuw, verdergaan met alles wat nog niet juist is, alle vragen, of het hoofdstuk opnieuw beginnen (wist de voortgang van dat hoofdstuk).

## Punten, badges, shop en kamer

- **Punten**: een vraag voor het eerst juist levert 5 punten op. Per 3 juiste antwoorden op rij stijgt de combo (×1,5, ×2, ×2,5, tot ×3). Een fout antwoord geeft niets en zet de combo terug op nul. Een vraag die je al juist had, levert 1 punt op. In een ronde "Foute vragen opnieuw" krijg je 5 punten per rechtgezette vraag, zonder combo.
- **Badges** (eigen pagina): 27 badges in vier zeldzaamheden (25, 75, 200 en 600 punten), waarvan enkele verborgen. Je krijgt de punten pas als je op een behaalde badge klikt.
- **Shop**: thema's voor de site, kisten met een item voor je kamer, en echte beloningen aan een vaste prijs. Het lijstje beloningen pas je zelf aan op de shoppagina.
- **Je kamer**: zet gewonnen spullen neer op acht plekken. Elk item geeft een bonus op de punten die je met vragen verdient (1, 3, 6 of 12 procent, volgens zeldzaamheid).

Alle prijzen, kansen, punten en badges staan in `data/spel.js` en kan je daar aanpassen. De logica en de pagina's staan in `js/game.js`.

## Op je gsm

De site past zich aan een klein scherm aan: een menubalk onderaan (Vakken, Badges, Shop, Kamer), grote antwoordknoppen, en in je kamer blijft de tekening bovenaan staan terwijl je per plek door je spullen veegt.

- Zet de site eerst online (zie hieronder) en open het adres op je gsm.
- Via het menu van je browser kan je de site **op je startscherm zetten**. Ze opent dan zonder adresbalk, zoals een app.
- Voortgang staat per toestel in de browser. Onderaan de overzichtspagina staat **Verder op een ander toestel**: kopieer daar een code op het ene toestel en plak ze op het andere.

## Online zetten met GitHub Pages

1. Maak een repository aan op GitHub en push deze map.
2. Ga naar **Settings → Pages**.
3. Kies bij **Source** voor *Deploy from a branch*, branch `main`, map `/ (root)`.
4. Na een minuut staat de site op `https://<gebruikersnaam>.github.io/<repository>/`.

## Structuur

```
index.html              de pagina
manifest.webmanifest    naam en icoon voor het startscherm van je gsm
icon.svg                het icoon
css/style.css           opmaak (licht en donker thema)
js/helpers.js           hulpfuncties om theorie te schrijven (code, tabellen, kaders)
js/app.js               navigatie, quiz en flashcards
js/game.js              punten, badges, shop, kisten en kamer
data/spel.js            spelgegevens: items, thema's, kisten, badges, puntenregels
data/computer-systems.js
data/programming-1.js
data/overige-vakken.js  vakken die nog gemaakt moeten worden
```

## Een vak of module toevoegen

Elk vak is één `COURSES.push({...})` in een bestand onder `data/`. Een module ziet er zo uit:

```js
{
  id: "m1",
  title: "M1 · Titel",
  summary: "Korte omschrijving voor het overzicht.",
  goals: ["Wat je moet kunnen."],
  theory: `
<h2>Titel</h2>
<p>Uitleg, met ${c`inline code`}.</p>
${code`
een codeblok
`}
`,
  quiz: [
    { q: "De vraag?", o: ["juist antwoord", "fout", "fout", "fout"], a: 0, e: "Uitleg." }
  ]
}
```

- `a` is de index van het juiste antwoord in `o`. De volgorde van de antwoorden wordt bij het tonen door elkaar gehaald.
- Een vraag kan een codeblok krijgen met `code: "regel 1\nregel 2"`.
- Tekst tussen backticks in een vraag wordt als code getoond.
- Een nieuw databestand voeg je toe met een extra `<script>`-regel in `index.html`, vóór `js/app.js`.

## Bron

De inhoud is een eigen samenvatting op basis van het cursusmateriaal van UCLL (Toegepaste Informatica, afstandsonderwijs, 2026–27) en is bedoeld als persoonlijk studiemateriaal. Controleer bij twijfel altijd de officiële cursus.
