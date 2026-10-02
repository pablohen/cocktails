# Artifact redesign — design

Date: 2026-10-02
Reference: published artifact "Cocktails Pocket Bar" (https://claude.ai/artifact/BgvV4WbEvercS1iYaKJhxH)

## Goal

Bring the artifact's look and its API-supported behaviors into the React/MUI app.

Success means:

- The home page is never empty; with no filters it shows the Cocktail category.
- Search, category, alcoholic, and ingredient filters combine (all must match).
- Clicking an ingredient on a drink page lists other drinks made with it.
- Header, filter bar, cards, and drink page match the artifact's layout and styling.

## Decisions

| Topic                | Decision                                                              |
| -------------------- | --------------------------------------------------------------------- |
| Scope                | Visual redesign plus behaviors the free API supports                  |
| Data model           | Keep API-per-query with React Query; no full-catalog load, no backend |
| Drink details        | Stay on the `/:drinkId` page, restyled                                |
| Default home         | `filter.php?c=Cocktail`, with the Cocktail chip shown as selected     |
| Theme                | Light only; dark mode is out of scope                                 |
| Filter state         | Combinable URL query params, intersected client-side                  |
| Category chip counts | Dropped (would need one request per category on every visit)          |
| Card subtitle        | None (`filter.php` returns only id, name, thumb)                      |

## Constraints found in the API

- `filter.php` takes one criterion; extra params are ignored (`?i=Gin&c=Cocktail` returns all gin drinks).
- `filter.php` results contain only `idDrink`, `strDrink`, `strDrinkThumb`.
- Alcoholic values accepted by the API: `Alcoholic`, `Non_Alcoholic`.

## 1. Header and filter bar

### Header (`src/components/Header.tsx`)

- One toolbar row: logo + title (link home), inline rounded search field, labeled "Favorites" and "Surprise me" buttons, then icon buttons for shopping list (with count badge) and recently viewed.
- Below the `sm` breakpoint the labeled buttons render as icon-only; the search field wraps to its own full-width row.
- Category chips are removed from the AppBar.
- `SearchBar` keeps its debounce behavior; it calls `updateFilters({ search })`.

### Filter bar (new `src/pages/HomePage/FilterBar.tsx`)

Rendered at the top of `HomePage` only.

- **Category chips:** horizontally scrolling row (`overflow-x: auto`, no wrap). First chip "All", then categories from `useCategories`. Selected chip is filled `primary`; others outlined. "All" removes the `category` param. When no filter is active the Cocktail chip shows as selected (the default list).
- **Alcohol switch:** MUI `ToggleButtonGroup` (exclusive, small): All / Alcoholic / Non-alcoholic → `alcoholic` param `""` / `Alcoholic` / `Non_Alcoholic`.
- **Ingredient chip:** when `ingredient` is set, a chip "Made with {ingredient}" with delete icon that removes the param.
- **Result count:** "{n} drinks", right-aligned, `text.secondary`, tabular numerals.
- Category loading uses the existing skeleton chips; category load error shows the existing compact `Alert`.

## 2. Data flow

### URL state (`src/contexts/UtilsContext.tsx`)

Exposes:

```ts
interface Filters {
	search: string;
	category: string;
	alcoholic: "" | "Alcoholic" | "Non_Alcoholic";
	ingredient: string;
}

interface UtilsContextData {
	filters: Filters;
	updateFilters: (patch: Partial<Filters>) => void;
	clearFilters: () => void;
	handleSelectedDrink: (drinkId: string) => void;
}
```

- `filters` is read from `useSearchParams`; unknown `alcoholic` values read as `""`.
- `updateFilters` merges the patch into current params, deletes empty values, and navigates to `/?<params>`. It always targets `/`, so searching from a drink page returns to the list.
- `clearFilters` navigates to `/`.
- `handleSearch`, `handleSelectedCategory`, `selectedCategory`, `searchTerm` are removed; callers (`Header`, `Category`, `NoResults`, `HomePage`, `useDrinks`) move to the new API. `Category.tsx` is folded into `FilterBar` and deleted.

### API client (`src/services/cocktail.ts`)

Add, both returning `DrinksResponse`:

- `getDrinksByIngredient(ingredient)` → `filter.php?i=`
- `getDrinksByAlcoholic(alcoholic)` → `filter.php?a=`

### `useDrinks` (`src/hooks/useDrinks.tsx`)

1. Build sources from `filters`:
   - `search` → `["drinks", "search", term]` via `getDrinksBySearch`
   - `category` → `["drinks", "category", name]` via `getDrinksByCategory`
   - `alcoholic` → `["drinks", "alcoholic", value]` via `getDrinksByAlcoholic`
   - `ingredient` → `["drinks", "ingredient", name]` via `getDrinksByIngredient`
   - No source active → a single `category: "Cocktail"` source, `isDefault: true`.
2. Run them with `useQueries` (same `retry`, `retryDelay`, `staleTime` as today). Each result goes through `toDrinkList`.
3. Combine: if any query is loading → `isLoading`; if any errored → `isError` with a `refetch` that refetches failed queries. Otherwise intersect by `idDrink`, keeping the order and objects of the first source (search first when present, since it has full `Drink` objects).
4. Return `{ data, isLoading, isError, refetch, isDefault }`.

Item type is `DrinkSummaryInput = Pick<Drink, "idDrink" | "strDrink" | "strDrinkThumb">`, which both full and filter results satisfy.

### Empty and error states

- `ErrorDisplay` gains a Retry button wired to `refetch`.
- `NoResults` takes the active `filters`, describes them ("No drinks match Gin in Cocktail, non-alcoholic"), and offers "Clear filters" → `clearFilters()`. The "No drinks selected" branch is deleted.

## 3. Cards, grid, and drink page

### Grid and card

- `HomePage`, `FavoritesPage`, `RecentlyViewedPage` use a CSS grid: `gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))"`, `gap: 2.25` (18px).
- `Card`: square image (`aspectRatio: "1"`, `objectFit: "cover"`), resting shadow 1, hover lift and shadow 4 kept, hover color extraction kept. Name in `h6`-family at ~1.08rem, single line with ellipsis. Favorite button stays top-right.
- `CardSkeleton` matches: square rectangular skeleton plus one text line.

### Drink page (`src/pages/DrinkDetailsPage.tsx`)

One `Paper` panel, `md+` two columns (5fr / 6fr), stacked below `md`.

- **Media column:** drink photo, square on `md+`, 4:3 when stacked, background `primary.main` at low alpha while loading; `FavoriteButton` top-right.
- **Body column:** 6px top border `primary.main` (already swapped to the photo's extracted color by the existing effect), padding 3.
  - Title `h3` responsive (`clamp`-style via breakpoints).
  - Tag chips: category, `strAlcoholic`, and `IBA · {strIBA}` when present; small, filled with `primary.main` at ~14% alpha.
  - **Ingredients · {n}** label (uppercase caption, letter-spaced). Rows separated by `divider`: ingredient name as a `Link` (router) to `/?ingredient=<encoded name>`, measure right-aligned in `text.secondary` ("to taste" when empty), and the existing shopping-list add/check `IconButton`.
  - **Method · serve in a {glass lowercased}** label, then instructions, max ~62ch.
  - Actions row: "Another random drink" (contained, uses `useRandomDrink` then navigates) and "Copy ingredients" (outlined; `navigator.clipboard.writeText`, MUI `Snackbar` "Ingredients copied" or "Couldn't copy. Select the list instead." on rejection).
- Existing behaviors kept: Helmet title/description, recently-viewed tracking, color extraction and reset on unmount, loading skeleton, error alert with Retry, not-found page.
- `getDrinkIngredients` returns `{ name: string; measure: string }[]` (trimmed; pairs `strIngredientN` with `strMeasureN`). This page is its only caller.
- `DrinkDetailsSkeleton` is rebuilt to the same panel shape. `DetailSection` is unchanged (still used by `ShoppingListPage`).

## Out of scope

- Dark mode.
- Loading the full catalog, category counts, card subtitles.
- Modal/quick-view drink details.
- Tests (none exist; AGENTS.md says not to add them unprompted).

## Verification

1. `vp check` and `vp build` pass.
2. In the browser pane against `vp dev`:
   - `/` shows Cocktail drinks with the Cocktail chip selected.
   - Category + Non-alcoholic + an ingredient narrow the list together; the URL holds all three; back/forward restores each step.
   - Search from a drink page returns to `/` with results.
   - Ingredient link on a drink page lands on the filtered list.
   - Favorites, shopping-list toggle, recently viewed, Surprise me, Copy ingredients work.
   - Layout at 375px width: header wraps, chips scroll, grid is two columns, drink panel stacks, no horizontal page scroll.

## Commit plan (when asked)

1. `feat(api): add ingredient and alcoholic filter endpoints`
2. `feat(filters): support combinable url filters`
3. `feat(home): add filter bar and default cocktail list`
4. `feat(header): move to single-row header with inline search`
5. `style(card): use square images and auto-fill grid`
6. `feat(drink): redesign drink page with ingredient links`

## Changes during implementation

Found while verifying against the live free API (key `1`):

- `filter.php` returns at most 100 drinks (Ordinary Drink stops at "Cuba Libre"; Alcoholic has 395). Only the Non_Alcoholic list (58) is complete.
  - With a search active, category and alcoholic filter the search results by `strCategory` / `strAlcoholic` instead of intersecting capped lists.
  - "Alcoholic" next to a category is applied as "not in the Non_Alcoholic list".
  - Category + Non-alcoholic without a search can still under-report for categories over 100 drinks.
- `filter.php?i=` returns exactly one drink for any ingredient. The ingredient filter and ingredient links were dropped (user decision); ingredients are plain text.
- `DrinkGrid` uses a 150px minimum column below `sm` so phones get two columns.
