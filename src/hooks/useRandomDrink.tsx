import { useQuery } from "@tanstack/react-query";
import { cocktailService } from "../services/cocktail";
import type { Drink } from "../types/Drink";

export function useRandomDrink() {
	const fetchRandomDrink = async () => {
		const res = await cocktailService.get<{ drinks: Drink[] }>("random.php");
		const drink = res.data.drinks;
		return drink[0];
	};

	return useQuery<Drink>({
		queryKey: ["randomDrink"],
		queryFn: fetchRandomDrink,
		enabled: false,
		staleTime: 0,
		gcTime: 0,
	});
}
