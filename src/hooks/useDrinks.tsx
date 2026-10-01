import { useQuery } from "@tanstack/react-query";
import { useUtils } from "@/contexts/UtilsContext";
import { toDrinkList } from "@/lib/drink";
import { getDrinksByCategory, getDrinksBySearch } from "@/services/cocktail";
import type { Drink } from "@/types/Drink";

export function useDrinks() {
	const { selectedCategory, searchTerm } = useUtils();

	async function fetchDrinks(category: string) {
		const res = await getDrinksByCategory(category);

		return toDrinkList(res.data.drinks);
	}

	async function fetchSearch(searchTerm: string) {
		const res = await getDrinksBySearch(searchTerm);

		return toDrinkList(res.data.drinks);
	}

	return useQuery<Drink[]>({
		queryKey: ["drinks", selectedCategory, searchTerm],
		queryFn: () => {
			if (searchTerm) {
				return fetchSearch(searchTerm);
			}

			return fetchDrinks(selectedCategory);
		},
		enabled: !!selectedCategory || !!searchTerm,
		retry: 2,
		retryDelay: 1000,
		staleTime: 2 * 60 * 1000, // 2 minutes
	});
}
