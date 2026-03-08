# Phase 7 MVP — Gemeinsame Grundlage für alle Versionen

## KRITISCHSTE ANFORDERUNG — LIES DAS ZUERST

**Das Pack enthält ALLE 15 Karten + die Hire Me Karte.**
Es gibt KEINE "5 random Karten + Rest erscheint magisch". Das war der Fehler der vorherigen Versionen.

Der Flow ist immer:
1. Besucher sieht das Pack
2. Besucher öffnet das Pack
3. ALLE Karten kommen heraus — das IST der Scattered State
4. Hire Me Karte kommt als letztes, speziell

**Kein zweiter Haufen. Kein mysteriöser Rest. Das Pack = alle Skills.**

---

## Projekt-Kontext

Portfolio für Florian Rätsch (Full Stack Dev, Leipzig).
- React + TypeScript + Vite
- Framer Motion bereits installiert
- Tailwind CSS mit warm pastel palette
- Biome für Linting (NICHT ESLint/Prettier!) → `npx biome check --write .`
- Compound Component Pattern (siehe CLAUDE.md)
- KEINE `any` TypeScript types

## Design-Sprache — PFLICHT

Das Portfolio hat eine warme, malerische, editorielle Ästhetik:
- Background: #F5F0E8 (warm beige) / Dark: #1A1816
- Lavender: #B8A9D4 / Peach: #E8B4A0 / Dusty Rose: #D4929B
- Fonts: DM Sans (body), Pacifico (accent/logo — font-script class)
- Warm, malerisch, Brushwork — NICHT dark/neon/gaming
- Das Pack und die Karten müssen sich wie Teil dieses warmen Portfolios anfühlen

## Pack-Design — Premium Holo-Effekt (ALLE Versionen)

Das Pack muss wie ein echtes Foil/Holo-Sammelkartenpack aussehen und sich anfühlen:

### Visuelle Layers (übereinander):
1. **Basis-Gradient**: Lavender → Peach → Dusty Rose (diagonal 135°)
2. **Brushwork-Textur**: Subtile SVG-Pinselstriche/Linien als overlay (opacity 0.15)
3. **Specular Highlight**: Weißer ovaler Glanzpunkt, bewegt sich mit Maus (wie Licht auf Glas)
4. **Conic Shimmer**: `conic-gradient` mit Pastell-Farben, rotiert mit Maus-X (irisierend)
5. **Fresnel Rand**: Gradient-border der am Rand heller wird (wie bei echten Foil-Karten)
6. **"FlorianRth"** Text in Pacifico, zentriert, mit Gradient-Fill

### Maus-Reaktivität:
```typescript
// Auf mousemove über dem Pack:
// 1. Pack tiltet in 3D: rotateX(mouseY * -15deg) rotateY(mouseX * 15deg)
// 2. Specular highlight verschiebt sich zu Maus-Position
// 3. Conic-gradient Startwinkel = mouseX * 360deg
// CSS Custom Properties: --mouse-x, --mouse-y (0-1), --tilt-x, --tilt-y
```

## Hire Me Karte

Spezielle Karte, kein normaler Skill:
- Rarity: legendary (voller Holo-Shimmer)
- Name: "Hire Me"
- Subtitle: "Florian Rätsch"
- Category: "✦ CONTACT"
- Artwork: Abstraktes CSS/SVG — goldener Gradient-Hintergrund, stilisierte Silhouette ODER abstrakte Geometrie in Portfolio-Farben. Malerisch, warm. Kein Foto.
- Stats: Availability 100 / Communication 95 / Culture Fit 98 / Code Quality 97
- Flavour Text (Pacifico): "Let's build something great."
- CTA Button: "Get in Touch" → scrollt zu `#contact`
- Kommt IMMER als letzte Karte heraus, mit besonderer Animation (goldener Flash/Glow)

## Was NICHT gebaut werden soll

- Keine "5 random Karten" Mechanik
- Kein localStorage Skip (erstmal, zu komplex)
- Keine Combo-Easter-Eggs
- Keine Sound-Effekte
- Tests für die neuen Komponenten schreiben

## Fertigkeitskriterien

- [ ] `npm run build` ohne Fehler
- [ ] `npm run test -- --run` — neue Komponenten getestet
- [ ] Pack hat mouse-reaktiven Holo/Shimmer-Effekt
- [ ] Alle 15 Karten + Hire Me kommen beim Öffnen heraus
- [ ] Kein zweiter Karten-Haufen nach dem Opening
- [ ] Smooth, polished — keine ruckelnden Animationen

## Abschluss

Commit mit Message: `feat: phase-7 pack-opening [v4/v5/v6]`
Dann: `openclaw system event --text "Phase 7 [VERSION] fertig: [kurze Beschreibung]" --mode now`
