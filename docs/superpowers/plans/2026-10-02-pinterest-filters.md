# Pinterest-like Filters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the home page chip row with Pinterest-style photo pills in a sticky bar, plus refinement pills that narrow search results.

**Architecture:** A shared `PhotoPill` renders both category and refinement pills. Category photos come from a curated constant map; refinements come from a pure function over the current search results. `refine` is a new URL filter applied client-side in `useDrinks`; `FilterBar` becomes `position: sticky` under the app bar, offset by a measured app bar height.

**Tech Stack:** React 19, TypeScript, MUI 9, React Router 7, TanStack Query 5, Vite+ (`vp`), Node 24 (native type stripping for the one-off script).

**Spec:** `docs/superpowers/specs/2026-10-02-pinterest-filters-design.md`

## Global Constraints

- Builds on the uncommitted redesign in this worktree (`UtilsContext` filters, `useDrinks` sources, `FilterBar`). Do not revert any of it.
- Light theme only; colors from the theme palette (`primary.main`, `background.paper`, `background.default`, `divider`), no new hex literals.
- No new dependencies, no backend, no extra API requests for photos or refinements.
- Thumbnail URL format: `https://www.thecocktaildb.com/images/media/drink/<file>/small`.
- Refinement rules: split on non-letters (Unicode letters kept); drop words < 3 letters, query words, and `the`, `and`, `with`, `de`, `of`; count once per drink; sort count desc then word A–Z; max 8; return `[]` if fewer than 2.
- No tests are added (AGENTS.md). Verification is `vp check`, `vp build`, one scratchpad script run, and browser checks against `vp dev`.
- Commits only when the user asks; commit steps below run only then.

## Review Focus

1. **Refine word not in current pills** (stale link, or the search changed under a back/forward step): the pill still shows first, selected, and clearing it works. Pinned in Task 3 browser check.
2. **Header wraps on phones** (taller app bar): the bar sticks directly under it with no gap or overlap. Pinned in Task 2 browser check.
3. **Thumbnail fails to load** (offline, CDN hiccup): pill keeps its label and shows the fallback icon, no broken-image glyph. Pinned in Task 1 browser check.
4. **Accented or punctuated names** ("Kahlúa", "Lassi - Mango", "B-52"): words split correctly; "B-52" yields no word (too short); "Kahlúa" stays one word. Pinned in Task 3 script check.
5. **`refine` without `search`** (`/?refine=fizz`): ignored; default Cocktail list shows; no refine row. Pinned in Task 3 browser check.

---

### Task 1: Photo pills for categories

**Files:**

- Create: `src/lib/categoryPhotos.ts`, `src/components/PhotoPill.tsx`
- Modify: `src/pages/HomePage/FilterBar.tsx`, `AGENTS.md`

**Interfaces:**

- Produces:
  - `getCategoryPhoto(category: string): string | null`
  - `PhotoPill(props: { label: string; image?: string | null; icon?: ReactNode; selected: boolean; onClick: () => void }): JSX.Element`

- [ ] **Step 1: Create `categoryPhotos.ts`** with the 11-row map from spec §1 (category → file name) and `getCategoryPhoto` building the full `/small` URL, `null` for unknown categories.
- [ ] **Step 2: Create `PhotoPill`** per spec §1 "PhotoPill": `ButtonBase` with `aria-pressed`, 40px pill, 28px leading circle (`img` with `alt=""`, `loading="lazy"`, `onError` → switch to `icon` via local state), unselected/selected styles, hover lift, `:focus-visible` outline in `primary.main`.
- [ ] **Step 3: Swap chips in `FilterBar`.** Replace the category `Chip`s with `PhotoPill`s: "All" uses `<AppsIcon />`, categories use `getCategoryPhoto(strCategory)` with `<LocalBarIcon />` fallback. Keep selection logic and `handleCategory`. Change category skeletons to `variant="rounded"` 120×40 with `borderRadius: 999`. Remove the now-unused `Chip` import.
- [ ] **Step 4: Add `PhotoPill`** to the shared components table in `AGENTS.md` ("Pill button with round photo or icon").
- [ ] **Step 5: Verify.** `npx vp check` → pass. Browser at 1280px: all 11 category photos render (`[...document.querySelectorAll('nav img')].every(i => i.complete && i.naturalWidth > 0)` → `true`); clicking Shot selects it and filters; `aria-pressed="true"` on the selected pill. Review Focus 3: in devtools-free form, run `document.querySelector('nav img').dispatchEvent(new Event('error'))` and confirm that pill now shows the icon and its label.
- [ ] **Step 6: Commit (only if asked):** `feat(filters): add photo pills for categories`.

### Task 2: Sticky filter bar

**Files:**

- Create: `src/hooks/useStickyOffset.tsx`
- Modify: `src/pages/HomePage/FilterBar.tsx`

**Interfaces:**

- Produces: `useStickyOffset(): number` — current app bar height in px; initial `64`; tracks `document.querySelector("header.MuiAppBar-root")` with `ResizeObserver`, disconnects on unmount.

