import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { cocktailService } from "../services/cocktail";
import type { Drink } from "../types/Drink";

export function useDrink() {
	const { drinkId } = useParams();

	const selectedDrink = drinkId ?? "";

	const fetchDrink = async (id: string) => {
		const res = await cocktailService.get<{ drinks: Drink[] }>("lookup.php", {
			params: {
				i: id,
			},
		});

		const drink = res.data.drinks;
		return drink[0];
	};

	return useQuery<Drink>({
		queryKey: ["drink", selectedDrink],
		queryFn: () => fetchDrink(selectedDrink),
		enabled: !!selectedDrink,
		retry: 2,
		retryDelay: 1000,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
}
