// Programming Foundations 1 (MBI02) – theorie en quizvragen per module.
// Gebaseerd op de cursusnotebooks M0–M8 en de examenopdracht. Eigen samenvatting.

COURSES.push({
  id: "pf1",
  title: "Programming Foundations 1",
  code: "MBI02 · 6 SP",
  status: "ready",
  intro: "Python van nul: syntax, control flow, lists, functies, bestanden, classes, collecties en public/private. Met een aparte module voor de examenopdracht.",
  modules: [

    // ------------------------------------------------------------------ M0
    {
      id: "m0",
      title: "M0 · Intro",
      summary: "Wat programmeren is en hoe het cursusmateriaal werkt.",
      goals: [
        "Uitleggen wat programmeren is en waarom we een programmeertaal gebruiken.",
        "Een Python-programma uitvoeren in VS Code.",
        "Je code testen: eerst zelf uitvoeren, daarna de testcel draaien."
      ],
      theory: `
<h2>Wat is programmeren?</h2>
<p>Programmeren is precieze instructies schrijven voor een computer. Natuurlijke taal is dubbelzinnig ("haal even yoghurt": welke, hoeveel?). Mensen vullen de gaten zelf in, een computer niet. Een programma wordt heel vaak uitgevoerd, op veel computers, zonder dat de programmeur erbij is. Daarom gebruiken we een <strong>programmeertaal</strong>: die heeft maar één mogelijke interpretatie.</p>
${note("De computer doet wat je schrijft, niet wat je bedoelt. Doet je programma iets vreemds, dan zit de fout bijna altijd in je instructies.")}

<h2>Werkomgeving</h2>
<ul>
  <li>Code schrijf je in <strong>VS Code</strong>; uitvoeren doe je met Run and Debug (F5) en de configuratie <em>Current File (P1 Recommended)</em>.</li>
  <li>De <strong>.venv</strong> is een virtuele omgeving: een aparte doos met precies de packages die de cursus nodig heeft.</li>
  <li>Theorie staat in notebooks (.ipynb); echte programma's schrijf je in een .py-bestand.</li>
</ul>

<h2>Het cursusmateriaal</h2>
${table(["Onderdeel", "Wat is het?"], [
  ["Theorie-notebooks", "Uitleg met uitvoerbare codecellen"],
  ["concept-exercises", "Kleine oefeningen op één concept"],
  ["milestone-exercises", "Grotere opdrachten die alles van de module combineren"]
])}
<p>Testen gaat in twee stappen: eerst zelf uitvoeren en kijken of het doet wat je wil, pas daarna de testcel draaien (groen = juist, rood = nog een fout).</p>
`,
      quiz: [
        { q: "Waarom gebruiken we een programmeertaal in plaats van gewone taal om een computer instructies te geven?", o: ["Een programmeertaal heeft maar één mogelijke interpretatie", "Gewone taal is te traag voor een computer", "Een computer kan geen letters lezen", "Programmeertalen zijn korter"], a: 0, e: "Natuurlijke taal is dubbelzinnig en de computer raadt niet wat je bedoelde." },
        { q: "Je programma doet iets anders dan je verwacht. Waar zit de fout bijna altijd?", o: ["In de instructies die je schreef", "In Python zelf", "In de processor", "In VS Code"], a: 0, e: "De computer voert exact uit wat er staat." },
        { q: "Wat is een .venv?", o: ["Een virtuele omgeving met de packages die het project nodig heeft", "Een bestand met je oplossingen", "Een soort notebook", "De map met de testen"], a: 0, e: "Zo botsen de packages niet met andere projecten op je computer." },
        { q: "In welke volgorde test je een oefening?", o: ["Eerst zelf uitvoeren, daarna de testcel draaien", "Eerst de testcel draaien, daarna zelf uitvoeren", "Enkel de testcel draaien", "Enkel zelf uitvoeren"], a: 0, e: "Zo zie je eerst zelf wat je programma doet." }
      ]
    },

    // ------------------------------------------------------------------ M1
    {
      id: "m1",
      title: "M1 · Basic syntax",
      summary: "print, input, datatypes, variabelen en if/elif/else.",
      goals: [
        "print() en input() gebruiken.",
        "Waarden opslaan in variabelen met correcte namen.",
        "Het verschil uitleggen tussen str, int, float en bool en ertussen omzetten.",
        "Syntaxfouten herkennen en verbeteren.",
        "Beslissingen schrijven met if, elif en else."
      ],
      theory: `
<h2>print() en strings</h2>
<ul>
  <li>${c`print()`} is een <strong>functie</strong>. Een functie oproepen = naam + haakjes + eventueel een argument.</li>
  <li>Een <strong>string</strong> (str) is tekst tussen ${c`"..."`} of ${c`'...'`}.</li>
  <li><strong>Concatenatie</strong>: strings aan elkaar plakken met ${c`+`}. Er komen geen spaties bij.</li>
  <li>Python voert code regel per regel uit, van boven naar onder.</li>
</ul>
${code`
print("Hello " + "World")    # Hello World
print("Hello" + "World")     # HelloWorld
`}

<h2>Syntax errors</h2>
<p>Een syntax error is code die geen geldig Python is. Python stopt en toont waar het misging. De caret ${c`^`} wijst naar de plek waar de code ongeldig werd; dat is niet altijd de plek van de echte fout.</p>
${code`
print "Hello World"     # haakjes vergeten
prin("Hello World")     # typfout in de functienaam (NameError)
print(Hello World)      # aanhalingstekens vergeten
`}

<h2>input()</h2>
<ul>
  <li>${c`input()`} wacht op tekst van de gebruiker en geeft die terug.</li>
  <li>Het resultaat is <strong>altijd een string</strong>, ook als de gebruiker een getal typt.</li>
  <li>Het argument is de vraag (prompt). In de cursus eindigt elke prompt op ${c`"> "`}.</li>
</ul>
${code`
name = input("What is your name? > ")
print("Hello " + name)
`}

<h2>Comments</h2>
<p>Alles na ${c`#`} wordt genegeerd. Gebruik comments om je code uit te leggen.</p>

<h2>Rekenen en datatypes</h2>
${table(["Operator", "Betekenis", "Voorbeeld", "Resultaat"], [
  [c`+`, "optellen", c`1 + 1`, "2"],
  [c`-`, "aftrekken", c`10 - 3`, "7"],
  [c`*`, "vermenigvuldigen", c`3 * 4`, "12"],
  [c`/`, "delen (altijd een float)", c`10 / 4`, "2.5"]
])}
<p>Volgorde zoals in wiskunde: ${c`3 + 3 * 2`} is 9, ${c`(3 + 3) * 2`} is 12.</p>
${table(["Datatype", "Stelt voor", "Voorbeeld"], [
  ["str", "tekst", c`"Hello"` + ", " + c`'23'`],
  ["int", "geheel getal", c`23` + ", " + c`-5`],
  ["float", "kommagetal", c`2.5` + ", " + c`10.0`],
  ["bool", "waar of onwaar", c`True` + ", " + c`False`]
])}

<h2>Type conversie</h2>
<p>Een int en een str kan je niet optellen: ${c`42 + '23'`} geeft een <strong>TypeError</strong>.</p>
${code`
int("23")        # 23
float("34.3")    # 34.3
str(3)           # "3"
int("tree")      # ValueError

getal = int(input("Enter a number > "))
print("Result: " + str(getal + 5))
`}

<h2>Variabelen</h2>
<p>Een variabele is een label op een waarde.</p>
<ul>
  <li><strong>Toekenning</strong>: ${c`naam = waarde`}. Eerst wordt de rechterkant berekend, daarna krijgt het resultaat het label.</li>
  <li>Eerst toekennen, dan gebruiken; anders een <strong>NameError</strong>.</li>
  <li>${c`y = x`} kopieert de waarde van dat moment. Verandert x later, dan blijft y hetzelfde.</li>
</ul>
${code`
x = 10
y = x
x = 20
print(y)             # 10

count = 0
count = count + 1    # 1
count += 1           # 2   (ook -=, *=, /=)
`}
<p><strong>Regels voor namen</strong>: enkel letters, cijfers en underscores; niet beginnen met een cijfer; geen keyword (if, else, …). <strong>Conventie</strong>: beschrijvend en in snake_case, bv. ${c`user_name`}.</p>

<h2>Booleans en if / else</h2>
${table(["Operator", "Betekenis"], [
  [c`==`, "gelijk aan (niet verwarren met =)"],
  [c`!=`, "niet gelijk aan"],
  [c`<` + " " + c`>`, "kleiner dan, groter dan"],
  [c`<=` + " " + c`>=`, "kleiner of gelijk, groter of gelijk"]
])}
<ul>
  <li>Strings vergelijken is hoofdlettergevoelig: ${c`'a' == 'A'`} is False.</li>
  <li>Strings met ${c`<`} of ${c`>`} vergelijken gebeurt alfabetisch.</li>
</ul>
${code`
guess = input("Guess the animal > ")
if guess == "dolphin":
    print("You guessed correctly!")
else:
    print("Nope, try again!")
`}
<p>Na de voorwaarde en na else komt een dubbelpunt. Het blok eronder springt in (4 spaties), alle regels evenveel.</p>

<h2>elif</h2>
${code`
age = int(input("Enter your age: > "))
if age < 12:
    print("Child ticket: 5 EUR")
elif age < 65:
    print("Adult ticket: 15 EUR")
else:
    print("Senior ticket: 8 EUR")
`}
<ul>
  <li>Python controleert van boven naar onder en stopt bij de <strong>eerste ware voorwaarde</strong>.</li>
  <li>De volgorde telt: zet de meest beperkende voorwaarde eerst (${c`score >= 90`} vóór ${c`score >= 80`}).</li>
  <li>Losse if's na elkaar kunnen allemaal uitgevoerd worden; bij if/elif/else wordt er hoogstens één blok uitgevoerd.</li>
</ul>
`,
      quiz: [
        { q: "Wat toont dit programma?", code: 'print("Hello" + "World")', o: ["HelloWorld", "Hello World", "Hello + World", "Een foutmelding"], a: 0, e: "Concatenatie voegt geen spaties toe." },
        { q: "De gebruiker typt 5. Wat is het datatype van `x`?", code: 'x = input("Number? > ")', o: ["str", "int", "float", "bool"], a: 0, e: "input() geeft altijd een string terug. Zet om met int() als je wil rekenen." },
        { q: "Wat gebeurt er bij `42 + '23'`?", o: ["TypeError", "Het resultaat is 65", "Het resultaat is '4223'", "ValueError"], a: 0, e: "Een int en een str kan je niet optellen. Zet eerst om met int() of str()." },
        { q: "Wat geeft `10 / 4`?", o: ["2.5", "2", "2.0", "3"], a: 0, e: "De operator / geeft altijd een float." },
        { q: "Wat toont dit programma?", code: "x = 10\ny = x\nx = 20\nprint(y)", o: ["10", "20", "30", "Een foutmelding"], a: 0, e: "y kreeg de waarde van x op dat moment. Dat x later verandert, heeft geen invloed op y." },
        { q: "Welke variabelenaam is geldig en volgt de conventie?", o: ["user_name", "2nd_player", "user-name", "if"], a: 0, e: "Geen cijfer vooraan, geen streepje, geen keyword. Conventie: snake_case." },
        { q: "Welke fout geeft `int(\"tree\")`?", o: ["ValueError", "TypeError", "NameError", "SyntaxError"], a: 0, e: "Het type klopt (een string), maar de waarde kan niet omgezet worden." },
        { q: "Wat is het verschil tussen `=` en `==`?", o: ["`=` kent een waarde toe, `==` vergelijkt twee waarden", "`=` vergelijkt, `==` kent toe", "Er is geen verschil", "`==` wordt enkel bij strings gebruikt"], a: 0, e: "In een voorwaarde gebruik je ==." },
        { q: "Wat toont dit programma als score 95 is?", code: 'if score >= 80:\n    print("B")\nelif score >= 90:\n    print("A")\nelse:\n    print("F")', o: ["B", "A", "A en B", "F"], a: 0, e: "Python stopt bij de eerste ware voorwaarde. Zet de meest beperkende voorwaarde eerst." },
        { q: "Wat is het resultaat van `'a' == 'A'`?", o: ["False", "True", "Een TypeError", "None"], a: 0, e: "Vergelijken van strings is hoofdlettergevoelig." }
      ]
    },

    // ------------------------------------------------------------------ M2
    {
      id: "m2",
      title: "M2 · Control flow",
      summary: "and/or/not, while-lussen, applicatie-lus, f-strings en string-methodes.",
      goals: [
        "Voorwaarden combineren met and, or en not.",
        "While-lussen schrijven en oneindige lussen vermijden.",
        "Een applicatie-lus (menu) bouwen.",
        "Truthy en falsy herkennen.",
        "f-strings, indexing, slicing en string-methodes gebruiken."
      ],
      theory: `
<h2>Logische operatoren</h2>
${table(["A", "B", "A and B", "A or B", "not A"], [
  ["True", "True", "True", "True", "False"],
  ["True", "False", "False", "True", "False"],
  ["False", "True", "False", "True", "True"],
  ["False", "False", "False", "False", "True"]
])}
<ul>
  <li>${c`and`}: enkel True als beide True zijn.</li>
  <li>${c`or`}: True als minstens één True is.</li>
  <li>${c`not`}: keert om. ${c`not (age < 18)`} is hetzelfde als ${c`age >= 18`}.</li>
</ul>
${note("<code>if age == 18 or 21:</code> is altijd waar. Python leest dit als <code>(age == 18) or 21</code>, en 21 telt als waar. Schrijf <code>if age == 18 or age == 21:</code>.", "warn")}

<h2>While-lussen</h2>
<p>Een if voert zijn blok één keer uit; een while herhaalt zijn blok zolang de voorwaarde True is.</p>
${code`
counter = 3
while counter > 0:
    print(counter)
    counter -= 1        # zonder deze regel: oneindige lus
print("Lift off!")
`}
<ul>
  <li>Na het volledige blok springt Python terug naar de while-regel en controleert opnieuw.</li>
  <li>Is de voorwaarde meteen False, dan wordt het blok nooit uitgevoerd.</li>
  <li><strong>Oneindige lus</strong>: de variabele in de voorwaarde verandert nooit. Stoppen met de stopknop of CTRL+C.</li>
</ul>

<h2>Debuggen</h2>
<ul>
  <li><strong>Breakpoint</strong>: klik links naast een regelnummer. Daar pauzeert het programma.</li>
  <li>De gele regel is de regel die nog uitgevoerd moet worden.</li>
  <li><strong>Step Into</strong>: één regel uitvoeren. <strong>Continue</strong>: doorlopen tot het volgende breakpoint.</li>
  <li>Het venster <strong>VARIABLES</strong> toont de waarde van elke variabele.</li>
</ul>
<p>Voorspel vóór elke stap wat er gebeurt en vergelijk. Klassieker: ${c`'11' > '8'`} is False, want strings worden alfabetisch vergeleken.</p>

<h2>Applicatie-lus</h2>
${code`
choice = input("(F)ortune, (Q)uit: > ")      # één keer vóór de lus
while choice != "Q":
    if choice == "F":
        print("You will pass the exam.")
    else:
        print("Unknown option. Please enter F or Q.")
    choice = input("(F)ortune, (Q)uit: > ")  # opnieuw vragen op het einde
print("Goodbye")
`}

<h2>Truthy en falsy</h2>
<p>In een voorwaarde zet Python elke waarde om naar een boolean.</p>
${table(["Type", "Falsy", "Truthy"], [
  ["Getallen", "0", "elk ander getal, ook negatief"],
  ["Strings", c`""` + " (lege string)", "elke niet-lege string"]
])}
<p>${c`if name:`} is dus hetzelfde als ${c`if name != "":`}.</p>

<h2>Strings</h2>
${table(["Code", "Resultaat", "Betekenis"], [
  [c`"ab" * 3`, c`"ababab"`, "herhaling"],
  [c`"a" in "abc"`, "True", "bevat (hoofdlettergevoelig)"],
  [c`len("hello")`, "5", "lengte"]
])}
<h3>f-strings</h3>
${code`
name, age, price = "Alice", 30, 3.14159
print(f"Hello {name}, next year you are {age + 1}.")
print(f"Price: {price:.2f}")       # 3.14
print(f"{9:02d}:{5:02d}")          # 09:05
`}
<h3>Indexing en slicing</h3>
<p>Posities beginnen bij 0; negatief telt vanaf het einde. Bij ${c`s[start:stop]`} is stop niet inbegrepen.</p>
${code`
word = "Python"
word[0]      # 'P'
word[-1]     # 'n'
word[0:3]    # 'Pyt'
word[3:]     # 'hon'
word[100]    # IndexError
`}
<h3>Methodes</h3>
${table(["Methode", "Doet"], [
  [c`s.lower()` + " / " + c`s.upper()`, "kopie in kleine letters / hoofdletters"],
  [c`s.strip()`, "kopie zonder witruimte vooraan en achteraan"],
  [c`s.startswith(x)` + " / " + c`s.endswith(x)`, "begint of eindigt s met x?"],
  [c`s.find(x)`, "index waar x in s staat"],
  [c`s.ljust(n)` + " / " + c`s.rjust(n)`, "aanvullen tot lengte n"]
])}
${note("String-methodes veranderen de originele string nooit. Bewaar het resultaat: <code>answer = answer.lower()</code>.", "warn")}
`,
      quiz: [
        { q: "Wat is het resultaat van `True and False`?", o: ["False", "True", "None", "Een foutmelding"], a: 0, e: "and is enkel True als beide kanten True zijn." },
        { q: "Welke voorwaarde controleert correct of `age` gelijk is aan 18 of 21?", o: ["age == 18 or age == 21", "age == 18 or 21", "age == (18 or 21)", "age == 18 and age == 21"], a: 0, e: "`age == 18 or 21` is altijd waar, omdat 21 als waar telt." },
        { q: "Hoeveel keer wordt 'Hi' getoond?", code: 'counter = 3\nwhile counter > 0:\n    print("Hi")\n    counter -= 1', o: ["3 keer", "2 keer", "4 keer", "Oneindig vaak"], a: 0, e: "counter is 3, 2 en 1 wanneer het blok uitvoert. Bij 0 is de voorwaarde False." },
        { q: "Wat gebeurt er als je in een while-lus de variabele uit de voorwaarde nooit aanpast?", o: ["Een oneindige lus", "Een SyntaxError", "De lus voert één keer uit", "Python stopt automatisch na 1000 keer"], a: 0, e: "De voorwaarde blijft True. Stop met CTRL+C." },
        { q: "Wat is het resultaat van `'11' > '8'`?", o: ["False", "True", "Een TypeError", "3"], a: 0, e: "Strings worden alfabetisch vergeleken: '1' komt vóór '8'. Zet eerst om met int()." },
        { q: "Welke waarde is falsy?", o: ["\"\" (de lege string)", "\"0\"", "-1", "\" \" (een spatie)"], a: 0, e: "Enkel 0 en de lege string zijn falsy. De string \"0\" is niet leeg, dus truthy." },
        { q: "Wat toont dit programma?", code: 'price = 3.14159\nprint(f"Price: {price:.2f}")', o: ["Price: 3.14", "Price: 3.14159", "Price: {price:.2f}", "Price: 3.1"], a: 0, e: ".2f toont twee cijfers na de komma." },
        { q: "Wat is `word[0:3]` als `word = \"Python\"`?", o: ["'Pyt'", "'Pyth'", "'yth'", "'Py'"], a: 0, e: "Start op index 0; de stop-index 3 is niet inbegrepen." },
        { q: "Wat is `word[-1]` als `word = \"Python\"`?", o: ["'n'", "'P'", "'o'", "Een IndexError"], a: 0, e: "Een negatieve index telt vanaf het einde." },
        { q: "Wat toont dit programma?", code: 'answer = "PARIS"\nanswer.lower()\nprint(answer)', o: ["PARIS", "paris", "Paris", "None"], a: 0, e: "lower() geeft een nieuwe string terug en verandert het origineel niet. Je moet het resultaat bewaren." },
        { q: "Je vergeet de `f` voor een f-string: `print(\"Hello {name}\")`. Wat zie je?", o: ["Hello {name}", "Hello Alice", "Een SyntaxError", "Hello"], a: 0, e: "Zonder f is het een gewone string en blijven de accolades letterlijk staan." }
      ]
    },

    // ------------------------------------------------------------------ M3
    {
      id: "m3",
      title: "M3 · Lists",
      summary: "Lists, methodes, mutable objecten, split en join.",
      goals: [
        "Een list aanmaken en elementen opvragen via index en slicing.",
        "Elementen toevoegen, invoegen, wijzigen en verwijderen.",
        "Het verschil uitleggen tussen mutable en immutable objecten.",
        "Het verschil tussen == en is toepassen.",
        "Strings opsplitsen met split() en lists samenvoegen met join()."
      ],
      theory: `
<h2>Lists</h2>
<p>Een list houdt meerdere waarden bij in een vaste volgorde en kan groeien of krimpen.</p>
${code`
todos = ["Do laundry", "Go shopping", "Watch TV"]
leeg = []
todos[0]         # 'Do laundry'   (tellen begint bij 0)
todos[-1]        # 'Watch TV'
todos[0:2]       # ['Do laundry', 'Go shopping']
todos[0] = "Wake up"     # wijzigen kan bij lists, niet bij strings
`}

<h2>Methodes</h2>
${table(["Methode", "Wat doet het?", "Geeft terug"], [
  [c`lst.append(x)`, "x achteraan toevoegen", "None"],
  [c`lst.insert(i, x)`, "x invoegen op index i", "None"],
  [c`lst.remove(x)`, "eerste voorkomen van de <strong>waarde</strong> x verwijderen", "None"],
  [c`lst.pop(i)`, "element op <strong>index</strong> i verwijderen", "het verwijderde element"],
  [c`lst.pop()`, "laatste element verwijderen", "het verwijderde element"],
  [c`lst.reverse()`, "volgorde omkeren in de list zelf", "None"]
])}
${note("<code>remove</code> op een waarde die niet in de list zit geeft een ValueError. Controleer eerst met <code>if x in lst:</code>.", "warn")}

<h2>Operatoren en functies</h2>
${table(["Code", "Resultaat"], [
  [c`["a", "b"] + ["c"]`, c`['a', 'b', 'c']`],
  [c`['a'] * 3`, c`['a', 'a', 'a']`],
  [c`"melk" in boodschappen`, "True of False"],
  [c`len([1, [2, 3]])`, "2 (een geneste list telt als één element)"],
  [c`min(lst)` + " / " + c`max(lst)`, "kleinste / grootste"],
  [c`sorted(lst)`, "gesorteerde <strong>kopie</strong>; het origineel blijft ongewijzigd"],
  [c`sum(lst)`, "som van de getallen"]
])}

<h2>Een list opbouwen in een lus</h2>
${code`
words = []
word = input("Give me a word, or (Q) to quit: > ")
while word != "Q":
    words.append(word)
    word = input("Give me a word, or (Q) to quit: > ")
print(f"Your list of words is: {words}")
`}

<h2>Mutable objecten: == en is</h2>
<p>Een list is <strong>mutable</strong> (veranderbaar). Twee variabelen kunnen naar hetzelfde list-object wijzen.</p>
${code`
list_1 = [1, 2, 3]
list_2 = list_1          # GEEN kopie: tweede label op hetzelfde object
list_1.append(4)
print(list_2)            # [1, 2, 3, 4]

list_3 = [1, 2, 3, 4]
list_1 == list_3         # True   (zelfde inhoud)
list_1 is list_3         # False  (verschillende objecten)
list_1 is list_2         # True   (hetzelfde object)
`}
<p>Strings en getallen zijn <strong>immutable</strong>: ${c`s = s + " world"`} maakt een nieuwe string. Een echte kopie van een list maak je met ${c`list(origineel)`} of ${c`origineel[:]`}.</p>

<h2>split() en join()</h2>
${table(["Code", "Resultaat"], [
  [c`"I like python".split()`, c`['I', 'like', 'python']`],
  [c`"a,b,c".split(",")`, c`['a', 'b', 'c']`],
  [c`"a, b".split(",")`, c`['a', ' b']` + " (de spatie blijft staan)"],
  [c`" ".join(["I", "like"])`, c`'I like'`],
  [c`"-".join(["a", "b", "c"])`, c`'a-b-c'`]
])}
<p>split gaat van string naar list; join van list naar string. Bij join staat het scheidingsteken vóór de punt.</p>
`,
      quiz: [
        { q: "Wat is `todos[1]`?", code: 'todos = ["Do laundry", "Go shopping", "Watch TV"]', o: ["'Go shopping'", "'Do laundry'", "'Watch TV'", "Een IndexError"], a: 0, e: "Tellen begint bij 0." },
        { q: "Wat is het verschil tussen `remove` en `pop`?", o: ["`remove` werkt met een waarde, `pop` met een index", "`remove` werkt met een index, `pop` met een waarde", "`pop` verwijdert altijd het eerste element", "Er is geen verschil"], a: 0, e: "pop geeft bovendien het verwijderde element terug." },
        { q: "Wat toont dit programma?", code: "list_1 = [1, 2, 3]\nlist_2 = list_1\nlist_1.append(4)\nprint(list_2)", o: ["[1, 2, 3, 4]", "[1, 2, 3]", "[4]", "Een foutmelding"], a: 0, e: "list_2 = list_1 maakt geen kopie. Beide namen wijzen naar hetzelfde object." },
        { q: "Wat is het resultaat?", code: "a = [1, 2]\nb = [1, 2]\nprint(a == b, a is b)", o: ["True False", "True True", "False False", "False True"], a: 0, e: "== vergelijkt de inhoud, is controleert of het hetzelfde object is." },
        { q: "Wat toont dit programma?", code: 'words = ["a", "b", "c"]\nwords = words.reverse()\nprint(words)', o: ["None", "['c', 'b', 'a']", "['a', 'b', 'c']", "Een foutmelding"], a: 0, e: "reverse() verandert de list zelf en geeft None terug. Schrijf gewoon words.reverse()." },
        { q: "Wat geeft `\"a, b\".split(\",\")`?", o: ["['a', ' b']", "['a', 'b']", "['a,', 'b']", "'a b'"], a: 0, e: "De spatie na de komma blijft staan. Gebruik eventueel strip()." },
        { q: "Wat geeft `\"-\".join([\"a\", \"b\", \"c\"])`?", o: ["'a-b-c'", "'-abc'", "['a-b-c']", "'abc-'"], a: 0, e: "Het scheidingsteken staat vóór de punt en komt tussen de elementen." },
        { q: "Wat is `len([1, [2, 3]])`?", o: ["2", "3", "1", "Een TypeError"], a: 0, e: "De geneste list telt als één element." },
        { q: "Wat doet `sorted(lst)`?", o: ["Een gesorteerde kopie teruggeven; de originele list blijft ongewijzigd", "De list zelf sorteren en None teruggeven", "De list omkeren", "Dubbele waarden verwijderen"], a: 0, e: "Bewaar het resultaat in een variabele." },
        { q: "Hoe maak je een echte kopie van een list?", o: ["kopie = list(origineel)", "kopie = origineel", "kopie = origineel.copy", "kopie == origineel"], a: 0, e: "list(origineel) of origineel[:] maakt een nieuw list-object." }
      ]
    },

    // ------------------------------------------------------------------ M4
    {
      id: "m4",
      title: "M4 · Functions",
      summary: "def, argumenten, return, scope en main().",
      goals: [
        "Een eigen functie definiëren met def, argumenten en return.",
        "Het verschil uitleggen tussen een functie definiëren en oproepen.",
        "Het verschil tussen print() en return toepassen en weten wat None is.",
        "Scope uitleggen: lokale en globale variabelen.",
        "Code opsplitsen in kleine functies en een main()-functie gebruiken."
      ],
      theory: `
<h2>Waarom functies?</h2>
<p>Gekopieerde code is foutgevoelig: hoe meer kopieën van dezelfde logica, hoe meer plaatsen waar een fout kan zitten. Schrijf de logica één keer in een functie.</p>

<h2>Een functie definiëren</h2>
${code`
def get_card_value(card):          # def + naam + (argumenten) + :
    if card == 'A':
        card_value = 1
    elif card in ['K', 'Q', 'J', '10']:
        card_value = 10
    else:
        card_value = int(card)
    return card_value              # geeft de waarde terug aan de oproeper

hand_value = get_card_value("K") + get_card_value("7")    # 17
`}

<h2>Hoe wordt een functie uitgevoerd?</h2>
<ol>
  <li>Python leest de ${c`def`} en onthoudt de functie, maar slaat de body over.</li>
  <li>Pas bij de <strong>oproep</strong> springt Python naar de eerste regel van de body.</li>
  <li>Het argument krijgt de meegegeven waarde.</li>
  <li>Bij ${c`return`} springt Python terug naar de plek van de oproep, met de teruggegeven waarde.</li>
</ol>
${note("Definiëren is niet uitvoeren. Een functie die je nooit oproept, doet niets.", "warn")}

<h2>print versus return</h2>
${code`
def say_hello_print(name):
    print(f"Hello {name}!")        # toont tekst, geeft niets terug

def say_hello_return(name):
    return f"Hello {name}!"        # geeft tekst terug, toont niets

result_1 = say_hello_print("James")     # toont: Hello James!
print(result_1)                         # None
result_2 = say_hello_return("James")    # toont niets
print(result_2)                         # Hello James!
`}
${table(["", "print()", "return"], [
  ["Toont iets in de terminal?", "ja", "nee"],
  ["Geeft een waarde aan de oproeper?", "nee", "ja"],
  ["Stopt de functie?", "nee", "ja: code erna wordt niet uitgevoerd"]
])}
<p><strong>None</strong> betekent "geen waarde". Het is niet 0 en niet "". Een functie zonder return geeft automatisch None terug. Zie je <em>NoneType</em> in een foutmelding, dan ben je waarschijnlijk een return vergeten.</p>

<h2>Argumenten</h2>
${code`
def make_email(first_name, last_name, domain):
    return first_name.lower() + "." + last_name.lower() + "@" + domain

make_email("James", "Bond", "gmail.com")    # 'james.bond@gmail.com'
make_email("James", "gmail.com")            # TypeError: argument ontbreekt
`}
<ul>
  <li>Argumenten worden gekoppeld op <strong>volgorde</strong>, niet op naam.</li>
  <li>Geen argumenten? De haakjes blijven verplicht: ${c`def deal_card():`} en ${c`deal_card()`}.</li>
</ul>

<h2>Scope</h2>
<p>Variabelen die je in een functie maakt (ook de argumenten) zijn <strong>lokaal</strong>: ze bestaan enkel binnen die functie.</p>
${code`
def get_card_value(card):
    card_value = 10        # lokaal

get_card_value("K")
print(card_value)          # NameError
`}
<p>Wat je nog nodig hebt, geef je terug met return en vang je op in een variabele. <strong>Globale variabelen</strong> (buiten elke functie) vermijden we: alle code gaat in een ${c`main()`}-functie en waarden geef je door als argument.</p>
${code`
from random import randrange

def deal_card(cards):
    return cards.pop(randrange(len(cards)))

def main():
    cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] * 4
    card1 = deal_card(cards)
    print(f"You got: {card1}")

main()        # niet vergeten: main() ook oproepen
`}

<h2>randrange</h2>
${table(["Code", "Resultaat"], [
  [c`randrange(10)`, "willekeurig geheel getal van 0 t.e.m. 9"],
  [c`randrange(1, 7)`, "dobbelsteen: 1 t.e.m. 6"],
  [c`lst[randrange(len(lst))]`, "willekeurig element uit een list"]
])}

<h2>Kleine functies extraheren</h2>
<p>Ook code die maar één keer voorkomt, zet je vaak beter in een functie: de naam legt uit wat de code doet, en je denkt aan één klein stuk tegelijk. Elke functie doet één ding. Voorbeeld uit Tic Tac Toe: ${c`initialize_field()`}, ${c`print_field(field)`}, ${c`is_valid_move(move, field)`}, ${c`play_turn(...)`}, ${c`is_game_over(...)`} en ${c`main()`}, die alles samenzet.</p>
`,
      quiz: [
        { q: "Wat toont dit programma?", code: 'def greet(name):\n    print(f"Hello {name}!")\n\nresult = greet("James")\nprint(result)', o: ["Hello James! en daarna None", "Enkel Hello James!", "Twee keer Hello James!", "Enkel None"], a: 0, e: "De functie toont tekst maar heeft geen return, dus result is None." },
        { q: "Wat gebeurt er met code die na een `return` in dezelfde functie staat?", o: ["Ze wordt niet uitgevoerd", "Ze wordt uitgevoerd nadat de waarde is teruggegeven", "Ze geeft een SyntaxError", "Ze wordt enkel de eerste keer uitgevoerd"], a: 0, e: "return stopt de functie meteen." },
        { q: "Wat toont dit programma?", code: 'def double(x):\n    result = x * 2\n\ndouble(4)\nprint(result)', o: ["Een NameError", "8", "None", "4"], a: 0, e: "result is een lokale variabele en bestaat niet buiten de functie." },
        { q: "Je definieert een functie `main()` maar het programma doet niets. Wat is de meest waarschijnlijke oorzaak?", o: ["Je hebt `main()` niet opgeroepen", "main is een verboden naam", "Functies zonder argumenten werken niet", "Er ontbreekt een return"], a: 0, e: "Definiëren is niet uitvoeren. Zet main() onderaan je bestand." },
        { q: "Hoe worden argumenten aan een functie gekoppeld?", o: ["Op volgorde", "Op naam van de variabele", "Alfabetisch", "Willekeurig"], a: 0, e: "Geef je ze in de verkeerde volgorde mee, dan krijg je een fout resultaat." },
        { q: "Welke waarden kan `randrange(1, 7)` geven?", o: ["1 t.e.m. 6", "1 t.e.m. 7", "0 t.e.m. 7", "0 t.e.m. 6"], a: 0, e: "Het eindgetal is niet inbegrepen." },
        { q: "Wat betekent `None`?", o: ["Geen waarde", "Het getal 0", "Een lege string", "False"], a: 0, e: "None is een eigen waarde. Rekenen met None geeft een fout." },
        { q: "Wat is het resultaat?", code: "def add(a, b):\n    return a + b\n\nprint(add(2, 3) * 2)", o: ["10", "7", "12", "None"], a: 0, e: "add(2, 3) geeft 5 terug; 5 × 2 = 10." },
        { q: "Waarom zet je code in een `main()`-functie?", o: ["Om globale variabelen te vermijden", "Omdat Python anders niet start", "Omdat het programma dan sneller is", "Omdat print anders niet werkt"], a: 0, e: "Waarden geef je door als argument in plaats van ze globaal te maken." },
        { q: "Wat gebeurt er bij `make_email(\"James\", \"gmail.com\")` als de functie drie argumenten verwacht?", o: ["TypeError: er ontbreekt een argument", "Het derde argument wordt None", "Het derde argument wordt een lege string", "NameError"], a: 0, e: "Het aantal argumenten moet kloppen." }
      ]
    },

    // ------------------------------------------------------------------ M5
    {
      id: "m5",
      title: "M5 · File I/O, for en range",
      summary: "Bestanden lezen en schrijven, escape characters, for-lussen en range.",
      goals: [
        "Een bestand openen met with open(...) en encoding='utf-8'.",
        "Lezen met read(), readline() en readlines().",
        "Schrijven met 'w' of 'a' en write().",
        "Escape characters gebruiken.",
        "Met een for-lus over een iterable lopen en range() gebruiken."
      ],
      theory: `
<h2>Tekst- en binaire bestanden</h2>
${table(["Soort", "Kenmerk", "Voorbeelden"], [
  ["Tekstbestand", "mensleesbaar; elke byte is een teken", ".txt .csv .html .md .json"],
  ["Binair bestand", "compact, niet mensleesbaar", ".jpg .png .mp3 .docx"]
])}

<h2>Openen en sluiten</h2>
<p>Een bestand moet je openen, gebruiken en weer sluiten. Met ${c`with`} gebeurt het sluiten automatisch, ook als er iets fout gaat. Gebruik altijd with.</p>
${code`
with open("input.txt", encoding="utf-8") as file:     # standaard: lezen ('r')
    lines = file.readlines()
# hier is het bestand gesloten
`}
${table(["Mode", "Betekenis"], [
  [c`'r'`, "lezen (standaard)"],
  [c`'w'`, "schrijven: maakt het bestand eerst <strong>leeg</strong>"],
  [c`'a'`, "toevoegen achteraan (append)"]
])}
<p>${c`encoding="utf-8"`} vermijdt problemen met tekens zoals € of é.</p>

<h2>Lezen</h2>
${table(["Methode", "Geeft terug"], [
  [c`file.read()`, "de volledige inhoud als één string"],
  [c`file.readlines()`, "een list van strings, één per regel, met \\n op het einde"],
  [c`file.readline()`, "de volgende regel; een lege string als er niets meer is"]
])}
<p>Een open bestand onthoudt een <strong>leespositie</strong>. Na read() of readlines() is het bestand "op". Je kan ook rechtstreeks over het bestand lopen:</p>
${code`
with open("movies.txt", encoding="utf-8") as file:
    for line in file:
        line = line.strip()            # \n op het einde weghalen
        parts = line.split(" - ")
`}
${note("Elke gelezen regel eindigt op een onzichtbare newline. Haal die weg met <code>strip()</code> voor je vergelijkt, splitst of print.", "warn")}

<h2>Schrijven</h2>
<p>${c`write()`} en ${c`writelines()`} voegen <strong>geen</strong> newlines toe. Die geef je zelf mee.</p>
${code`
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Hello\n")
    file.writelines(["a\n", "b\n"])
`}

<h2>Escape characters</h2>
${table(["Combinatie", "Betekenis"], [
  [c`\"` + " / " + c`\'`, "aanhalingsteken in een string"],
  [c`\n`, "nieuwe regel"],
  [c`\t`, "tab"],
  [c`\\`, "een echte backslash"]
])}
${code`
print("Jack's mother said \"hello\"")
print("C:\\nodejs\\training")       # C:\nodejs\training
print(r"C:\nodejs\training")        # raw string: backslashes blijven staan
`}

