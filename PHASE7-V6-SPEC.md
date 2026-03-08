# Phase 7 — V6: "One-by-One Theater" (2D, Framer Motion, Sequenziell)

Lies zuerst PHASE7-BASE.md für gemeinsame Anforderungen!

## Konzept

**"Jede Karte hat ihren Auftritt."**

Das Pack öffnet sich — und statt einer großen Explosion kommen die Karten nacheinander heraus.
Jede Karte bekommt einen kurzen Spotlight-Moment: Sie zoomt zur Mitte, ihr Name leuchtet auf,
dann fliegt sie in ihre Position. Skills werden nicht gedumpt, sie werden vorgestellt.

Der Unterschied zu V4: V4 = ein großer WOW-Burst. V6 = 16 kleine WOW-Momente.

## Animation States

```typescript
type TheaterPhase =
  | 'idle'           // Pack schwebt, Holo-Effekt
  | 'tearing'        // Pack öffnet sich (500ms)
  | 'revealing'      // Karten kommen einzeln heraus + Spotlight
  | 'scattered'      // Alle platziert, interaktiv
```

## Phase: idle (Pack mit Spotlight-Bühne)

- Pack schwebt in der oberen Hälfte der Section
- Dahinter: ein subtiler Spot-Licht-Effekt (radial gradient, wie Bühnenbeleuchtung)
  `background: radial-gradient(ellipse at 50% 30%, rgba(184,169,212,0.15) 0%, transparent 70%)`
- Unterhalb: leerer "Bühnen-Bereich" wo die Karten später landen werden
- Maus-reaktiver Holo-Shimmer auf dem Pack (siehe BASE.md)
- CTA: "Open Pack ▶" in Pacifico

## Phase: tearing

Dauer: ~600ms

Sanfter als V4 — das Pack öffnet sich wie ein Umschlag:
1. Pack dreht sich leicht (rotateY 10deg) — wie man einen Brief umdreht
2. Obere Kante reißt auf: SVG clip-path animation zeigt einen gezackten Riss
   (path morphing von gerader Linie zu Zacken-Linie)
3. Aus dem Riss: warmes Licht leckt heraus (opacity 0→1, blurred radial gradient)
4. Das Licht pulsiert einmal hell → Übergang zu revealing

## Phase: revealing (Das Theater)

**Das Herzstück dieser Version.**

Karten kommen in dieser Reihenfolge heraus: Common → Uncommon → Rare → Epic → Legendary
(innerhalb jeder Rarity: random)
Hire Me Karte: ALLERLETZTES, als 17. "Karte"

### Für jede Karte (Dauer: ~1.2s pro Karte, aber overlapping → Gesamtdauer ~8-10s):

**Schritt 1 — Exit aus Pack (200ms):**
- Karte schießt aus dem Pack-Riss heraus (nach oben, mit rotation)
- Startet als Rückseite (CardBack sichtbar)

**Schritt 2 — Spotlight (400ms):**
- Karte bewegt sich zur Sektion-Mitte
- Skaliert auf ~1.3x
- Flip Animation: Rückseite → Vorderseite (300ms, CSS rotateY)
- Gleichzeitig: Spotlight-Glow hinter der Karte (scale 0→1, radial gradient)
- Der Rest der Section dimmt leicht (overlay mit opacity 0.2)
- Skill-Name erscheint groß darunter (DM Sans 700, gradient text, fade in)
- Rarity-Badge leuchtet auf

**Schritt 3 — Take your place (400ms):**
- Karte fliegt von der Mitte zu ihrer Scatter-Position (Framer Motion spring)
- Spotlight faded weg
- Section-Dim lifted
- Nächste Karte beginnt bereits ihren Schritt 1 (200ms overlap — smooth pipeline)

### Hire Me Karte (Special Entrance):

- Pause nach letzter Skill-Karte: 500ms (Spannung aufbauen)
- Text erscheint kurz in der Mitte: "✦" in gold fade in
- Pack leuchtet golden auf
- Hire Me Karte kommt heraus, geht in Spotlight
- Spotlight-Moment ist LÄNGER (800ms statt 400ms)
- "HIRE ME" Text erscheint in Gold + Pacifico (größer als normale Skill-Namen)
- Subtile Partikel (kleine goldene Punkte die aufsteigen) — CSS keyframe Animation
- Dann: Karte fliegt an ihren speziellen Platz (prominent, nicht ganz im Haufen)

