import { useQuery } from "@tanstack/react-query";
import type { DrinkDTO } from "../interfaces/DrinkDTO";
import { cocktailService } from "../services/cocktail";

export function useRandomDrink() {
	const fetchRandomDrink = async () => {
		const res = await cocktailService.get<{ drinks: DrinkDTO[] }>("random.php");
		const drink = res.data.drinks;
		return drink[0];
	};

	return useQuery<DrinkDTO>({
		queryKey: ["randomDrink"],
		queryFn: fetchRandomDrink,
		enabled: false,
		staleTime: 0,
		gcTime: 0,
	});
}