- [ ] **Step 1: Create `useStickyOffset`.**
- [ ] **Step 2: Make `FilterBar` sticky** per spec §1 "Sticky bar": root `position: "sticky"`, `top: offset`, `zIndex: theme.zIndex.appBar - 1`, `bgcolor: alpha(theme.palette.background.default, 0.92)`, `backdropFilter: "blur(8px)"`, `mx: { xs: -2, sm: -3 }`, `px: { xs: 2, sm: 3 }`, `py: 1.5` (matches `Container` gutters). Render a 1px sentinel `Box` immediately before the bar; an `IntersectionObserver` with `rootMargin: \`-${offset + 1}px 0px 0px 0px\``sets`isStuck`when the sentinel leaves;`borderBottom: 1, borderColor: isStuck ? "divider" : "transparent"`.
- [ ] **Step 3: Fade the pill row edge.** On the pill `ul`: hide scrollbar (`scrollbarWidth: "none"`, `"&::-webkit-scrollbar": { display: "none" }`) and `maskImage: "linear-gradient(to right, black calc(100% - 32px), transparent)"` only when `scrollWidth > clientWidth` (measured in a `ResizeObserver` or on render via ref + state).
- [ ] **Step 4: Verify.** `npx vp check` → pass. Browser at 1280px: scroll 1500px → bar's `getBoundingClientRect().top` equals app bar height (±1), bottom border visible; scroll back to 0 → border transparent. At 375px (header wraps to two rows): same `top` equality with the taller header (Review Focus 2); no horizontal page scroll; pill row fades on the right.
- [ ] **Step 5: Commit (only if asked):** `feat(filters): make filter bar sticky`.

### Task 3: Refinement pills

**Files:**

- Create: `src/lib/refinements.ts`
- Modify: `src/contexts/UtilsContext.tsx`, `src/hooks/useDrinks.tsx`, `src/components/Header.tsx`, `src/pages/HomePage/FilterBar.tsx`, `src/pages/HomePage/NoResults.tsx`, `src/pages/HomePage.tsx`

**Interfaces:**

- Consumes: `PhotoPill` (Task 1); `Filters`, `updateFilters` from `UtilsContext`.
- Produces:
  - `interface Refinement { word: string; label: string; image: string; count: number }`
  - `getRefinements(drinks: Pick<Drink, "strDrink" | "strDrinkThumb">[], search: string): Refinement[]`
  - `splitWords(text: string): string[]` (exported; lowercase words, used by `useDrinks` too)
  - `Filters.refine: string`; `useDrinks()` adds `searchResults: DrinkListItem[]`
  - `FilterBar` props become `{ count: number | null; searchResults: DrinkListItem[] }`

- [ ] **Step 1: Write `refinements.ts`.** Only `import type` from `@/types/Drink` so Node can run it with type stripping. `splitWords` uses `text.toLowerCase().split(/[^\p{L}]+/u).filter(Boolean)`. Apply the Global Constraints rules; `label` is the word's casing as it first appears in a name (re-split the original name with the same regex, without lowercasing).
- [ ] **Step 2: Check it against live data** with a scratchpad script (not committed):

```js
// <scratchpad>/check-refinements.mjs
import { getRefinements, splitWords } from "<worktree>/src/lib/refinements.ts";
const res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin").then((r) =>
	r.json(),
);
const out = getRefinements(res.drinks, "gin");
console.log(out.map((r) => `${r.label}:${r.count}`).join(" "));
console.log(JSON.stringify(splitWords("Kahlúa B-52 Lassi - Mango")));
```

Run: `node <scratchpad>/check-refinements.mjs`
Expected: first line starts `Fizz:3 Smash:2 Tonic:2`, then single-count labels A–Z, 8 total. Second line `["kahlúa","b","lassi","mango"]` (Review Focus 4; "b" is dropped later by the length rule).

- [ ] **Step 3: Add `refine` to `UtilsContext`.** `Filters.refine` read from the `refine` param, lowercased; add to `FILTER_KEYS` after `alcoholic`.
- [ ] **Step 4: Apply it in `useDrinks`.** Compute `searchResults` = combined data when `filters.search` is set, else `[]`. Then `data` = `searchResults` filtered by `splitWords(drink.strDrink).includes(filters.refine)` when both `search` and `refine` are set; otherwise unchanged. Return `searchResults` alongside existing fields.
- [ ] **Step 5: Clear on new search.** In `Header`'s `handleSearch`: `updateFilters({ search, refine: "" })`.
- [ ] **Step 6: Render the refine row** in `FilterBar` (third row, only when `filters.search` and the pill list has ≥ 2 entries or `filters.refine` is set): caption "Refine" (`variant="caption"`, `text.secondary`), then `PhotoPill`s from `getRefinements(searchResults, filters.search)`. If `filters.refine` isn't among them, prepend `{ word: refine, label: refine capitalised, image: "", count: 0 }` shown selected with `<SearchIcon />` fallback. Tap → `updateFilters({ refine: selected ? "" : word })`. `HomePage` passes `searchResults` from `useDrinks`.
- [ ] **Step 7: `NoResults`** — append `` `refined by "${refine}"` `` to the description list when `search && refine`.
- [ ] **Step 8: Verify.** `npx vp check` and `npx vp build` → pass. Browser (1280px and 375px):
  - Search "gin" → refine row starts Fizz, Smash, Tonic; count "20 drinks".
  - Tap Fizz → "3 drinks", URL contains `refine=fizz`, pills still visible with Fizz selected; tap Fizz → "20 drinks", `refine` gone; Back → `refine=fizz` again.
  - Type a new search "rum" → URL has no `refine`.
  - `/?search=gin&refine=zzz` → "zzz" pill shown first, selected; no-results text includes `refined by "zzz"`; tapping it clears (Review Focus 1).
  - `/?refine=fizz` → default Cocktail list, no refine row (Review Focus 5).
- [ ] **Step 9: Commit (only if asked):** `feat(search): add refinement pills`.
