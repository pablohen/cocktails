import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useLayoutEffect,
	useMemo,
	useRef,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Props {
	children: ReactNode;
}

export type AlcoholicFilter = "" | "Alcoholic" | "Non_Alcoholic";

export interface Filters {
	search: string;
	category: string;
	alcoholic: AlcoholicFilter;
	refine: string;
}

interface UtilsContextData {
	filters: Filters;
	updateFilters: (patch: Partial<Filters>) => void;
	clearFilters: () => void;
	handleSelectedDrink: (drinkId: string) => void;
}

const FILTER_KEYS = ["search", "category", "alcoholic", "refine"] as const;

function toAlcoholicFilter(value: string | null): AlcoholicFilter {
	return value === "Alcoholic" || value === "Non_Alcoholic" ? value : "";
}

const UtilsContext = createContext<UtilsContextData | undefined>(undefined);

export function UtilsProvider({ children }: Props) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const search = searchParams.get("search") || "";
	const category = searchParams.get("category") || "";
	const alcoholic = toAlcoholicFilter(searchParams.get("alcoholic"));
	const refine = (searchParams.get("refine") || "").toLowerCase();

	const filters = useMemo<Filters>(
		() => ({ search, category, alcoholic, refine }),
		[search, category, alcoholic, refine],
	);

	// Read through a ref so updateFilters stays stable; SearchBar re-submits when its onSubmit changes
	const filtersRef = useRef(filters);
	useLayoutEffect(() => {
		filtersRef.current = filters;
	}, [filters]);

	// Skip no-op navigations so repeated clicks don't stack history entries
	const navigateTo = useCallback(
		(url: string) => {
			if (url !== window.location.pathname + window.location.search) {
				void navigate(url);
			}
		},
		[navigate],
	);

	const updateFilters = useCallback(
		(patch: Partial<Filters>) => {
			const next = { ...filtersRef.current, ...patch };
			if (!next.search) {
				next.refine = "";
			}
			const params = new URLSearchParams();
			for (const key of FILTER_KEYS) {
				if (next[key]) {
					params.set(key, next[key]);
				}
			}
			const query = params.toString();
			navigateTo(query ? `/?${query}` : "/");
		},
		[navigateTo],
	);

	const clearFilters = useCallback(() => {
		navigateTo("/");
	}, [navigateTo]);

	const handleSelectedDrink = useCallback(
		(drinkId: string) => {
			void navigate(`/${drinkId}`);
		},
		[navigate],
	);

	return (
		<UtilsContext.Provider value={{ filters, updateFilters, clearFilters, handleSelectedDrink }}>
			{children}
		</UtilsContext.Provider>
	);
}

export function useUtils() {
	const context = useContext(UtilsContext);
	if (context === undefined) {
		throw new Error("useUtils must be used within a UtilsProvider");
	}
	return context;
}
