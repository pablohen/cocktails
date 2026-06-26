# Cocktails — Agent Instructions

Cocktail recipe browser consuming [TheCocktailDB](https://www.thecocktaildb.com). Live at https://cocktails.pablohen.dev.

## Stack

- React 19, TypeScript 7, Vite 8
- React Router 7, TanStack React Query 5
- Tailwind CSS 4, shadcn/ui (new-york style)
- Axios, Biome (lint/format), pnpm

There is no backend. API calls go to `VITE_API_URL` (defaults to TheCocktailDB) via `src/services/cocktail.ts`.

## Architecture

```
pages/          → route-level screens
components/     → shared UI (folder per component)
components/ui/  → shadcn primitives
hooks/          → React Query wrappers + useLocalStorageState
services/       → Axios API client
contexts/       → localStorage-backed client state + URL params
types/          → API shape types
lib/            → shared utilities (cn, drink helpers, colorExtractor)
```

### State ownership

| Concern | Location | Example |
|---------|----------|---------|
| Server/async data | `hooks/` + React Query | `useDrinks`, `useDrink` |
| URL search/category | `contexts/UtilsContext.tsx` | `search`, `category` query params |
| Persistent client state | `contexts/` + `useLocalStorageState` | favorites, shopping list, recently viewed |
| Dynamic theming | `contexts/ThemeContext.tsx` | CSS vars from image colors |

Provider nesting order is defined in `src/App.tsx` — follow the same pattern when adding providers:

`HelmetProvider` → `QueryClientProvider` → `BrowserRouter` → `ThemeProvider` → `RecentlyViewedProvider` → `ShoppingListProvider` → `FavoritesProvider` → `UtilsProvider` → `DefaultLayout` → `Routes`

### Routes

Defined in `src/routes/app.routes.tsx`:

- `/` — HomePage
- `/favorites` — FavoritesPage
- `/shopping-list` — ShoppingListPage
- `/recently-viewed` — RecentlyViewedPage
- `/:drinkId` — DrinkDetailsPage
- `*` — NotFoundPage

## Directory conventions

- **Pages:** `src/pages/<PageName>/index.tsx` with optional `components/` subfolder
- **Shared components:** `src/components/<Name>/index.tsx`, named exports (`export function Card`)
- **shadcn primitives:** `src/components/ui/` — add via shadcn CLI, do not hand-roll duplicates
- **Hooks:** `src/hooks/use*.tsx`
- **Contexts:** `src/contexts/*Context.tsx` with `*Provider` + `use*` hook; throw if used outside provider
- **Types:** `src/types/` — mirror API shapes
- **Imports:** prefer `@/` alias (configured in `vite.config.ts` and `tsconfig.json`)

### Shared components

| Component | Purpose |
|-----------|---------|
| `Card` | Drink tile (image, favorite, theme hover) |
| `PageHeader` | List page title with icon and optional action |
| `EmptyState` | Empty list placeholder with CTA |
| `FavoriteButton` | Heart toggle for favorites |
| `DetailSection` | shadcn Card panel for detail page sections |
| `WaveBackground` | Animated wave background (not a shadcn primitive) |

### lib/ utilities

| File | Purpose |
|------|---------|
| `lib/utils.ts` | `cn()` class merging |
| `lib/drink.ts` | `DrinkSummary`, `toDrinkSummary`, `getDrinkIngredients` |
| `lib/colorExtractor.ts` | Extract palette from drink images |

## Code style

- Tabs for indentation, double quotes for strings (Biome)
- Run `pnpm lint` / `pnpm lint:fix` / `pnpm format` after changes
- Tailwind classes sorted via Biome (`cn`, `clsx`, `cva`)
- Icons: `lucide-react`
- Use `cn()` from `src/lib/utils.ts` for class merging
- Imports at top of file (no inline imports)
- Exhaustive `switch` with `never` in default for union types

## Build & Test

| Command | Purpose |
|---------|---------|
| `pnpm i` | Install dependencies |
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | `tsc && vite build` |
| `pnpm typecheck` | Type-check only |
| `pnpm lint` | Biome check |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm format` | Biome format |
| `pnpm preview` | Preview production build |

No test suite exists. Run `pnpm typecheck` and `pnpm build` (or at minimum `pnpm lint`) to verify changes.

Copy `.env.example` to `.env` if API URL customization is needed.

## Git commits

Always use **atomic conventional commits**. This repo follows this style (e.g. `chore(deps): bump vite to 8.1.0`).

**Atomic:** One logical change per commit. Split unrelated work into separate commits.

**Format:**

```
<type>(<optional scope>): <short imperative summary>
```

Common types: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `perf`, `build`, `ci`.

Examples:

- `feat(favorites): add bulk remove action`
- `fix(search): debounce query param updates`
- `refactor(hooks): extract shared query options`
- `chore(deps): bump react-router-dom to 7.18.0`
- `docs: add AGENTS.md`

Rules:

- Write imperative mood in the subject (`add`, `fix`, `bump` — not `added`, `fixes`)
- Keep subject under ~72 characters; add a body only when context is needed
- Stage only files belonging to that single change before committing
- Never mix refactors with behavior changes in one commit
- Only commit when explicitly asked

## Agent guidelines

**Do:**

- Add API calls in `services/cocktail.ts`, wrap with React Query hooks in `hooks/`
- Use existing contexts for favorites, shopping list, and recently viewed — don't duplicate localStorage logic
- Use shadcn/ui components from `components/ui/` for new UI primitives
- Keep changes scoped; match surrounding code style
- Split work into atomic conventional commits when asked to commit

**Don't:**

- Add a backend or new data layer without explicit request
- Put server-fetching logic directly in page components
- Create parallel Card/Button primitives when shadcn equivalents exist
- Commit unless explicitly asked
- Bundle unrelated changes into a single commit
- Add tests unless explicitly requested

## Key entry points

- `src/App.tsx` — provider tree
- `src/routes/app.routes.tsx` — routes
- `src/services/cocktail.ts` — API client
- `src/hooks/useDrinks.tsx` — query hook pattern
- `src/components/Card/index.tsx` — component pattern
- `src/contexts/FavoritesContext.tsx` — context pattern
- `src/contexts/UtilsContext.tsx` — URL param state pattern
- `src/lib/drink.ts` — drink shape helpers
