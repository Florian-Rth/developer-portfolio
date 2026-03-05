# Phase 7 — Interactive Pack Tear Mechanic

## Übersicht

Ersetze den simplen "Click to open"-Button durch eine interaktive Scissor-Tear-Mechanik.

## Was gebaut werden soll

### 1. PackTearInteractive.tsx (neue Komponente)

Die Pack-Grafik zeigt eine sichtbare Perforationslinie und reagiert auf eine Maus-Drag-Interaktion
wie das Aufschneiden mit einer Schere.

#### Visueller Aufbau (alle Layer im Überblick):

**Pack-Körper:**
- Identisch mit PackGraphic: Gradient-Hintergrund, Brushwork-Textur, Conic-Shimmer,
  Specular Highlight, Fresnel Border — alles mouse-reaktiv (tilt + shimmer)
- Abmessungen: 260×380px

**Perforations-Linie (immer sichtbar solange Tear-Progress < 1):**
- Position: horizontal, bei y = 28% der Pack-Höhe ≈ 107px von oben
- Aussehen: gestrichelte Linie (SVG `stroke-dasharray="4 6"`)
  Farbe: `rgba(255,255,255,0.45)` mit leichtem Glow (`filter: blur(0.5px)`)
- Links außen (x=-20): Scissors-Icon `✂` in kleiner weißer Schrift (font-size: 14px)
  leicht rotiert (-45deg) damit die Schere in Schneid-Richtung zeigt
- Rechts außen (x=280): kleines Pfeil-Icon `→` oder gestrichelt auslaufend
- Hover auf Tear-Zone (horizontaler Streifen ±20px um die Linie): cursor: `crosshair`

**Interaktions-Zone:**
- Ein unsichtbarer `<div>` der die gesamte Pack-Breite und ±25px um die Tear-Linie abdeckt
- pointerdown → starte Tear-Interaktion (NUR wenn Maus im linken Drittel startet, x < 35%)
- pointermove → update tearProgress
- pointerup → wenn progress > 0.8: auto-complete; sonst: interaktion abbrechen

**Progressive Tear-Visualisierung (SVG overlay):**

```
SVG viewBox="0 -20 260 50" absolute positioniert über der Tear-Zone
```

Layer 1 — Tear-Glow (unter der Linie, wächst mit Progress):
- `<clipPath id="tearClip">`: rechteckiger Clip der von x=0 bis x=(tearProgress * 260) geht
- Breiter Glow-Pfad: gezackter Pfad (siehe unten), stroke-width=16,
  Farbe: `rgba(255,240,200,0.6)`, filter: blur(8px), geclippt auf tearClip
- Wird breiter (stroke-width 6 → 24) mit steigendem tearProgress

Layer 2 — Tear-Linie selbst:
- Der gleiche gezackte Pfad, stroke-width=2, Farbe: `rgba(255,253,249,0.95)`
- Ebenfalls geclippt auf tearClip (erscheint von links nach rechts)
- Leichtes `filter: drop-shadow(0 0 3px rgba(255,255,255,0.8))`

**Gezackter Tear-Pfad** (feste Kurve, nicht random — sieht organisch aus):
```
M0,0 C15,-8 25,0 40,-6 C55,-12 65,2 80,-5 C95,-12 105,6 120,-4
C135,-14 145,4 160,-8 C175,-12 185,3 200,-6 C215,-9 225,5 240,-2 L260,0
```
(Bezier-Kurven = smoother als gerade Zacken)

**Light Leak (folgt dem Tear-Fortschritt):**
- Absolute positioned `<div>` auf dem Pack
- Position: x = tearProgress * packWidth, y = tearLineY
- Hintergrund: `radial-gradient(ellipse 60px 120px at 50% 50%, rgba(255,250,235,0.9), rgba(255,240,180,0.4) 40%, transparent 75%)`
- Opacity: `tearProgress * 0.9` (0 am Anfang, fast voll am Ende)
- Width/Height wächst mit tearProgress: `${40 + tearProgress * 80}px × ${80 + tearProgress * 160}px`
- mix-blend-mode: `screen`

**Scissors-Cursor Hint während des Tearens:**
- Wenn `isTearing === false` und Maus in der Tear-Zone und x < 35%:
  - Kleines animiertes Scissors-Icon das dem Cursor folgt (position: fixed)
  - Oder einfach CSS `cursor: crosshair`
- Wenn `isTearing === true`: Cursor auf `none` (Scissors bewegen sich mit)

#### State + Logik:

```typescript
const [tearProgress, setTearProgress] = useState(0);       // 0.0 → 1.0
const [isTearing, setIsTearing] = useState(false);
const [isComplete, setIsComplete] = useState(false);
const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });   // für Pack-Holo
```

pointerdown handler:
```typescript
// Nur starten wenn im linken Drittel des Packs
if (localX / packWidth > 0.35) return;
// Nur starten wenn nahe der Tear-Linie (±25px)
if (Math.abs(localY - TEAR_Y) > 25) return;
setIsTearing(true);
e.currentTarget.setPointerCapture(e.pointerId);
```