### Overlap-Timing (damit es nicht ewig dauert):

```typescript
const CARD_DURATION = 1200 // ms pro Karte
const OVERLAP = 200        // nächste Karte startet 200ms vor Ende der aktuellen

// Card i startet bei: i * (CARD_DURATION - OVERLAP) ms
// Total für 15 Skills: 15 * 1000 = 15s (zu lang!)

// LÖSUNG: Parallele Pipeline
// Während Karte i in "Take your place" fliegt (400ms),
// beginnt Karte i+1 bereits mit "Exit aus Pack"
// Effektiv: ~600ms pro Karte = ~9-10s total für alle 15 + Hire Me
// Das ist OK — mit Skip-Button
```

### Skip-Button:

Wichtig weil 10s lang sein kann:
- Immer sichtbar während revealing: "Skip ⏭" in der Ecke
- Klick → alle Karten fliegen sofort zu ihren Positionen (keine Spotlights)
- Alle flippen gleichzeitig auf (kurze staggered flip, 50ms delay)

## Phase: scattered

- Alle Karten platziert, voll interaktiv (wie Phase 6)
- Hire Me Karte: pulsierender goldener Glow am Rand
- "↺ Watch again" Button → Reset + Replay (ohne Reload)
- Pack-Grafik: bleibt sichtbar aber kleiner (oben in der Ecke), als "geöffnet" Zustand

## Karten-Rückseite

Warm, lebendig:
- Hintergrund: `radial-gradient(ellipse at center, #FFFDF9, #F5F0E8)`
- "FR" in Pacifico, Gradient (Lavender → Dusty Rose → Peach), zentriert
- 8 dekorative Brush-Punkte in den Ecken (SVG circles, opacity 0.4)
- Dünner Gradient-Border
- Subtile shimmer animation (langsamer background-position loop → 5s)

## Foil/Holo Effekt

- Beim Spotlight-Moment: Holo-Shimmer auf der Karte ist MAXIMALE Intensität
  (das ist der beste Moment ihn zu sehen!)
- Im scattered state: normaler Holo (mouse tracking, Legendary voll, Epic dezent)

## Pack-Grafik (detaillierter als V4 weil länger sichtbar)

Das Pack muss sehr schön sein, da es ~10s lang prominent zu sehen ist:
- Höher-Auflösung SVG mit mehr Details
- Sichtbare "Dicke" durch einen Shadow-Layer der den Stapel andeutet
- Ein kleines Glow-Indicator am unteren Rand: "16 CARDS" in sehr kleiner Schrift
- Die Innenseite des Risses: weiß/golden glühend (wenn geöffnet)
- Animated inner glow: wenn Karten herauskommen, pulsiert das Licht aus dem Riss

## Dateistruktur

```
src/components/Skills/
├── PackTheater/
│   ├── PackTheater.tsx         # Haupt-Orchestrierung + State Machine
│   ├── PackGraphic.tsx         # Premium Pack SVG + Holo
│   ├── PackRip.tsx             # Riss-Animation (SVG path morphing)
│   ├── CardSpotlight.tsx       # Spotlight-Moment UI
│   ├── CardRevealPipeline.tsx  # Pipeline-Orchestrierung (overlap timing)
│   └── useTheaterState.ts      # State + Timing-Logic
├── CardBack.tsx
├── CardFlip.tsx
├── HoloEffect.tsx
├── HireMeCard.tsx
└── FullscreenCard.tsx
```

## Tests

- `useTheaterState.test.ts`: Reihenfolge korrekt (Common → ... → Legendary → Hire Me), Skip funktioniert
- `CardRevealPipeline.test.tsx`: alle 16 Karten werden durchlaufen
- `PackRip.test.tsx`: rendert SVG ohne Crash
- `HoloEffect.test.tsx`: korrekte Rarity-Checks

Fertig → `openclaw system event --text "Phase 7 V6 fertig: Theater-Reveal, jede Karte einzeln vorgestellt mit Spotlight, Holo-Effekte" --mode now`
