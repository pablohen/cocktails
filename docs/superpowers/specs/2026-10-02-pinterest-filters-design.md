# Pinterest-like filters — design

Date: 2026-10-02
Builds on: `docs/superpowers/specs/2026-10-02-artifact-redesign-design.md` (uncommitted in the same worktree)

## Goal

Make the home page filters look and behave like Pinterest's idea pills.

Success means:

- Category filters are pills with a small round drink photo.
- After a search, a row of refinement pills narrows the results in one tap.
- The filter bar stays pinned under the app bar while the grid scrolls.

## Decisions

| Topic             | Decision                                                                    |
| ----------------- | --------------------------------------------------------------------------- |
| Scope             | Photo pills + refinement pills + sticky bar, replacing the current chip row |
| Layout approach   | One sticky `FilterBar` on the home page (approach A)                        |
| Category photos   | Curated constant map, no extra requests                                     |
| Refinement source | Words from the current search results' names, computed client-side          |
| Refinement action | Narrow current results via a `refine` URL param; no new API request         |
| Refinement rule   | Single-use words allowed; ranked by frequency, then A–Z; cap 8; show if ≥ 2 |
| Theme / data      | Light only; free API; no backend; no new dependencies                       |

## 1. Photo pills and sticky bar

### Category photo map (`src/lib/categoryPhotos.ts`)

```ts
export function getCategoryPhoto(category: string): string | null;
```

Thumbnails use the API's `/small` size (verified 200 OK on 2026-10-02):

| Category            | Drink              | Thumbnail base (`…/images/media/drink/` + file + `/small`) |
| ------------------- | ------------------ | ---------------------------------------------------------- |
| Cocktail            | Mojito             | `metwgh1606770327.jpg`                                     |
| Ordinary Drink      | Gin Fizz           | `drtihp1606768397.jpg`                                     |
| Shot                | B-52               | `5a3vg61504372070.jpg`                                     |
| Coffee / Tea        | Irish Coffee       | `sywsqw1439906999.jpg`                                     |
| Beer                | Limona Corona      | `wwqrsw1441248662.jpg`                                     |
| Punch / Party Drink | Sangria            | `xrvxpp1441249280.jpg`                                     |
| Shake               | Avalanche          | `uppqty1472720165.jpg`                                     |
| Soft Drink          | Citrus Coke        | `uyrvut1479473214.jpg`                                     |
| Cocoa               | Drinking Chocolate | `u6jrdf1487603173.jpg`                                     |
| Homemade Liqueur    | Homemade Kahlua    | `uwtsst1441254025.jpg`                                     |
| Other / Unknown     | Lassi - Mango      | `1bw6sd1487603816.jpg`                                     |

Full URL: `https://www.thecocktaildb.com/images/media/drink/<file>/small`. A category not in the map returns `null`.

### `PhotoPill` (`src/components/PhotoPill.tsx`)

```ts
interface Props {
	label: string;
	image?: string | null; // photo URL; when absent, `icon` is shown
	icon?: ReactNode; // fallback, e.g. <AppsIcon /> for "All", <LocalBarIcon /> for unmapped
	selected: boolean;
	onClick: () => void;
}
```

- Rounded pill (`borderRadius: 999`), ~40px tall, `pl: 0.5`, `pr: 1.75`, gap 1.
- Leading 28px circle: `<img>` with `object-fit: cover`, `alt=""`, `loading="lazy"`; or the icon centered on `alpha(primary, 0.12)`.
- Unselected: `background.paper`, 1px `divider` border, hover lifts 1px with `boxShadow: 2`.
- Selected: `primary.main` background, `primary.contrastText` text, no border.
- Renders an MUI `ButtonBase` with `aria-pressed={selected}`; visible focus ring.
- Image load error swaps to the icon (or no leading circle when no icon).

### Sticky bar

