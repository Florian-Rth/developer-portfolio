# Portfolio Implementation Prompts

Status: working foundation for coding-bot / future worker runs

Purpose of this file:
- consolidate all relevant implementation prompts for the portfolio redesign in one place
- replace missing chat context
- give future agent runs enough context so they do not have to guess
- document the agreed order, design direction, and boundaries for each phase

Important:
- this file is **not** the queue itself and **not** a task log
- it is the reference document for future coding-bot tasks
- each worker should still only take **one** clearly scoped task from here

---

# 0. Project Context

## Project
- Repository / project path: `~/clawd/projects/developer-portfolio`
- Preview typically runs on port `8090`
- The portfolio already has a strong foundation in several sections
- The goal is **not** a full restart, but a targeted redesign toward a higher visual level

## Existing decisions that must be respected
- The Skills section (TCG / pack / cards) is already a deliberate core idea and is implemented
- The Projects section already has a strong bento / artwork / motion direction
- Because of that, this redesign should not blindly reinvent everything; it should prioritize the biggest leverage points
- Theme-aware SVGs should respect existing color variables, especially `var(--card)` where relevant
- `overflow: hidden` on sections can clip annotations or freer decorative layers; those interactions must be checked intentionally

## Important history
- Phase 5 (Journey) was removed and stays removed
- Skills is not throwaway gimmickry; it is a deliberate differentiation point
- Projects already has showcase quality and needs hierarchy / surface / polish work more than a full concept reset

Long-term-memory sources:
- Portfolio context: `MEMORY.md#L121-L136`
- About planning / freer composition: `memory/2026-02-18.md#L1-L32`
- Skills context: `memory/2026-02-25.md#L1-L15`
- Projects context: `memory/2026-03-10.md#L1-L37`

---

# 1. Second Brain References

These notes are part of the working foundation and should be read before larger redesign tasks:

- **Visual QA reference screens**
  - ID: `1773927916576-l5wq54kba`
  - Contains the edited reference images for each section
  - These images are the visual anchor for later QA

- **Final Section Specs**
  - ID: `1773933010656-b6v57wh0q`
  - Contains the final target description for each section

- **Hero Typo F Technical Direction**
  - ID: `1773933010659-qr69s2nmf`
  - Contains the technical decision for the hero “F”

- **Redesign Order / Execution Plan**
  - ID: `1773937732860-0vhw8f4ds`
  - Contains the agreed implementation order

If a worker only handles one sub-phase, it should still read at least the notes relevant to that phase.

---

# 2. Global Design Direction

## Target feeling
The portfolio should feel:
- warm
- editorial
- premium
- confident
- creative, but not chaotic
- technically strong, but not cold

## Design principles
- warm cream / beige base
- coral / lavender as accent colors
- clear, high-quality typographic hierarchy
- large soft radii
- subtle depth instead of loud glassmorphism theatrics
- soft shadows, border-light, haze / glow used sparingly and intentionally
- CTA hierarchy must be obvious
- less “empty space with no role,” more controlled tension

## Not wanted
- generic SaaS look
- hard neon / gaming aesthetics
- exaggerated 3D / WebGL effect-show
- a brand-new visual language for every section
- major refactors without a clear visual payoff

---

# 3. Implementation Order

Agreed order:

1. Shared design primitives / section system
2. Home layout + hierarchy rebuild
3. Hero Typo-F
4. About composition rebuild
5. About detail polish
6. Contact layout + card rebuild
7. Contact CTA / trust polish
8. Projects hierarchy + card polish
9. Skills readability + premium polish
10. Full-page visual QA pass against the reference screens

Important consequence:
- the Hero-F is a **separate specialist task**
- Skills and Projects are **not** the first sections to be rebuilt
- first foundation, then the biggest perception levers

---

# 4. Tool Strategy

## OpenClaw
Prefer for:
- small to medium targeted changes
- CSS / layout / spacing / styling
- controlled polish work
- refining existing components
- QA / regression fixes

## Codex
Prefer for:
- clearly scoped multi-file rebuilds
- larger recomposition tasks
- structured layout overhauls
- headless worker runs with a hard scope

Recommended Codex headless command:
```bash
codex exec --full-auto --skip-git-repo-check -C /path/to/project 'Task'
```

Important:
- do not use the interactive default CLI for worker runs
- always state scope, boundaries, and verification explicitly
- avoid giant prompts

---

# 5. Rules for Every Future Worker

Every later worker should implicitly follow these rules:

1. **Never work on `main`**
2. Create a dedicated branch appropriate for the task type
3. Handle exactly **one** scope
4. Read the relevant references from Second Brain / repo before implementing
5. If Codex or OpenClaw cannot run cleanly, block honestly instead of improvising
6. After finishing:
   - run build / tests / reasonable verification
   - write a relevant MEMORY note
   - document open points honestly
