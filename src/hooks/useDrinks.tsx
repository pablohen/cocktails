import { useQueries } from "@tanstack/react-query";
import { type Filters, useUtils } from "@/contexts/UtilsContext";
import { toDrinkList } from "@/lib/drink";
import { splitWords } from "@/lib/refinements";
import { getDrinksByAlcoholic, getDrinksByCategory, getDrinksBySearch } from "@/services/cocktail";
import type { Drink } from "@/types/Drink";

// Search results carry every field; filter results only id, name, and thumb
export type DrinkListItem = Pick<Drink, "idDrink" | "strDrink" | "strDrinkThumb"> &
	Partial<Pick<Drink, "strCategory" | "strAlcoholic">>;

type SourceKind = "search" | "category" | "alcoholic";

const DEFAULT_CATEGORY = "Cocktail";

const LIST_SOURCES = ["category", "alcoholic"] as const;

function fetchSource(kind: SourceKind, value: string) {
	switch (kind) {
		case "search":
			return getDrinksBySearch(value);
		case "category":
			return getDrinksByCategory(value);
		case "alcoholic":
			return getDrinksByAlcoholic(value);
		default: {
			const exhaustive: never = kind;
			throw new Error(`Unknown drink source: ${String(exhaustive)}`);
		}
	}
}

interface Source {
	kind: SourceKind;
	value: string;
	mode: "include" | "exclude";
}

function getSources(filters: Filters): { sources: Source[]; isDefault: boolean } {
	// Search results carry category and alcohol fields, so those filter them directly (matchesSearchFilters)
	const active: SourceKind[] = filters.search
		? ["search"]
		: LIST_SOURCES.filter((kind) => filters[kind]);

	if (active.length === 0) {
		return {
			sources: [{ kind: "category", value: DEFAULT_CATEGORY, mode: "include" }],
			isDefault: true,
		};
	}

	// The free API caps filter results at 100. The non-alcoholic list fits under the cap and the
	// alcoholic one doesn't, so "Alcoholic" after a category means "not non-alcoholic".
	// Category always comes first here, so an exclusion is never the base list.
	const sources = active.map((kind): Source => {
		if (kind === "alcoholic" && filters.alcoholic === "Alcoholic" && active.length > 1) {
			return { kind, value: "Non_Alcoholic", mode: "exclude" };
		}
		return { kind, value: filters[kind], mode: "include" };
	});

	return { sources, isDefault: false };
}

function matchesSearchFilters(drink: DrinkListItem, { search, category, alcoholic }: Filters) {
	if (!search) {
		return true;
	}
	if (category && drink.strCategory !== category) {
		return false;
	}
	if (alcoholic === "Non_Alcoholic") {
		return drink.strAlcoholic === "Non alcoholic";
	}
	if (alcoholic === "Alcoholic") {
		return drink.strAlcoholic !== "Non alcoholic";
	}
	return true;
}

export function useDrinks() {
	const { filters } = useUtils();
	const { sources, isDefault } = getSources(filters);

	const combined = useQueries({
		queries: sources.map(({ kind, value }) => ({
			queryKey: ["drinks", kind, value],
			queryFn: async (): Promise<DrinkListItem[]> => {
				const res = await fetchSource(kind, value);
				return toDrinkList<DrinkListItem>(res.data.drinks);
			},
			retry: 2,
			retryDelay: 1000,
			staleTime: 2 * 60 * 1000, // 2 minutes
		})),
		combine: (results) => {
			const isLoading = results.some((result) => result.isLoading);
			const isError = results.some((result) => result.isError);

			const [first = [], ...rest] = results.map((result) => result.data ?? []);
			const checks = rest.map((list, index) => ({
				ids: new Set(list.map((drink) => drink.idDrink)),
				include: sources[index + 1].mode === "include",
			}));
			const filtered = first.filter(
				(drink) =>
					matchesSearchFilters(drink, filters) &&
					checks.every(({ ids, include }) => ids.has(drink.idDrink) === include),
			);
			// Refinement pills are built from the unrefined search results so they stay put after a tap
			const searchResults = filters.search ? filtered : [];
			const data =
				filters.search && filters.refine
					? filtered.filter((drink) => splitWords(drink.strDrink).includes(filters.refine))
					: filtered;

			const refetch = () => {
				for (const result of results) {
					if (result.isError) {
						void result.refetch();
					}
				}
			};

			return { data, searchResults, isLoading, isError, refetch };
		},
	});

	return { ...combined, isDefault };
}
