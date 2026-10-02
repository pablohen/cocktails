# Artifact Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the "Cocktails Pocket Bar" artifact's layout and API-supported behaviors (combinable filters, default home list, ingredient links, restyled drink page) into the React/MUI app.

**Architecture:** Filters live in URL query params owned by `UtilsContext`. `useDrinks` runs one cached React Query per active filter via `useQueries` and intersects results by `idDrink`. UI changes are confined to the header, a new home-only filter bar, a shared drink grid, the card, and the drink page.

**Tech Stack:** React 19, TypeScript, MUI 9, React Router 7, TanStack Query 5, Axios, Vite+ (`vp`).

**Spec:** `docs/superpowers/specs/2026-10-02-artifact-redesign-design.md`

## Global Constraints

- Light theme only; colors come from the existing `createAppTheme` palette (`primary.main`, `text.secondary`, `divider`, etc.), no new literal hex colors.
- No backend, no full-catalog load, no new dependencies.
- Tabs, double quotes, `@/` imports, named exports, imports at top of file, MUI `sx`/`styled` only.
- Alcoholic URL/API values are exactly `Alcoholic` and `Non_Alcoholic`.
- Default list when no filter is set: `filter.php?c=Cocktail`.
- No test suite exists and AGENTS.md says not to add tests. Each task's "test" is `vp check` plus a named browser check against `vp dev`.
- **Commits:** AGENTS.md says commit only when the user explicitly asks. Each task's commit step is run only after the user has said to commit; otherwise leave changes staged-ready and move on.

## Review Focus

1. **Ingredient names with spaces or symbols** (`Lemon juice`, `Rum (light)`, `Kahlúa`): the link from the drink page must encode the name, and the filter must return results. Pinned in Task 5 browser check.
2. **Search plus a filter whose results lack full objects** (search "mar" + category Cocktail): intersection must keep search results' order and objects. Pinned in Task 2 browser check.
3. **Tampered URL** (`/?alcoholic=yes`, `/?category=`): invalid alcoholic reads as unset; empty params behave as absent and the default list loads. Pinned in Task 2 browser check.
4. **Searching from a drink page**: typing in the header on `/:drinkId` must land on `/?search=…`, not stay on the drink page. Pinned in Task 3 browser check.
5. **Blank measures** (`strMeasureN` null or whitespace): row shows "to taste", never "null" or an empty gap. Pinned in Task 5 browser check.

---

### Task 1: Filter state and API endpoints

**Files:**

- Modify: `src/services/cocktail.ts`
- Modify: `src/contexts/UtilsContext.tsx`

**Interfaces:**

- Produces (services):
  - `getDrinksByIngredient(ingredient: string): Promise<AxiosResponse<DrinksResponse>>` → `filter.php` with `params: { i }`
  - `getDrinksByAlcoholic(alcoholic: string): Promise<AxiosResponse<DrinksResponse>>` → `filter.php` with `params: { a }`
- Produces (context), exported from `UtilsContext.tsx`:

```ts
export type AlcoholicFilter = "" | "Alcoholic" | "Non_Alcoholic";
export interface Filters {
	search: string;
	category: string;
	alcoholic: AlcoholicFilter;
	ingredient: string;
}
// useUtils() returns:
{
	filters: Filters;
	updateFilters: (patch: Partial<Filters>) => void;
	clearFilters: () => void;
	handleSelectedDrink: (drinkId: string) => void;
}
```

- [ ] **Step 1: Add the two service functions** next to `getDrinksByCategory`, same style.
- [ ] **Step 2: Rewrite `UtilsContext`.** Read the four params from `useSearchParams`; `alcoholic` is `""` unless the param is exactly one of the two allowed values. `updateFilters` builds `URLSearchParams` from current `filters` merged with `patch`, skips empty values, and `navigate`s to `/` + (`?` + params when non-empty). `clearFilters` navigates to `/`. Wrap all three callbacks in `useCallback`. Remove `selectedCategory`, `searchTerm`, `handleSearch`, `handleSelectedCategory`.
- [ ] **Step 3: Note the expected breakage.** Run `vp check --no-fmt --no-lint`. Expected: type errors only in `Header.tsx`, `Category.tsx`, `HomePage.tsx`, `NoResults.tsx`, `useDrinks.tsx` (fixed in Tasks 2–3). Do not commit yet; Tasks 1–3 land as a working set.