7. For visual tasks:
   - “functionally done” is not enough
   - compare against the reference screens and target feeling

---

# 6. Phase 1 — Shared Design Foundation

## Goal
Create a shared visual foundation so later rebuilds do not drift apart stylistically.

## Why this phase comes first
Without a shared foundation, Home, About, Contact, Projects, and Skills will later feel inconsistent. This phase is meant to prevent that.

## Implementation Prompt (Master)

```text
Work in the project ~/clawd/projects/developer-portfolio.

Goal:
Build the shared visual foundation for the portfolio redesign. This is not a full section rebuild; it is the basis for later overhauls.

Before implementing, read at least these references:
- Redesign Order / Execution Plan: 1773937732860-0vhw8f4ds
- Final Section Specs: 1773933010656-b6v57wh0q
- Visual QA Reference Screens: 1773927916576-l5wq54kba

Additional context:
- Skills and Projects already have a strong base and should not be fully reinvented in this phase
- theme-aware SVGs should respect existing color variables, especially var(--card), where relevant
- the target system should feel warm, editorial, and premium

Scope:
1. Shared spacing rhythm / section vertical rhythm
2. Card surface system
   - radii
   - shadows
   - border-light / depth logic
   - subtle haze / glow layer if appropriate
3. Button hierarchy
   - clearly differentiate primary / secondary
4. Accent language
   - coral / lavender guidance
   - ambient gradient haze / glow utilities if useful
5. Header / badge / chip base language
6. Section layout foundation
   - max widths
   - paddings
   - wrappers

Do not:
- do a full Home rebuild
- build the Hero-F
- do a full About / Contact rebuild
- invent new Projects / Skills mechanics
- perform unnecessary global refactors without clear design value

Working style:
- first analyze the existing UI / styling architecture
- build on existing components / utilities / tokens when sensible
- place new shared primitives where later phases can reuse them
- prefer a few strong systemic improvements over scattered cosmetic tweaks

Verification:
- relevant tests if they exist and make sense
- npm run build must pass
- if real screenshot verification is not possible, document that explicitly

Wrap-up:
- document in MEMORY.md which foundation primitives were introduced or refined
- state honestly what was deliberately deferred to later phases
```

## Expected result
- a visible shared surface / spacing / CTA system
- reusable styles / components instead of one-off inline cosmetics
- stronger visual coherence as the base for later rebuilds

---

# 7. Phase 2 — Home Layout + Hierarchy Rebuild

## Goal
The hero section should immediately communicate:
- creative
- high-quality
- technically strong

Not just “nice,” but clearly art-directed.

## Core idea
The existing hero should evolve from a relatively calm / too-empty impression into a stronger two-column composition.

## Implementation Prompt (Master)

```text
Work in the project ~/clawd/projects/developer-portfolio.

Goal:
Rebuild the Home / Hero section based on the final spec and reference screens. The hero should become visually stronger, more dynamic, and more clearly hierarchized.

Read before implementation:
- Final Section Specs: 1773933010656-b6v57wh0q
- Visual QA Reference Screens: 1773927916576-l5wq54kba
- Redesign Order / Execution Plan: 1773937732860-0vhw8f4ds
- Hero F Technical Direction: 1773933010659-qr69s2nmf (at least broadly, so the right-side visual slot is prepared)

Target result:
- 2-column hero on desktop
- left: intro, name, positioning, CTAs
- right: clear visual slot for the Hero-F
- no longer too much dead air
- stronger CTA hierarchy
- subtle background layers (haze / waves / atmosphere)

Scope:
- restructure the hero layout
- sharpen headline hierarchy
- make the subline clearer and more present
- refine the CTA system
- intentionally prepare the right side for the later Hero-F
- adjust nav / top spacing only as far as it actually helps the hero

Do not:
- fully build the final Hero-F in this task if that is handled separately
- smuggle in major About / Contact / Projects / Skills redesigns
- add experimental effects that hurt readability

Key quality markers:
- the hero must not feel empty
- the right side needs a clear visual focus
- the left side must remain readable and clean
- the overall effect should be editorial + premium, not generic SaaS

Verification:
- npm run build
- capture a screenshot if possible
- compare against the reference screen for hierarchy, tension, CTA weighting, and overall composition

Wrap-up:
- document in MEMORY.md what was structurally changed in the hero
- if the visual slot for the Hero-F was prepared but not finalized, say so explicitly
```

---

# 8. Phase 3 — Hero Typo-F

## Goal
Build a clear signature object for the hero section.

## Decision already made
The hero “F” should be **neither a normal font glyph** nor a **full 3D WebGL showpiece** in V1.

