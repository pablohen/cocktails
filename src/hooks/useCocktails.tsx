import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { CategoryDTO } from "../interfaces/CategoryDTO";
import type { DrinkDTO } from "../interfaces/DrinkDTO";
import { cocktailService } from "../services/cocktail";
import { useUtils } from "../stores/utils";

export function useCocktails() {
	function Categories() {
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

	function Drinks() {
		const { selectedCategory, searchTerm } = useUtils();

		async function fetchDrinks(category: string) {
			const res = await cocktailService.get<{ drinks: DrinkDTO[] }>(
				"/filter.php",
				{
					params: {
						c: category,
					},
				},
			);

			const drinks = res.data.drinks;
			return drinks;
		}

		async function fetchSearch(searchTerm: string) {
			const res = await cocktailService.get<{ drinks: DrinkDTO[] }>(
				"/search.php",
				{
					params: {
						s: searchTerm,
					},
				},
			);

			const drinks = res.data.drinks;
			return drinks;
		}

		return useQuery<DrinkDTO[]>({
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

	function Drink() {
		const { drinkId } = useParams();

		const selectedDrink = drinkId as string;

		const fetchDrink = async (id: string) => {
			const res = await cocktailService.get<{ drinks: DrinkDTO[] }>(
				"lookup.php",
				{
					params: {
						i: id,
					},
				},
			);

			const drink = res.data.drinks;
			return drink[0];
		};

		return useQuery<DrinkDTO>({
			queryKey: ["drink", selectedDrink],
			queryFn: () => fetchDrink(selectedDrink),
			enabled: !!selectedDrink,
			retry: 2,
			retryDelay: 1000,
			staleTime: 10 * 60 * 1000, // 10 minutes
		});
	}

	return { categories: Categories(), drinks: Drinks(), drink: Drink() };
}
