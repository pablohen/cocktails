import { useQuery } from "@tanstack/react-query";
import { toDrinkList } from "@/lib/drink";
import { getRandomDrink } from "@/services/cocktail";
import type { Drink } from "@/types/Drink";

export function useRandomDrink() {
	const fetchRandomDrink = async () => {
		const res = await getRandomDrink();
		return toDrinkList(res.data.drinks)[0] ?? null;
	};

	return useQuery<Drink | null>({
		queryKey: ["randomDrink"],
		queryFn: fetchRandomDrink,
		enabled: false,
		staleTime: 0,
		gcTime: 0,
	});
}