<h2>De for-lus</h2>
${code`
my_list = ["one", "two", "three"]
for item in my_list:            # voor elk item in my_list
    print(item)

for character in "Hello":       # ook een string is een iterable
    print(character)
`}
<p>Een <strong>iterable</strong> is een object dat zijn elementen één voor één kan teruggeven: lists, strings, en later tuples, sets en dicts.</p>

<h2>range()</h2>
${table(["Code", "Waarden"], [
  [c`range(3)`, "0, 1, 2"],
  [c`range(1, 4)`, "1, 2, 3 (stop niet inbegrepen)"],
  [c`range(0, 10, 2)`, "0, 2, 4, 6, 8"],
  [c`range(10, 0, -2)`, "10, 8, 6, 4, 2"],
  [c`range(len(lst))`, "alle geldige indexen van lst"]
])}
${table(["Gebruik", "Wanneer?"], [
  [c`for item in lst`, "je wil elk element gebruiken"],
  [c`for i in range(n)`, "je weet hoe vaak, of je hebt de index nodig"],
  [c`while`, "je weet niet vooraf hoe vaak (bv. tot de gebruiker Q typt)"]
])}
${note("Pas een list niet aan (remove, pop) terwijl je er met een for-lus doorheen loopt.", "warn")}
`,
      quiz: [
        { q: "Waarom gebruik je `with open(...) as file:`?", o: ["Het bestand wordt automatisch gesloten, ook als er iets fout gaat", "Het bestand wordt sneller gelezen", "Het bestand wordt automatisch aangemaakt", "Je hebt dan geen encoding nodig"], a: 0, e: "Zonder with moet je het bestand zelf sluiten." },
        { q: "Je opent een bestaand bestand met mode `'w'`. Wat gebeurt er met de bestaande inhoud?", o: ["Die wordt gewist", "Die blijft staan en nieuwe tekst komt achteraan", "Die blijft staan en nieuwe tekst komt vooraan", "Je krijgt een foutmelding"], a: 0, e: "Gebruik 'a' om achteraan toe te voegen." },
        { q: "Wat geeft `file.readlines()` terug?", o: ["Een list van strings, één per regel, met een newline op het einde", "Eén string met de volledige inhoud", "Enkel de eerste regel", "Het aantal regels"], a: 0, e: "read() geeft één string; readline() één regel." },
        { q: "Het bestand bevat de regel `Interstellar`. Waarom is `line == \"Interstellar\"` False na het inlezen?", o: ["De gelezen regel eindigt op een newline", "Bestanden bevatten enkel bytes", "De vergelijking is hoofdlettergevoelig", "line is een list"], a: 0, e: "Gebruik line.strip() om de newline weg te halen." },
        { q: "Wat staat er in output.txt?", code: 'with open("output.txt", "w", encoding="utf-8") as file:\n    file.write("a")\n    file.write("b")', o: ["ab op één regel", "a en b op aparte regels", "Enkel b", "a b met een spatie"], a: 0, e: "write() voegt geen newline toe. Die moet je zelf meegeven." },
        { q: "Welke waarden geeft `range(1, 4)`?", o: ["1, 2, 3", "1, 2, 3, 4", "0, 1, 2, 3", "1, 4"], a: 0, e: "Het stopgetal is niet inbegrepen." },
        { q: "Welke waarden geeft `range(0, 10, 3)`?", o: ["0, 3, 6, 9", "0, 3, 6", "3, 6, 9", "0, 3, 6, 9, 12"], a: 0, e: "Stappen van 3, zolang de waarde kleiner is dan 10." },
        { q: "Wat toont dit programma?", code: 'total = 0\nfor n in [1, 2, 3]:\n    total += n\nprint(total)', o: ["6", "3", "123", "0"], a: 0, e: "De lus telt 1 + 2 + 3 op." },
        { q: "Wat doet `\\n` in een string?", o: ["Een nieuwe regel beginnen", "Een tab invoegen", "Een backslash tonen", "De string beëindigen"], a: 0, e: "\\t is een tab en \\\\ een echte backslash." },
        { q: "Wanneer kies je een while-lus in plaats van een for-lus?", o: ["Als je niet vooraf weet hoe vaak je moet herhalen", "Als je over een list loopt", "Als je de index nodig hebt", "Als je precies 10 keer wil herhalen"], a: 0, e: "Bv. herhalen tot de gebruiker Q typt." }
      ]
    },

    // ------------------------------------------------------------------ M6
    {
      id: "m6",
      title: "M6 · Classes en objecten",
      summary: "Classes, __init__, attributen, methodes en __repr__.",
      goals: [
        "Het verschil uitleggen tussen een class en een object.",
        "Een class schrijven met een constructor en attributen via self.",
        "Methodes schrijven die iets teruggeven of het object veranderen.",
        "Het verschil tussen een functie en een methode uitleggen.",
        "__repr__ implementeren."
      ],
      theory: `
<h2>Waarom classes?</h2>
<p>Een kaart als string ("HA", "D3") werkt, maar de lezer moet het formaat kennen. Met een eigen datatype wordt code leesbaar:</p>
${code`
# met strings
return card[0] == top_suit or card[1:] == top_card[1:] or card[1:] == "8"
# met een class
return card.suit == top_suit or card.rank == top_card.rank or card.rank == "8"
`}

<h2>Class en object</h2>
${table(["Begrip", "Betekenis", "Voorbeeld"], [
  ["Class", "een datatype, de bouwtekening", "PlayingCard, str"],
  ["Object", "één concreet exemplaar (instantie) van een class", c`PlayingCard("SA")` + ", " + c`"James"`],
  ["Attribuut", "variabele die bij één object hoort", c`card.suit`],
  ["Methode", "functie die in een class staat", c`card.get_card_value()`]
])}

<h2>Een class schrijven</h2>
${code`
class PlayingCard:                          # naam in PascalCase
    def __init__(self, string_value):       # constructor
        self.suit = string_value[0]         # attribuut
        self.rank = string_value[1:]        # attribuut

card = PlayingCard("DA")                    # roept __init__ op
print(card.suit)                            # D
print(card.rank)                            # A
`}
<ul>
  <li>De <strong>constructor</strong> ${c`__init__`} wordt opgeroepen wanneer je een object aanmaakt.</li>
  <li>${c`self`} is het object zelf. Je geeft het niet mee bij de oproep; Python doet dat.</li>
  <li>${c`self.suit = ...`} maakt een attribuut dat op het object blijft. Zonder ${c`self.`} is het een lokale variabele die verdwijnt na de constructor.</li>
  <li>Attributen kunnen afgeleid zijn (${c`self.full_name = f"{first_name} {last_name}"`}) of een vaste beginwaarde hebben (${c`self.score = 0`}).</li>
</ul>

<h2>Methodes</h2>
<p>Een methode is een functie die bij een class hoort. Je roept ze op met een punt; het object vóór de punt wordt ${c`self`}.</p>
${code`
class PlayingCard:
    def __init__(self, string_value):
        self.suit = string_value[0]
        self.rank = string_value[1:]

    def get_card_value(self):               # eerste argument is altijd self
        if self.rank == 'A':
            return 1
        elif self.rank in ['K', 'Q', 'J', '10']:
            return 10
        return int(self.rank)

five_of_clubs = PlayingCard("C5")
print(five_of_clubs.get_card_value())       # 5
`}
<p>Methodes kunnen ook de toestand van het object veranderen:</p>
${code`
class Player:
    def __init__(self, name):
        self.name = name
        self.score = 0

    def add_points(self, points):
        self.score += points                # verandert het object
`}

<h2>__repr__</h2>
<p>Zonder ${c`__repr__`} toont print iets als ${c`<__main__.Person object at 0x10cb90050>`}. Met ${c`__repr__`} bepaal je zelf de voorstelling. De methode moet een string <strong>teruggeven</strong>.</p>
${code`
class Person:
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    def __repr__(self):
        return f'Person("{self.first_name}", "{self.last_name}")'

print(Person("James", "Bond"))      # Person("James", "Bond")
print([Person("A", "B")])           # werkt ook in een list
`}
<p>Methodes met twee underscores voor en na heten <strong>dunder methods</strong>. Je roept ze zelden zelf op; Python gebruikt ze achter de schermen.</p>
`,
      quiz: [
        { q: "Wat is het verschil tussen een class en een object?", o: ["Een class is het datatype; een object is één concreet exemplaar ervan", "Een object is het datatype; een class is een exemplaar", "Een class heeft methodes, een object niet", "Er is geen verschil"], a: 0, e: "PlayingCard is de class; PlayingCard(\"SA\") maakt een object." },
        { q: "Welke methode wordt opgeroepen bij `card = PlayingCard(\"DA\")`?", o: ["__init__", "__repr__", "__new_card__", "PlayingCard"], a: 0, e: "__init__ is de constructor." },
        { q: "Wat is `self` in een methode?", o: ["Het object waarop de methode wordt opgeroepen", "De class zelf", "Een verplicht argument dat je bij de oproep meegeeft", "Een globale variabele"], a: 0, e: "Bij card.get_card_value() is self het object card." },
        { q: "Wat gaat hier fout?", code: 'class Player:\n    def __init__(self, name):\n        name = name\n\np = Player("James")\nprint(p.name)', o: ["Er is geen attribuut name, want `self.` ontbreekt", "name is een keyword", "De constructor mist een return", "Player moet met een kleine letter"], a: 0, e: "Zonder self. is name een lokale variabele. Schrijf self.name = name." },
        { q: "Wat toont dit programma?", code: 'class Player:\n    def __init__(self, name):\n        self.name = name\n        self.score = 0\n\n    def add_points(self, points):\n        self.score += points\n\np = Player("James")\np.add_points(5)\np.add_points(3)\nprint(p.score)', o: ["8", "3", "5", "0"], a: 0, e: "De methode verandert het attribuut score van het object." },
        { q: "Hoe roep je de methode `get_card_value` op voor het object `card`?", o: ["card.get_card_value()", "get_card_value(card)", "card.get_card_value", "PlayingCard.get_card_value()"], a: 0, e: "Met een punt en met haakjes. Zonder haakjes roep je niets op." },
        { q: "Wat moet `__repr__` doen?", o: ["Een string teruggeven met return", "De tekst tonen met print", "Het object verwijderen", "Een nieuw object aanmaken"], a: 0, e: "print gebruiken in __repr__ is een veelgemaakte fout." },
        { q: "In welke schrijfwijze noteer je de naam van een class?", o: ["PascalCase, bv. PlayingCard", "snake_case, bv. playing_card", "Alles in hoofdletters", "camelCase, bv. playingCard"], a: 0, e: "Variabelen en functies staan in snake_case." },
        { q: "Hoeveel argumenten geef je mee bij de oproep als de methode `def set_rating(self, rating):` is?", o: ["Eén: de rating", "Twee: self en de rating", "Geen", "Drie"], a: 0, e: "self wordt automatisch ingevuld met het object vóór de punt." }
      ]
    },

    // ------------------------------------------------------------------ M7
    {
      id: "m7",
      title: "M7 · Collections en rekenen",
      summary: "Tuples, dictionaries, sets, conversies, //, % en afronden.",
      goals: [
        "Tuples gebruiken en destructuring toepassen.",
        "Dictionaries gebruiken: opzoeken, toevoegen, verwijderen, in, get en itereren.",
        "Sets gebruiken om duplicaten te verwijderen.",
        "Kiezen tussen list, tuple, set en dict.",
        "//, %, **, round, floor en ceil gebruiken."
      ],
      theory: `
<h2>Tuples</h2>
<p>Een tuple is zoals een list, maar <strong>immutable</strong>: je kan niets toevoegen, verwijderen of wijzigen.</p>
${code`
days = ('Monday', 'Tuesday', 'Wednesday')
point = (6, 7)
single = ("a",)           # tuple met 1 element: komma verplicht
days[0]                   # 'Monday'
days[0] = "x"             # TypeError
`}
<p>Vuistregel: een list als het aantal elementen kan veranderen, een tuple als het vastligt.</p>
<h3>Destructuring</h3>
${code`
first, second, third = ("one", "two", "three")
x, y = y, x               # twee variabelen wisselen
`}
<p>Het aantal variabelen moet exact kloppen, anders een ValueError.</p>

<h2>Dictionaries</h2>
<p>Een dict koppelt een <strong>key</strong> aan een <strong>value</strong>.</p>
${code`
translate = {'cat': 'kat', 'dog': 'hond'}
translate['cat']              # 'kat'      opzoeken
translate['bird'] = 'vogel'   # toevoegen
translate['cat'] = 'poes'     # overschrijven
translate.pop('dog')          # verwijderen, geeft 'hond' terug
'cat' in translate            # True   (in kijkt enkel naar KEYS)
'kat' in translate            # False
len(translate)                # aantal paren
leeg = {}                     # lege dict
`}
${table(["Methode", "Resultaat"], [
  [c`d.keys()`, "alle keys"],
  [c`d.values()`, "alle values"],
  [c`d.items()`, "alle (key, value)-paren als tuples"],
  [c`d.get(key)`, "de value, of None als de key ontbreekt (geen crash)"],
  [c`d.get(key, 0)`, "de value, of 0 als de key ontbreekt"]
])}
${code`
for key, value in translate.items():
    print(f"{key} -> {value}")

for movie in movies.values():         # enkel de values
    print(movie)
`}
${note("Een key opzoeken die niet bestaat met <code>d[key]</code> geeft een KeyError. Controleer met <code>if key in d:</code> of gebruik <code>d.get(key)</code>.", "warn")}

<h2>Sets</h2>
<ul>
  <li><strong>Ongeordend</strong>: geen indexen.</li>
  <li><strong>Geen duplicaten</strong>.</li>
  <li>Snelle test of iets erin zit (${c`x in s`}).</li>
</ul>
${code`
s = {1, 2, 3}
leeg = set()                  # {} is een lege dict!
s.add(4)
s.remove(1)
unique = set(['Belgium', 'France', 'Belgium'])     # {'Belgium', 'France'}
`}

<h2>Overzicht</h2>
${table(["Type", "Haakjes", "Geordend?", "Mutable?", "Duplicaten?"], [
  ["list", c`[1, 2]`, "ja", "ja", "ja"],
  ["tuple", c`(1, 2)`, "ja", "nee", "ja"],
  ["set", c`{1, 2}`, "nee", "ja", "nee"],
  ["dict", c`{'a': 1}`, "ja (invoegvolgorde)", "ja", "keys uniek"],
  ["str", c`"ab"`, "ja", "nee", "ja"]
])}
<p>Omzetten doe je met ${c`list(x)`}, ${c`tuple(x)`}, ${c`set(x)`} en ${c`str(x)`}. ${c`list(d.values())`} maakt een list van de values van een dict.</p>

<h2>Rekenen</h2>
<p>Floats zijn binair opgeslagen en daardoor niet altijd exact: ${c`3 * 0.1 == 0.3`} is <strong>False</strong>. Gebruik int waar het kan en vergelijk floats niet met ==.</p>
${table(["Code", "Resultaat", "Betekenis"], [
  [c`4 / 2`, "2.0", "delen geeft altijd een float"],
  [c`5 // 2`, "2", "floor division: hoe vaak past 2 in 5?"],
  [c`114 % 20`, "14", "modulo: de rest bij deling"],
  [c`2 ** 3`, "8", "macht"],
  [c`round(8.49)`, "8", "afronden naar het dichtstbijzijnde gehele getal"],
  [c`floor(4.9)`, "4", "naar beneden (from math import floor)"],
  [c`ceil(2.4)`, "3", "naar boven (from math import ceil)"]
])}
`,
      quiz: [
        { q: "Wat gebeurt er?", code: "days = ('Monday', 'Tuesday')\ndays[0] = 'Sunday'", o: ["TypeError: een tuple kan je niet wijzigen", "days wordt ('Sunday', 'Tuesday')", "IndexError", "Er wordt een nieuw element toegevoegd"], a: 0, e: "Tuples zijn immutable." },
        { q: "Hoe schrijf je een tuple met één element?", o: ["(\"a\",)", "(\"a\")", "[\"a\"]", "{\"a\"}"], a: 0, e: "Zonder komma is (\"a\") gewoon de string \"a\"." },
        { q: "Wat is het resultaat van `'kat' in translate`?", code: "translate = {'cat': 'kat', 'dog': 'hond'}", o: ["False", "True", "KeyError", "'cat'"], a: 0, e: "in kijkt enkel naar de keys, niet naar de values." },
        { q: "Wat gebeurt er bij `translate['bird']` als die key niet bestaat?", o: ["KeyError", "Het resultaat is None", "Het resultaat is een lege string", "De key wordt toegevoegd"], a: 0, e: "Gebruik translate.get('bird') om None te krijgen in plaats van een crash." },
        { q: "Wat geeft `pantry.get('vanilla', 0)` als 'vanilla' niet in de dict zit?", o: ["0", "None", "KeyError", "'vanilla'"], a: 0, e: "Het tweede argument van get is de standaardwaarde." },
        { q: "Hoe loop je over alle keys en values van een dict `d`?", o: ["for key, value in d.items():", "for key, value in d:", "for key, value in d.values():", "for (key: value) in d:"], a: 0, e: "items() geeft tuples van (key, value), die je uitpakt met destructuring." },
        { q: "Hoe maak je een lege set?", o: ["set()", "{}", "[]", "()"], a: 0, e: "{} is een lege dict." },
        { q: "Wat is `len(set([1, 2, 2, 3, 3, 3]))`?", o: ["3", "6", "2", "1"], a: 0, e: "Een set bevat geen duplicaten: {1, 2, 3}." },
        { q: "Wat is het resultaat van `7 // 2` en `7 % 2`?", o: ["3 en 1", "3.5 en 1", "3 en 0.5", "4 en 1"], a: 0, e: "// is floor division, % geeft de rest." },
        { q: "Wat is het resultaat van `3 * 0.1 == 0.3`?", o: ["False", "True", "Een TypeError", "0.3"], a: 0, e: "Floats zijn niet altijd exact: 3 * 0.1 geeft 0.30000000000000004." },
        { q: "Wat geeft `4 / 2`?", o: ["2.0", "2", "2.5", "Een fout"], a: 0, e: "De operator / geeft altijd een float. Gebruik // voor een geheel getal." },
        { q: "Welk type kies je voor een verzameling waarin elk element maar één keer mag voorkomen?", o: ["set", "list", "tuple", "str"], a: 0, e: "Een set bewaart nooit dubbele waarden." }
      ]
    },

    // ------------------------------------------------------------------ M8
    {
      id: "m8",
      title: "M8 · Public en private",
      summary: "Setters, validatie met raise, getters en private attributen.",
      goals: [
        "Abstractie en een publieke interface uitleggen.",
        "Setters schrijven die waarden valideren en raise ValueError gebruiken.",
        "Setters ook in de constructor gebruiken.",
        "Niet-publieke attributen aanduiden en getters schrijven.",
        "Read-only attributen maken en een kopie teruggeven van mutable attributen."
      ],
      theory: `
<h2>Abstractie en publieke interface</h2>
<p><strong>Abstractie</strong> is details verbergen en enkel tonen wat ertoe doet. Van ${c`print()`} ken je de naam, de parameters en de returnwaarde: dat is de <strong>publieke interface</strong>. Hoe het binnenin werkt is de privé-implementatie. Vergelijk met een tv: je gebruikt de afstandsbediening en zit niet aan de elektronica.</p>
<p>Een goede publieke interface is makkelijk te gebruiken en kan het object niet kapotmaken.</p>

<h2>Setters</h2>
<p>Moet een attribuut aan een regel voldoen, dan schrijf je die regel één keer in een <strong>setter</strong> in plaats van overal waar het attribuut wijzigt.</p>
${code`
class Pokemon:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def set_hp(self, new_hp):
        self.hp = new_hp
        if self.hp < 0:
            self.hp = 0             # nooit negatief
`}

<h2>Fouten opgooien met raise</h2>
<p>Kan je niet redelijk raden wat de juiste waarde is, dan laat je het programma bewust crashen. Zo zie je de fout meteen.</p>
${code`
def set_slot(self, new_slot):
    if new_slot not in [1, 2, 3, 4]:
        raise ValueError(f"{new_slot} is not a valid slot")
    self._slot = new_slot
`}
<ul>
  <li>${c`raise`} gooit een fout op; ${c`ValueError(...)`} is het soort fout met een duidelijke boodschap.</li>
  <li>Na een raise wordt de rest van de methode niet meer uitgevoerd. Zet de controle dus <strong>vóór</strong> de toekenning.</li>
</ul>

<h2>Setters in de constructor</h2>
<p>Heb je een setter, gebruik hem dan ook in de constructor. Anders kan je nog altijd een ongeldig object aanmaken.</p>
${code`
class Course:
    def __init__(self, name, day_of_week, slot):
        self.name = name
        self.set_day_of_week(day_of_week)      # ook hier gevalideerd
        self.set_slot(slot)

    def set_day_of_week(self, new_day_of_week):
        if new_day_of_week not in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]:
            raise ValueError(f'"{new_day_of_week}" is not a weekday')
        self._day_of_week = new_day_of_week

    def get_day_of_week(self):
        return self._day_of_week
