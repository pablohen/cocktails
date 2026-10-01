import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toDrinkList } from "@/lib/drink";
import { getDrinkById } from "@/services/cocktail";
import type { Drink } from "@/types/Drink";

export function useDrink() {
	const { drinkId } = useParams();

	const selectedDrink = drinkId ?? "";

	const fetchDrink = async (id: string) => {
		const res = await getDrinkById(id);

		return toDrinkList(res.data.drinks)[0] ?? null;
	};

	return useQuery<Drink | null>({
		queryKey: ["drink", selectedDrink],
		queryFn: () => fetchDrink(selectedDrink),
		enabled: !!selectedDrink,
		retry: 2,
		retryDelay: 1000,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
}
