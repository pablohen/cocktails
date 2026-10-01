import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/cocktail";

export function useCategories() {
	return useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
		retry: 3,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}