### Task 2: `useDrinks` intersection, home page, filter bar

**Files:**

- Modify: `src/hooks/useDrinks.tsx`
- Create: `src/pages/HomePage/FilterBar.tsx`
- Modify: `src/pages/HomePage.tsx`, `src/pages/HomePage/NoResults.tsx`, `src/pages/HomePage/ErrorDisplay.tsx`
- Delete: `src/components/Category.tsx`

**Interfaces:**

- Consumes: Task 1 `Filters`, `updateFilters`, `clearFilters`, both new service functions.
- Produces:

```ts
export type DrinkListItem = Pick<Drink, "idDrink" | "strDrink" | "strDrinkThumb">;
export function useDrinks(): {
	data: DrinkListItem[];
	isLoading: boolean;
	isError: boolean;
	refetch: () => void;
	isDefault: boolean;
};
export function FilterBar(props: { count: number | null }): JSX.Element;
export function NoResults(props: { filters: Filters }): JSX.Element;
export function ErrorDisplay(props: { onRetry: () => void }): JSX.Element;
```

- [ ] **Step 1: Rewrite `useDrinks`.** Source order: search, category, alcoholic, ingredient; each active one becomes a query with key `["drinks", kind, value]` and the existing `retry: 2`, `retryDelay: 1000`, `staleTime: 2 * 60 * 1000`, result through `toDrinkList`. No active source → one `["drinks", "category", "Cocktail"]` query and `isDefault: true`. Use `useQueries` with a `combine` function. Intersection algorithm:

```ts
const [first, ...rest] = results.map((r) => r.data ?? []);
const keep = rest.map((list) => new Set(list.map((d) => d.idDrink)));
const data = first.filter((d) => keep.every((ids) => ids.has(d.idDrink)));
```

`isLoading` = any `isLoading`; `isError` = any `isError`; `refetch` refetches each errored query.

- [ ] **Step 2: Build `FilterBar`.** Layout and copy per spec §1 "Filter bar": scrolling chip row ("All" + `useCategories` data, existing skeleton/error handling moved from `Header`), `ToggleButtonGroup` (exclusive, size small, labels All / Alcoholic / Non-alcoholic), "Made with {ingredient}" chip with `onDelete`, and `"{count} drinks"` when `count !== null`. Selected category chip = `filters.category`, or `"Cocktail"` when no filter is set. "All" chip is selected only when a filter is set but category is empty.
- [ ] **Step 3: Update `HomePage`.** Read `filters` for Helmet copy (replace `searchTerm`/`selectedCategory`). Render `<FilterBar count={isLoading || isError ? null : data.length} />` above the list; pass `filters` to `NoResults` and `refetch` to `ErrorDisplay`. Grid markup is replaced in Task 4, so leave the existing `Grid` in place for now.
- [ ] **Step 4: Update `NoResults`** to the single "No drinks match" branch. Body copy lists active filters joined with ", " (e.g. `No drinks match "mar", Cocktail, non-alcoholic, made with Gin.`), button "Clear filters" → `clearFilters()`. Delete the "No drinks selected" branch.
- [ ] **Step 5: Update `ErrorDisplay`** Retry button to call `onRetry` instead of reloading the page.
- [ ] **Step 6: Delete `Category.tsx`.**
- [ ] **Step 7: Verify.** `vp check --no-fmt --no-lint` passes except `Header.tsx`. Then finish Task 3 before browser checks.

### Task 3: Header

**Files:**

- Modify: `src/components/Header.tsx`, `src/components/SearchBar.tsx`

**Interfaces:**

- Consumes: Task 1 `filters.search`, `updateFilters`.

