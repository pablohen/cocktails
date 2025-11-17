import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { DrinkDTO } from "../interfaces/DrinkDTO";
import { cocktailService } from "../services/cocktail";

export function useDrink() {
	const { drinkId } = useParams();

	const selectedDrink = drinkId ?? "";

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
