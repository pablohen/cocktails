import { useQuery } from "@tanstack/react-query";
import { cocktailService } from "../services/cocktail";
import { useUtils } from "../stores/utils";
import type { Drink } from "../types/Drink";

export function useDrinks() {
	const { selectedCategory, searchTerm } = useUtils();

	async function fetchDrinks(category: string) {
		const res = await cocktailService.get<{ drinks: Drink[] }>("/filter.php", {
			params: {
				c: category,
			},
		});

		const drinks = res.data.drinks;
		return drinks;
	}

	async function fetchSearch(searchTerm: string) {
		const res = await cocktailService.get<{ drinks: Drink[] }>("/search.php", {
			params: {
				s: searchTerm,
			},
		});

		const drinks = res.data.drinks;
		return drinks;
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