- [ ] **Step 1: Restyle `Header`** to one `Toolbar` per spec §1 "Header": logo + title link (flex-grow), `SearchBar`, labeled `Button`s "Favorites" (`FavoriteIcon`, links `/favorites`) and "Surprise me" (`CasinoIcon` with existing spin + `useRandomDrink` flow), then the existing shopping-list (badge) and history `IconButton`s. Below `sm`, render the two labeled buttons as `IconButton`s with the same `aria-label`s (`useMediaQuery(theme.breakpoints.down("sm"))`). Remove the category block and its imports.
- [ ] **Step 2: Wire search.** `<SearchBar initialValue={filters.search} onSubmit={(search) => updateFilters({ search })} />` — memoize the handler with `useCallback`. In `SearchBar`, change the wrapper to `flex: "1 1 280px", maxWidth: 460` (keep the `background.paper` input and pill radius) and the placeholder to `"Search drinks"`.
- [ ] **Step 3: Verify.** `vp check` passes (format, lint, types). Start `vp dev`, then in the browser pane:
  - `/` shows Cocktail drinks, Cocktail chip selected, count shown.
  - Pick Ordinary Drink → Non-alcoholic → result narrows; URL has `category=Ordinary+Drink&alcoholic=Non_Alcoholic`; Back restores the previous step.
  - Search "mar", then pick Cocktail: only cocktails containing "mar" remain, in search order (Review Focus 2).
  - `/?alcoholic=yes` and `/?category=` show the default Cocktail list (Review Focus 3).
  - On any `/:drinkId`, type "gin" in the header search → lands on `/?search=gin` (Review Focus 4).
  - Clear filters from an empty result returns to `/`.