Chosen direction:
- **Custom layered SVG / pseudo-3D**

## Implementation Prompt (Master)

```text
Work in the project ~/clawd/projects/developer-portfolio.

Goal:
Build the hero Typo-F as a deliberately designed signature object for the hero section.

Required reading before implementation:
- Hero Typo F Technical Direction: 1773933010659-qr69s2nmf
- Final Section Specs: 1773933010656-b6v57wh0q
- Visual QA Reference Screens: 1773927916576-l5wq54kba

Important prior decision:
- not a normal font-based F
- not heavy full 3D in V1
- instead: custom layered SVG / pseudo-3D

Desired construction:
- Front Face
- Side / Extrusion Face
- Shadow Mass
- Highlight Layer
- Ambient Glow / Haze
- optional accent shapes in the background

Design goal:
- strong even without animation
- premium rather than gimmicky
- coral / lavender / cream tonality matching the portfolio
- enough visual presence without overpowering the text

Animations:
1. Assemble-In on initial load
2. Slow idle float
3. Optional subtle light sweep
4. Optional very gentle pointer parallax on desktop

Do not:
- use normal text rendering of an F as a shortcut
- build an overblown WebGL showpiece
- add aggressive rotation
- add animation that hurts mobile performance

Technical direction:
- SVG with grouped layers
- integrate as its own hero component
- prefer controllable motion over effect overload
- handle reduced-motion sensibly

Verification:
- build passes
- check whether the F looks strong even in a static state
- on smaller breakpoints it must not break the hero

Wrap-up:
- document in MEMORY.md how the F is constructed and which motion was actually implemented
- state honestly what was intentionally left for later refinement
```

---

# 9. Phase 4 — About Composition Rebuild

## Goal
About should feel like a composed personal story section, not like a set of loose building blocks.

## Implementation Prompt (Master)

```text
Work in the project ~/clawd/projects/developer-portfolio.

Goal:
Rebuild the About section as a cohesive, personal, high-quality composition.

Read before implementation:
- Final Section Specs: 1773933010656-b6v57wh0q
- Visual QA Reference Screens: 1773927916576-l5wq54kba
- existing About spec in repo / Second Brain if available

Target result:
- Portrait + intro
- Quote / point of view
- Story + code window
- these pieces should function as one real composition

Scope:
- rebalance the About layout
- treat the portrait area as a real key element
- integrate the quote instead of leaving it isolated
- intentionally contrast the story block and code card
- unify spacing and visual weight

Do not:
- add random decorative elements with no compositional role
- force everything into stiff equal grid boxes
- do major cross-section renovations outside About

Verification:
- build passes
- if possible compare visually against the reference screen
- check whether About now reads like one cohesive composition

Wrap-up:
- update MEMORY.md: what changed in composition, portrait, quote, and code card?
```

---

# 10. Phase 5 — About Detail Polish

## Goal
Refine the big About rebuild without exploding the scope again.

## Implementation Prompt (Master)

```text
Work in the project ~/clawd/projects/developer-portfolio.

Goal:
Polish the About section after the composition rebuild.

Read before implementation:
- Final Section Specs: 1773933010656-b6v57wh0q
- Visual QA Reference Screens: 1773927916576-l5wq54kba
- current About implementation in the active branch

Focus:
- portrait presentation
- quote integration
- experience badge
- code card as a higher-quality design object
- small spacing / surface / typography corrections

Do not:
- redo the whole layout if that already happened in Phase 4
- touch unrelated sections

Verification:
- build passes
- visibly higher quality level in the About details

Wrap-up:
- extend MEMORY.md with the concrete polish decisions
```

---

# 11. Phase 6 — Contact Layout + Card Rebuild

## Goal
Contact should become a real conversion endpoint, not a weak footer fade-out.

## Implementation Prompt (Master)

```text
Work in the project ~/clawd/projects/developer-portfolio.

Goal:
Rebuild the Contact section so it has a stronger closing effect and a more substantial right-hand card.

Read before implementation:
- Final Section Specs: 1773933010656-b6v57wh0q
- Visual QA Reference Screens: 1773927916576-l5wq54kba

Target result:
- left: strong emotional closing headline
- right: more substantial contact card
- clearer form / message structure
- noticeably stronger end-of-page feeling

Scope:
- rebalance the split layout
- significantly strengthen the contact card
- sharpen inputs / form structure / message module
- prepare clear CTA priority

Do not:
- stop at a purely cosmetic footer touch-up
- add unnecessary form complexity without value

Verification:
- build passes
- contact area feels clearly more complete and more premium

Wrap-up:
- extend MEMORY.md with layout / card rebuild decisions
```

---

# 12. Phase 7 — Contact CTA / Trust Polish

## Goal
Tune the Contact section for conversion and credibility.

