import { useQuery } from "@tanstack/react-query";
import { useUtils } from "@/contexts/UtilsContext";
import { getDrinksByCategory, getDrinksBySearch } from "@/services/cocktail";
import type { DrinkListItem } from "@/types/Drink";

export function useDrinks() {
	const { selectedCategory, searchTerm } = useUtils();

	return useQuery<DrinkListItem[]>({
		queryKey: ["drinks", selectedCategory, searchTerm],
		queryFn: () => {
			if (searchTerm) {
				return getDrinksBySearch(searchTerm);
			}

			return getDrinksByCategory(selectedCategory);
		},
		enabled: !!selectedCategory || !!searchTerm,
		retry: 2,
		retryDelay: 1000,
		staleTime: 2 * 60 * 1000, // 2 minutes
	});
}