- [ ] **Step 4: Commit (only if the user has asked)** as three commits, staging only each set's files:
  - `feat(api): add ingredient and alcoholic filter endpoints` — `src/services/cocktail.ts`
  - `feat(filters): support combinable url filters` — `src/contexts/UtilsContext.tsx`, `src/hooks/useDrinks.tsx`, `src/pages/HomePage.tsx`, `src/pages/HomePage/*`, deleted `src/components/Category.tsx`
  - `feat(header): move to single-row header with inline search` — `src/components/Header.tsx`, `src/components/SearchBar.tsx`

  (`feat(filters)` and `feat(home)` from the spec's commit plan merge here because the filter bar and URL state cannot type-check apart.)

### Task 4: Card and shared drink grid

**Files:**

- Create: `src/components/DrinkGrid.tsx`
- Modify: `src/components/Card.tsx`, `src/pages/HomePage/CardSkeleton.tsx`, `src/pages/HomePage.tsx`, `src/pages/FavoritesPage.tsx`, `src/pages/RecentlyViewedPage.tsx`

**Interfaces:**

- Produces: `export function DrinkGrid({ children }: { children: ReactNode }): JSX.Element` — a `Box` with `display: "grid"`, `gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))"`, `gap: 2.25`.

- [ ] **Step 1: Create `DrinkGrid`** and add it to the shared components table in `AGENTS.md`.
- [ ] **Step 2: Restyle `Card`** per spec §3: `CardMedia` with `sx={{ aspectRatio: "1", objectFit: "cover" }}` instead of `height={256}`, resting `boxShadow: 1`, name `variant="subtitle1"` with `fontFamily` from `theme.typography.h6`, weight 700, `noWrap`. Keep hover lift, color extraction, favorite button.
- [ ] **Step 3: Match `CardSkeleton`:** `Skeleton variant="rectangular" sx={{ aspectRatio: "1", height: "auto" }}` plus one text line.
- [ ] **Step 4: Replace `Grid container`/`Grid` wrappers** with `DrinkGrid` and direct children in `HomePage` (both skeleton and results), `FavoritesPage`, `RecentlyViewedPage`. Remove now-unused `Grid` imports.
- [ ] **Step 5: Verify.** `vp check` passes. Browser: home shows 4–5 columns at 1200px; at 375px (`resize_window` mobile) two columns, no horizontal scroll; favorites and recently viewed use the same grid; hovering a card still recolors the header.
- [ ] **Step 6: Commit (only if asked):** `style(card): use square images and auto-fill grid`.

### Task 5: Drink page

**Files:**

- Modify: `src/lib/drink.ts`, `src/pages/DrinkDetailsPage.tsx`, `src/pages/DrinkDetailsPage/DrinkDetailsSkeleton.tsx`

**Interfaces:**

- Produces: `export type DrinkIngredient = { name: string; measure: string };` and `getDrinkIngredients(drink: Drink): DrinkIngredient[]` — pairs `strIngredientN` with `strMeasureN`, both trimmed, skipping empty names.

- [ ] **Step 1: Change `getDrinkIngredients`** in `src/lib/drink.ts` (add a `MEASURE_KEYS` tuple beside `INGREDIENT_KEYS`).
- [ ] **Step 2: Rebuild the page body** as one `Paper` panel per spec §3 "Drink page": `display: "grid"`, `gridTemplateColumns: { xs: "1fr", md: "5fr 6fr" }`, `overflow: "hidden"`. Media column: image `aspectRatio: { xs: "4 / 3", md: "1" }`, cover, `FavoriteButton size="md"` top-right. Body column: `borderTop: 6px solid` `primary.main`, `p: 3`, title `h3` with `fontSize: { xs: "2rem", md: "2.4rem" }`, tag `Chip`s (category, `strAlcoholic`, `IBA · {strIBA}` when non-null) with `bgcolor: alpha(theme.palette.primary.main, 0.14)`.
- [ ] **Step 3: Ingredient rows.** Label `Ingredients · {n}` (overline style). Each row: `Link component={RouterLink} to={"/?ingredient=" + encodeURIComponent(name)}`, measure in `text.secondary` right-aligned (`"to taste"` when empty), existing shopping-list add/check `IconButton`. Rows separated by `divider` bottom borders.
- [ ] **Step 4: Method and actions.** Label `Method · serve in a {strGlass lowercased}` (omit the "· serve in…" part when `strGlass` is null), instructions with `maxWidth: "62ch"`. Actions: contained `Button` "Another random drink" (`useRandomDrink().refetch()` then `navigate("/" + id)`, disabled while fetching) and outlined `Button` "Copy ingredients" → `navigator.clipboard.writeText(name + "\n" + rows as "- {measure} {name}")` in the click handler; `Snackbar` with "Ingredients copied" or, on rejection, "Couldn't copy. Select the list instead."
- [ ] **Step 5: Keep existing behavior** untouched: Helmet, recently-viewed tracking, color extraction effect, loading/error/not-found branches.
- [ ] **Step 6: Rebuild `DrinkDetailsSkeleton`** to the same two-column panel (rectangular skeleton for media; title, chip row, five rows, paragraph in the body).
- [ ] **Step 7: Verify.** `vp check` and `vp build` pass. Browser:
  - Open a drink: border and chips take the photo's color; mobile width stacks with 4:3 photo.
  - Drink with `Lemon juice` or an accented ingredient → its link lands on a non-empty filtered list (Review Focus 1).
  - A drink with a blank measure shows "to taste" (Review Focus 5) — `/13581` (410 Gone) has no measure for Coca-Cola.
  - Copy ingredients shows the snackbar; Another random drink navigates; shopping-list toggle and favorite still work; Back returns to the previous drink.
- [ ] **Step 8: Commit (only if asked):** `feat(drink): redesign drink page with ingredient links`.

### Task 6: Final pass

- [ ] **Step 1:** `vp check` and `vp build` pass on the whole tree.
- [ ] **Step 2:** Run the full verification list from spec §Verification once more at 1200px and 375px.
- [ ] **Step 3:** Update `AGENTS.md` shared-components table: remove `Category` if listed, add `DrinkGrid` (if not done in Task 4). Note `updateFilters` as the URL-param pattern in the state-ownership table.