## Implementation Prompt (Master)

```text
Work in the project ~/clawd/projects/developer-portfolio.

Goal:
Polish the Contact section after the core rebuild.

Read before implementation:
- Final Section Specs: 1773933010656-b6v57wh0q
- Visual QA Reference Screens: 1773927916576-l5wq54kba

Focus:
- CTA hierarchy
- trust signals
- social integration
- focus / success states
- form quality in detail

Do not:
- do another full Contact rebuild
- add features that do not improve conversion value

Verification:
- build passes
- CTA hierarchy is clear
- Contact reads like a real ending, not like a leftover block

Wrap-up:
- extend MEMORY.md with trust / CTA polish decisions
```

---

# 13. Phase 8 — Projects Hierarchy + Card Polish

## Goal
Projects should feel even more like a showcase and less like “just a grid with cards.”

## Important
Projects is already strong. This phase is **refinement**, not a concept reset.

## Implementation Prompt (Master)

```text
Work in the project ~/clawd/projects/developer-portfolio.

Goal:
Polish the Projects section without destroying the existing strong bento / artwork / motion DNA.

Read before implementation:
- Final Section Specs: 1773933010656-b6v57wh0q
- Visual QA Reference Screens: 1773927916576-l5wq54kba
- History / Projects context: memory/2026-03-10.md#L1-L37

Focus:
- calm the header / subtitle
- sharpen featured hierarchy
- polish card surface / padding / information architecture
- improve artwork framing
- refine hover / depth / showcase quality

Do not:
- do a full Projects relaunch
- throw away the already strong motion / artwork direction

Verification:
- build passes
- compare visually against the reference screens and current quality
- avoid regressions in existing dialog / expand / motion flows

Wrap-up:
- extend MEMORY.md with the exact hierarchy / card polish changes
```

---

# 14. Phase 9 — Skills Readability + Premium Polish

## Goal
Keep the strong TCG idea, but improve recruiter readability and premium feel.

## Important
Skills is established. This phase is intentionally **refinement**, not reinvention.

## Implementation Prompt (Master)

```text
Work in the project ~/clawd/projects/developer-portfolio.

Goal:
Refine the Skills section without losing the TCG / pack identity.

Read before implementation:
- Final Section Specs: 1773933010656-b6v57wh0q
- Visual QA Reference Screens: 1773927916576-l5wq54kba
- Skills context: memory/2026-02-25.md#L1-L15

Focus:
- better scanability
- categories / chips / recruiter layer
- card stack materiality
- mobile sanity pass
- better instruction copy

Do not:
- invent a completely new interaction mechanic
- sacrifice the strong existing TCG identity
- add chaotic motion experiments

Verification:
- build passes
- think through desktop + mobile
- Skills should become easier to understand even without long interaction

Wrap-up:
- extend MEMORY.md with readability / polish decisions
```

---

# 15. Phase 10 — Full-Page Visual QA Pass

## Goal
After the content-heavy redesign work, calibrate the entire page against the reference screens.

## Implementation Prompt (Master)

```text
Work in the project ~/clawd/projects/developer-portfolio.

Goal:
Run a visual QA pass across the whole page and align the implemented site against the reference screens.

Required references:
- Visual QA Reference Screens: 1773927916576-l5wq54kba
- Final Section Specs: 1773933010656-b6v57wh0q

Working style:
- capture current screenshots of the page
- compare section by section against the references
- identify and fix deviations deliberately
- focus on:
  - hierarchy
  - spacing
  - card depth
  - typographic weighting
  - CTA presence
  - overall tension

Do not:
- hide large scope explosions inside the QA pass
- sneak in new concept changes

Verification:
- build passes
- screenshots / comparison documented cleanly

Wrap-up:
- extend MEMORY.md with the final QA corrections
- name any remaining differences honestly
```

---

# 16. Recommendation for Task Slicing

This file contains **master prompts**. For real worker runs, the rule still is:
- prefer 1 clear task per scope
- avoid giant orders like “redo the whole portfolio”
- always state build / verification explicitly
- if one step is blocked, do not silently jump to the next phase

Good slicing:
- one large rebuild = its own task
- one clear polish block = its own task
- specialist object like Hero-F = its own task

---

# 17. Quick Summary for Future Workers

If you only need the quick orientation:
- first foundation
- then Home
- then Hero-F
- then About
- then Contact
- refine Projects and Skills later
- always work against the reference screens and Final Section Specs
- do not guess when notes already exist

---

# 18. Open Infrastructure Notes

- If Codex is used, local auth must work
- If browser / screenshot verification is unavailable, document that honestly
- If dashboard / queue state looks inconsistent, do not silently improvise; document it cleanly

---

This file is the central working foundation for the next portfolio redesign phase.
