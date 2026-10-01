import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDrinkById } from "@/services/cocktail";

export function useDrink() {
	const { drinkId } = useParams();

	const selectedDrink = drinkId ?? "";

	return useQuery({
		queryKey: ["drink", selectedDrink],
		queryFn: () => getDrinkById(selectedDrink),
		enabled: !!selectedDrink,
		retry: 2,
		retryDelay: 1000,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
}