`}
<p>De setter maakt het attribuut aan wanneer hij wordt opgeroepen.</p>

<h2>Niet-publieke attributen en getters</h2>
<p>Python dwingt het gebruik van een setter niet af. Daarom de afspraak: een attribuut dat begint met een underscore (${c`_day_of_week`}) raak je buiten de class niet rechtstreeks aan. Het beschermt tegen fouten per ongeluk.</p>
${table(["Code", "Goed?"], [
  [c`course.set_day_of_week("Thursday")`, "ja: via de publieke interface"],
  [c`course.get_day_of_week()`, "ja: getter om de waarde te lezen"],
  [c`course._day_of_week = "Every day"`, "werkt technisch, maar mag niet"]
])}
<p>Omdat het attribuut verborgen is, heb je een <strong>getter</strong> nodig om het te lezen. Getter en setter vormen samen een getter-setter-paar.</p>
${note("In de examenopdracht worden private attributen met <strong>twee</strong> underscores geschreven, bv. <code>self.__capacity</code>. Het principe blijft hetzelfde: enkel via getters en setters.", "exam")}

<h2>Read-only attributen</h2>
<p>Een waarde die na het aanmaken niet mag veranderen (de kleur van een speelkaart) krijgt enkel een getter en geen setter.</p>
${code`
class PlayingCard:
    def __init__(self, string_value):
        self._suit = string_value[0]
        self._rank = string_value[1:]

    def get_suit(self):
        return self._suit
