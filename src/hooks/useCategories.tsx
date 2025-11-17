import { useQuery } from "@tanstack/react-query";
import type { CategoryDTO } from "../interfaces/CategoryDTO";
import { cocktailService } from "../services/cocktail";

export function useCategories() {
	const fetchCategories = async () => {
		const res = await cocktailService.get<{ drinks: CategoryDTO[] }>(
			"/list.php?c=list",
		);

		const categories = res.data.drinks;
		return categories;
	};

	return useQuery<CategoryDTO[]>({
		queryKey: ["categories"],
		queryFn: fetchCategories,
		retry: 3,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}