- `FilterBar` root gets `position: sticky`, `top: <app bar height>`, `zIndex: appBar - 1`, background `alpha(background.default, 0.92)` with `backdropFilter: blur(8px)`, and horizontal negative margin + padding so it spans the `Container` width.
- A bottom `divider` border shows only while stuck. Detect with an `IntersectionObserver` on a 1px sentinel placed just above the bar.
- `useStickyOffset()` (`src/hooks/useStickyOffset.tsx`) returns the app bar's current height. It observes the `header.MuiAppBar-root` element with `ResizeObserver`; initial value 64.
- The pill row scrolls horizontally with hidden scrollbar and a right-edge fade (`mask-image` linear gradient) when it overflows.

### Bar rows

1. Category photo pills: "All" (icon), then categories from `useCategories` with `getCategoryPhoto`. Selection rules unchanged from the redesign (Cocktail selected in the default state; "All" selected only when another filter is set and category is empty).
2. Alcohol `ToggleButtonGroup` and result count (unchanged).
3. Refine row (section 2), only when present.

Loading and error states for categories stay as they are (skeleton pills, compact `Alert`); skeletons take the pill shape.

## 2. Refinement pills

### Data (`src/lib/refinements.ts`)

```ts
export interface Refinement {
	word: string; // lowercase, used in the URL
	label: string; // casing as first seen in a drink name, e.g. "Fizz"
	image: string; // thumbnail of the first drink whose name contains the word
	count: number; // drinks whose name contains the word
}

export function getRefinements(
	drinks: Pick<Drink, "strDrink" | "strDrinkThumb">[],
	search: string,
): Refinement[];
```

Rules:

- Split each name into words on any non-letter (Unicode letters kept, e.g. "Kahlúa").
- Drop: words of fewer than 3 letters; words equal to a query word (query split the same way, lowercased); stop words `the`, `and`, `with`, `de`, `of`.
- Count each word once per drink.
- Sort by `count` desc, then `word` A–Z. Return at most 8.
- Return `[]` when fewer than 2 refinements qualify (the row hides).

Reference outputs (live API, 2026-10-02): `"gin"` (20 results) → first three are Fizz (3), Smash (2), Tonic (2), then single-use words A–Z.

### URL and filtering

- `Filters` gains `refine: string` (URL param `refine`, lowercased on read). `FILTER_KEYS` adds `"refine"`.
- `refine` is ignored unless `search` is set.
- `useDrinks`:
  - Returns `searchResults`: the search results after category/alcohol filtering but before `refine` (empty array when no search). Refinements are computed from this so the pills don't collapse after a tap.
  - `data` additionally keeps only drinks whose name, split by the same rules, contains `refine`.
- Header search: `updateFilters({ search, refine: "" })`, so a new query clears the refinement.

### UI

- Third bar row: a small "Refine" caption, then `PhotoPill`s from `getRefinements(searchResults, filters.search)`.
- Tap → `updateFilters({ refine: word })`; tapping the selected pill → `updateFilters({ refine: "" })`.
- If the URL holds a `refine` word not among the current refinements, the row still lists it first as selected so it can be cleared.
- `NoResults` description adds `refined by "<word>"` when `refine` is active.

## Out of scope

- Masonry grid layout.
- Refinements without a search (e.g. inside a category list).
- Collapsing/hiding the bar on scroll direction.
- Dark mode.

## Verification

1. `vp check` and `vp build` pass.
2. One-off script run of `getRefinements` on the live `"gin"` search results matches the reference output (not committed; AGENTS.md says no tests).
3. Browser against `vp dev`, at 1280px and 375px:
   - Category pills show their photos; none broken; selecting works; selection is announced (`aria-pressed`).
   - Scrolling the grid keeps the bar pinned directly under the app bar, including when the header wraps on phones; the divider appears only while stuck.
   - Search "gin" → refine row with Fizz first; tap Fizz → 3 drinks, URL has `refine=fizz`; tap again → back to 20; browser Back restores each step.
   - New search clears `refine`. `/?refine=fizz` without search shows the default list.
   - No horizontal page scroll at 375px.

## Commit plan (when asked)

1. `feat(filters): add photo pills for categories`
2. `feat(filters): make filter bar sticky`
3. `feat(search): add refinement pills`