`}

<h2>Getters voor mutable attributen</h2>
<p>Een getter die een list teruggeeft, geeft hetzelfde object terug. Wie die list aanpast, verandert ook het private attribuut. Geef daarom een <strong>kopie</strong> terug.</p>
${code`
class Queue:
    def __init__(self):
        self._customers = []

    def enter(self, name):
        self._customers.append(name)

    def get_customers(self):
        return list(self._customers)       # kopie, niet het origineel
`}
<p>Bij immutable waarden (strings, getallen, booleans) speelt dit probleem niet.</p>

<h2>Private methodes</h2>
<p>Ook een methode kan niet-publiek zijn (naam begint met een underscore): een hulpmethode die enkel binnen de class gebruikt wordt en niet tot de publieke interface behoort.</p>
`,
      quiz: [
        { q: "Wat is de publieke interface van een functie of class?", o: ["Wat de gebruiker moet kennen: naam, parameters en returnwaarde", "De volledige broncode", "De private attributen", "De testen van de oefening"], a: 0, e: "Hoe het binnenin werkt is de privé-implementatie." },
        { q: "Waarom schrijf je een setter in plaats van het attribuut rechtstreeks te wijzigen?", o: ["De regel waaraan de waarde moet voldoen staat dan op één plaats", "Een setter is sneller", "Attributen kan je anders niet wijzigen", "Python verplicht het"], a: 0, e: "Herhaal je de regel overal, dan vergeet je hem vroeg of laat." },
        { q: "Wat doet `raise ValueError(\"...\")`?", o: ["Een fout opgooien; de rest van de methode wordt niet meer uitgevoerd", "Een waarschuwing tonen en verdergaan", "De waarde automatisch verbeteren", "None teruggeven"], a: 0, e: "Het programma stopt, tenzij de fout wordt opgevangen." },
        { q: "Wat is er mis met deze setter?", code: "def set_rating(self, rating):\n    self._rating = rating\n    if rating < 0 or rating > 10:\n        raise ValueError(\"Invalid rating\")", o: ["De ongeldige waarde is al opgeslagen vóór de controle", "ValueError bestaat niet", "Een setter mag geen if bevatten", "Er ontbreekt een return"], a: 0, e: "Controleer eerst en ken pas daarna toe." },
        { q: "Waarom gebruik je de setter ook in de constructor?", o: ["Zodat een object nooit met een ongeldige waarde kan starten", "Omdat attributen anders niet bestaan", "Omdat de constructor geen argumenten mag hebben", "Om de getter te vermijden"], a: 0, e: "Anders valideert de setter enkel latere wijzigingen." },
        { q: "Wat betekent een underscore vooraan in `self._day_of_week`?", o: ["Het attribuut is niet bedoeld om buiten de class rechtstreeks te gebruiken", "Het attribuut is een constante", "Het attribuut is een getal", "Python blokkeert alle toegang van buitenaf"], a: 0, e: "Het is een afspraak die beschermt tegen fouten per ongeluk." },
        { q: "Hoe maak je een attribuut read-only?", o: ["Private maken en enkel een getter voorzien, geen setter", "Enkel een setter voorzien", "De naam in hoofdletters schrijven", "Het in een tuple zetten"], a: 0, e: "Zonder setter is er geen publieke manier om de waarde te wijzigen." },
        { q: "Waarom geeft een getter voor een list beter `list(self._customers)` terug?", o: ["Anders kan de oproeper de private list aanpassen", "Omdat een list niet teruggegeven kan worden", "Omdat de kopie gesorteerd is", "Omdat de getter anders None geeft"], a: 0, e: "Een list is mutable; zonder kopie krijgt de oproeper hetzelfde object." },
        { q: "Welke regel leest de waarde op de juiste manier?", o: ["course.get_day_of_week()", "course._day_of_week", "course.get_day_of_week", "Course.day_of_week"], a: 0, e: "Via de getter, met haakjes." }
      ]
    },

    // ------------------------------------------------------------------ Examen
    {
      id: "examen",
      title: "Examen · Cinema Management",
      summary: "De examenopdracht: structuur, flow en de mogelijke uitbreidingen.",
      goals: [
        "De flow van het volledige programma uitleggen.",
        "Elk concept dat je gebruikt uitleggen: classes, private attributen, validatie, dict, list, bestanden.",
        "Een uitbreiding ter plaatse toevoegen en uitleggen hoe je ze implementeert."
      ],
      theory: `
<h2>Waar het examen om draait</h2>
<p>Je bouwt een programma dat een bioscoop beheert, met drie classes en twee invoerbestanden. Belangrijker dan dat het werkt: je moet de <strong>flow</strong> kunnen uitleggen, <strong>elk concept</strong> dat je gebruikt, en een <strong>uitbreiding</strong> kunnen toevoegen.</p>

<h2>De drie classes</h2>
${table(["Class", "Attributen", "Methodes"], [
  ["Movie", "private: title, year, duration, genre, rating (start op 0)", "getters en setters met validatie voor elk attribuut"],
  ["Screening", "public: movie, date, time, room · private: __capacity, __sold_tickets (start op 0)", "get_capacity(), get_sold_tickets(), get_available_seats(), sell_tickets(amount)"],
  ["Cinema", "public: name, city · private: dict met movies (key = titel), list met screenings", "add_movie, get_movie_by_title, get_movies, add_screening, get_screenings, get_screenings_by_movie, get_screening, read_movies_file, read_screenings_file, display_cinema, write_cinema_details"]
])}

<h2>Validatie in Movie</h2>
${table(["Attribuut", "Regel"], [
  ["title", "een string en niet leeg"],
  ["year", "een int en minstens 1888"],
  ["duration", "een int en groter dan 0"],
  ["genre", "een string en niet leeg"],
  ["rating", "tussen 0 en 10"]
])}
<p>Bij een ongeldige waarde: ${c`raise ValueError(...)`}. Gebruik de setters in de constructor, zodat ook een nieuw object gecontroleerd wordt.</p>
${code`
class Movie:
    def __init__(self, title, year, duration, genre):
        self.set_title(title)
        self.set_year(year)
        self.set_duration(duration)
        self.set_genre(genre)
        self.__rating = 0

    def set_year(self, year):
        if not isinstance(year, int):              # is het een int?
            raise ValueError("Year must be an integer")
        if year < 1888:
            raise ValueError("Year must be at least 1888")
        self.__year = year

    def get_year(self):
        return self.__year
`}

<h2>Screening</h2>
${code`
def get_available_seats(self):
    return self.__capacity - self.__sold_tickets

def sell_tickets(self, amount):
    if amount <= 0:
        raise ValueError("Amount must be positive")
    if amount > self.get_available_seats():
        raise ValueError("Not enough seats available")
    self.__sold_tickets += amount
`}
<p>Drie stappen: is het aantal positief, zijn er genoeg plaatsen, en pas dan verhogen.</p>

<h2>Cinema: dict en list</h2>
${code`
def add_movie(self, movie):
    self.__movies[movie.get_title()] = movie         # titel als key

def get_movie_by_title(self, title):
    return self.__movies.get(title)                  # None als de film niet bestaat

def get_movies(self):
    return list(self.__movies.values())

def get_screenings_by_movie(self, title):
    result = []
    for screening in self.__screenings:
        if screening.movie.get_title() == title:
            result.append(screening)
    return result                                    # lege list als er geen zijn

def get_screening(self, title, date, time):
    for screening in self.__screenings:
        if (screening.movie.get_title() == title
                and screening.date == date and screening.time == time):
            return screening
    return None
`}
<ul>
  <li>Waarom een <strong>dict</strong> voor films? Je zoekt een film rechtstreeks op via de titel, zonder de hele verzameling te doorlopen.</li>
  <li>Waarom een <strong>list</strong> voor vertoningen? Eén film kan meerdere vertoningen hebben, dus de titel is geen unieke key.</li>
</ul>

<h2>De bestanden</h2>
${code`
movies.txt       MOVIE - <title> - <year> - <duration> - <genre>
screenings.txt   SCREENING - <movie_title> - <date> - <time> - <room> - <capacity>
                 TICKET - <movie_title> - <date> - <time> - <amount>
`}
${code`
def read_movies_file(self, file_name):
    with open(file_name, encoding="utf-8") as file:
        for line in file:
            parts = line.strip().split(" - ")
            movie = Movie(parts[1], int(parts[2]), int(parts[3]), parts[4])
            self.add_movie(movie)

def read_screenings_file(self, file_name):
    with open(file_name, encoding="utf-8") as file:
        for line in file:
            parts = line.strip().split(" - ")
            if parts[0] == "SCREENING":
                movie = self.get_movie_by_title(parts[1])
                screening = Screening(movie, parts[2], parts[3], int(parts[4]), int(parts[5]))
                self.add_screening(screening)
            elif parts[0] == "TICKET":
                screening = self.get_screening(parts[1], parts[2], parts[3])
                screening.sell_tickets(int(parts[4]))
`}
${note("Drie dingen die vaak misgaan: <code>strip()</code> vergeten (de newline blijft dan aan het laatste deel hangen), splitsen op <code>\"-\"</code> in plaats van <code>\" - \"</code> (de datum 2026-10-12 bevat ook streepjes), en <code>int()</code> vergeten bij jaar, duur, zaal, capaciteit en aantal.", "warn")}

<h2>Tonen en wegschrijven</h2>
<ul>
  <li>${c`display_cinema()`} moet de overzichtsstring <strong>teruggeven</strong> (return), niet enkel printen. Bouw de string op en gebruik bv. ${c`ljust()`} om de kolommen uit te lijnen.</li>
  <li>${c`write_cinema_details(file_name)`} schrijft exact die string naar een bestand met ${c`with open(file_name, "w", encoding="utf-8")`}.</li>
</ul>

<h2>De flow van het programma</h2>
${code`
cinema = Cinema("Leuven Cinema", "Leuven")
cinema.read_movies_file("movies.txt")            # 1. films inlezen -> Movie-objecten in de dict
cinema.read_screenings_file("screenings.txt")    # 2. vertoningen aanmaken en tickets verkopen
print(cinema.display_cinema())                   # 3. overzicht tonen
cinema.write_cinema_details("output.txt")        # 4. hetzelfde overzicht wegschrijven
`}
<p>Volg één regel van begin tot einde om de flow uit te leggen: een TICKET-regel wordt gelezen → strip en split → ${c`get_screening`} zoekt de juiste vertoning in de list → ${c`sell_tickets`} controleert en verhoogt ${c`__sold_tickets`} → ${c`get_available_seats`} geeft daarna minder plaatsen.</p>

<h2>Mogelijke uitbreidingen</h2>
${table(["Uitbreiding", "Aanpak"], [
  ["1. Totale opbrengst", "Voeg een ticketprijs toe aan Screening (constructor + attribuut). <code>get_revenue()</code> geeft verkochte tickets × ticketprijs terug. Denk eraan dat de SCREENING-regel of de oproep van de constructor dan ook een prijs nodig heeft."],
  ["2. Populairste film", "In Cinema: tel per film de verkochte tickets van al zijn vertoningen op (bv. in een dict titel → totaal) en geef de film met het hoogste totaal terug."],
  ["3. Zoeken op genre", "<code>get_movies_by_genre(genre)</code>: loop over <code>self.__movies.values()</code> en verzamel de films waarvan <code>get_genre()</code> gelijk is aan het genre. Geef de list terug."],
  ["4. Validatie capaciteit", "Geef Screening een setter voor de capaciteit die een ValueError opgooit als de waarde kleiner is dan 1, en gebruik die setter in de constructor."],
  ["5. Film verwijderen", "<code>remove_movie(title)</code>: controleer eerst met <code>if title in self.__movies:</code> en gebruik dan <code>pop(title)</code>. Bedenk wat er moet gebeuren als de film niet bestaat (niets doen, of een ValueError) en wat met zijn vertoningen."],
  ["6. Bezettingsgraad", "<code>get_occupancy_percentage()</code>: verkochte tickets ÷ capaciteit × 100. Bij 150 van de 200 is dat 75."],
  ["7. Ongeldige ticketverkoop", "Zet de oproep van <code>sell_tickets</code> in een <code>try</code>-blok en vang de fout op met <code>except ValueError:</code>, zodat het programma verdergaat met de volgende regel. Een alternatief is vooraf vergelijken met <code>get_available_seats()</code>, maar de opgave vraagt om de ValueError af te handelen."]
])}
${code`
# Uitbreiding 2
def get_most_popular_movie(self):
    totals = {}
    for screening in self.__screenings:
        title = screening.movie.get_title()
        totals[title] = totals.get(title, 0) + screening.get_sold_tickets()
    best_title = None
    best_total = -1
    for title, total in totals.items():
        if total > best_total:
            best_title = title
            best_total = total
    return self.get_movie_by_title(best_title)

# Uitbreiding 7
elif parts[0] == "TICKET":
    screening = self.get_screening(parts[1], parts[2], parts[3])
    try:
        screening.sell_tickets(int(parts[4]))
    except ValueError:
        print(f"Ticket sale skipped: {line.strip()}")
`}

<h2>Vragen die je moet kunnen beantwoorden</h2>
<ul>
  <li>Wat is het verschil tussen een class en een object in jouw programma?</li>
  <li>Waarom zijn de attributen private, en hoe kom je er dan aan?</li>
  <li>Wat gebeurt er precies bij een raise? Waar stopt het programma?</li>
  <li>Waarom een dict voor films en een list voor vertoningen?</li>
  <li>Waarom geeft <code>get_movie_by_title</code> None terug en geen fout?</li>
  <li>Waarom return en niet print in <code>display_cinema</code>?</li>
  <li>Wat doet <code>with open</code>, en waarom <code>strip()</code> en <code>int()</code>?</li>
</ul>
`,
      quiz: [
        { q: "Welke gegevensstructuur gebruikt Cinema voor de films en met welke key?", o: ["Een dict met de titel als key", "Een list gesorteerd op jaar", "Een dict met het jaar als key", "Een set met titels"], a: 0, e: "Zo zoek je een film rechtstreeks op via zijn titel." },
        { q: "Waarom staan de vertoningen in een list en niet in een dict met de titel als key?", o: ["Eén film kan meerdere vertoningen hebben, dus de titel is niet uniek", "Een dict kan geen objecten bevatten", "Een list is altijd sneller", "Vertoningen hebben geen titel"], a: 0, e: "Een tweede vertoning van dezelfde film zou de eerste overschrijven." },
        { q: "Wat moet `get_movie_by_title` teruggeven als de film niet bestaat?", o: ["None", "Een ValueError", "Een lege string", "Een leeg Movie-object"], a: 0, e: "Met self.__movies.get(title) krijg je None zonder KeyError." },
        { q: "Een Screening heeft capaciteit 120 en er zijn 45 tickets verkocht. Wat geeft `get_available_seats()`?", o: ["75", "45", "120", "165"], a: 0, e: "Beschikbare plaatsen = capaciteit − verkochte tickets." },
        { q: "Er zijn nog 5 plaatsen vrij en je roept `sell_tickets(10)` op. Wat moet er gebeuren?", o: ["Een ValueError, en het aantal verkochte tickets blijft ongewijzigd", "Er worden 5 tickets verkocht", "Er worden 10 tickets verkocht", "De methode geeft False terug"], a: 0, e: "Controleer eerst of er genoeg plaatsen zijn en verhoog pas daarna." },
        { q: "Wat is `parts[2]` na deze code?", code: 'line = "MOVIE - Interstellar - 2014 - 169 - Science Fiction\\n"\nparts = line.strip().split(" - ")', o: ["'2014' (een string)", "2014 (een int)", "'Interstellar'", "'169'"], a: 0, e: "split geeft strings. Zet jaar en duur om met int()." },
        { q: "Waarom splits je op `\" - \"` (met spaties) en niet op `\"-\"`?", o: ["De datum 2026-10-12 bevat zelf streepjes en zou anders ook gesplitst worden", "split werkt niet met één teken", "De spaties zijn verplicht in Python", "Anders wordt de newline niet verwijderd"], a: 0, e: "Bovendien blijven er anders spaties aan elk deel hangen." },
        { q: "Wat gebeurt er als je `strip()` vergeet bij het inlezen van een regel?", o: ["Het laatste deel eindigt op een newline", "Het eerste deel begint met een spatie", "De regel wordt overgeslagen", "split geeft een fout"], a: 0, e: "Bij een film is het genre dan bv. 'Action\\n', en een vergelijking of de uitlijning loopt mis." },
        { q: "Waarom moet `display_cinema()` een string teruggeven in plaats van enkel te printen?", o: ["Zodat dezelfde string ook naar een bestand geschreven kan worden", "Omdat print niet werkt in een methode", "Omdat een methode altijd iets moet teruggeven", "Omdat print geen f-strings ondersteunt"], a: 0, e: "write_cinema_details gebruikt het resultaat van display_cinema()." },
        { q: "Welke regel schrijft het overzicht correct naar een bestand?", o: ["with open(file_name, \"w\", encoding=\"utf-8\") as file: file.write(self.display_cinema())", "with open(file_name, encoding=\"utf-8\") as file: file.write(self.display_cinema())", "open(file_name).print(self.display_cinema())", "with open(file_name, \"r\") as file: file.read(self.display_cinema())"], a: 0, e: "Schrijven vraagt mode 'w'. Zonder mode open je het bestand om te lezen." },
        { q: "Uitbreiding: capaciteit 200, verkocht 150. Wat geeft `get_occupancy_percentage()`?", o: ["75", "0.75", "50", "133"], a: 0, e: "150 ÷ 200 × 100 = 75." },
        { q: "Uitbreiding: hoe zorg je dat een ongeldige ticketverkoop het programma niet laat crashen?", o: ["De oproep van sell_tickets in een try-blok zetten en de ValueError opvangen met except", "De raise uit sell_tickets verwijderen", "Het bestand openen met mode 'a'", "Een return toevoegen na de raise"], a: 0, e: "De validatie blijft bestaan; de fout wordt opgevangen waar het bestand gelezen wordt." },
        { q: "Uitbreiding `remove_movie(title)`: waar moet je aan denken?", o: ["Eerst controleren of de titel in de dict zit, anders geeft pop een KeyError", "Dat je een film nooit uit een dict kan verwijderen", "Dat je remove() moet gebruiken zoals bij een list", "Dat je de dict eerst moet sorteren"], a: 0, e: "Gebruik `if title in self.__movies:` en daarna pop(title)." },
        { q: "Welke validatie hoort bij het jaar van een Movie?", o: ["Een int en minstens 1888", "Een int groter dan 0", "Een string van 4 tekens", "Tussen 0 en 10"], a: 0, e: "Tussen 0 en 10 is de regel voor de rating; groter dan 0 voor de duur." }
      ]
    }
  ]
});