pointermove handler:
```typescript
if (!isTearing) return;
const progress = Math.min(1, Math.max(tearProgress, localX / packWidth));
setTearProgress(progress);
if (progress >= 0.92) completeTear();
```

completeTear():
```typescript
setIsTearing(false);
setIsComplete(true);
// Kurze Pause dann Callback
setTimeout(() => onTearComplete(), 350);
```

Wenn `isComplete === true`:
- Perforations-Linie und Scissors verschwinden
- Tear-Linie + Glow bleiben (maximal hell)
- Ein kurzer "Flash": weißes Overlay über dem Pack, opacity 0→0.7→0 in 300ms
- Dann: onTearComplete()

#### Props:
```typescript
type PackTearInteractiveProps = {
  onTearComplete: () => void;
};
```

---

### 2. PackBurstAnimation.tsx (neue Komponente)

Visuelle Animation die abläuft NACHDEM die Tear-Interaktion complete ist und BEVOR die
CardRevealPipeline startet. Entspricht dem bisherigen "tearing" Phase im Theater.

**Was zu sehen ist:**

A) Pack-Körper teilt sich (Framer Motion):
- Obere Hälfte (0 → tearLineY): fliegt nach oben + leicht nach hinten
  `initial: {y:0, rotateX:0}` → `animate: {y:-300, rotateX:-20, opacity:0}`
  duration: 0.7s, easeIn
- Untere Hälfte (tearLineY → packHeight): fliegt nach unten
  `initial: {y:0}` → `animate: {y:400, rotateX:15, opacity:0}`
  duration: 0.6s, easeIn

B) Karten-Stapel aus dem Pack (gleichzeitig mit A):
- 4 Karten-Silhouetten (einfache rounded rectangles, 130×185px,
  Farbe: `rgba(255,253,249,0.9)` mit Gradient-Border)
- Starten in der Mitte des Packs, übereinandergestapelt
- Burst nach oben: y: -60 → -600, leichte X-Variation (±30px), rotation (±15deg)
- Staggered: 0ms, 60ms, 120ms, 180ms delay
- Spring physics: stiffness:180, damping:20
- Fade out bei y > -300 (opacity: 1 → 0 beim Fliegen)

C) Licht-Burst aus dem Riss:
- Kurzer screen-flash (weißes Overlay 0→0.5→0, 250ms)
- Danach wächst ein warmer Glow von der Tear-Line aus: radial gradient, scale 0→3, fade 0→1→0

D) Timeline:
```
0ms:    A + B + C starten gleichzeitig
600ms:  Animation fast fertig
700ms:  onBurstComplete() aufrufen → CardRevealPipeline startet
```

#### Props:
```typescript
type PackBurstAnimationProps = {
  onBurstComplete: () => void;
};
```

---

### 3. Integration in PackTheater.tsx

Neuer Phase-Flow:

```
idle → (interactive-tear: PackTearInteractive) → (bursting: PackBurstAnimation) → revealing → scattered
```

Konkret:
- Phase `idle`: zeige PackTearInteractive
  - onTearComplete → setPhase('bursting')
- Phase `bursting`: zeige PackBurstAnimation
  - onBurstComplete → rufe startReveal() auf (bestehende Logik aus useTheaterState)
  - startReveal() setzt phase='revealing' intern über useTheaterState
- Phase `revealing` + `scattered`: unverändert

Passe `useTheaterState.ts` entsprechend an:
- Entferne die interne 'tearing' phase (oder behalte sie, aber setze sie nie mehr)
- startReveal() kann direkt phase='revealing' setzen (Tear und Burst laufen extern)

---

### 4. Existierende Komponenten NICHT anfassen

- CardRevealPipeline.tsx: NICHT ANFASSEN (korrekte Logik)
- useTheaterState.ts: minimal anpassen (startReveal setzt direkt 'revealing')
- CardBack.tsx, HoloEffect.tsx, HireMeCard.tsx: NICHT ANFASSEN

---

### 5. Technische Notes

- Pointer Events (nicht Mouse Events) für drag: `onPointerDown`, `onPointerMove`, `onPointerUp`
  → `setPointerCapture(e.pointerId)` damit Drag auch außerhalb des Elements funktioniert
- `touch-action: none` auf der Interaktions-Zone
- SVG für Tear-Visualisierung (kein Canvas nötig)
- Framer Motion für PackBurstAnimation
- Alle neuen Komponenten in `src/components/SkillCards/PackTheater/`

---

### 6. Fertigkeitskriterien

- [ ] Perforations-Linie sichtbar auf dem Pack mit Scissors-Icon links
- [ ] Drag von links nach rechts: Tear erscheint progressiv
- [ ] Light Leak wächst mit Tear-Fortschritt
- [ ] Auto-Complete bei ~92% Fortschritt
- [ ] Flash + PackBurstAnimation spielt ab (Karten fliegen hoch, Pack fällt)
- [ ] CardRevealPipeline startet danach automatisch
- [ ] npm run build ohne Fehler

Wenn fertig:
`openclaw system event --text "Phase 7 Tear-Mechanic fertig: interaktives Aufschneiden, Burst-Animation, integriert in V6" --mode now`
