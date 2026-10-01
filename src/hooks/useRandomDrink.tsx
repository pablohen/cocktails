import { useQuery } from "@tanstack/react-query";
import { getRandomDrink } from "@/services/cocktail";

export function useRandomDrink() {
	return useQuery({
		queryKey: ["randomDrink"],
		queryFn: getRandomDrink,
		enabled: false,
		staleTime: 0,
		gcTime: 0,
	});
}
