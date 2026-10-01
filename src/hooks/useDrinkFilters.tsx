import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useDrinkFilters() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const selectedCategory = searchParams.get("category") || "";
	const searchTerm = searchParams.get("search") || "";

	const handleSearch = useCallback(
		(term: string) => {
			if (term) {
				void navigate(`/?search=${encodeURIComponent(term)}`);
			} else {
				void navigate("/");
			}
		},
		[navigate],
	);

	const handleSelectedCategory = useCallback(
		(category: string) => {
			if (category) {
				void navigate(`/?category=${encodeURIComponent(category)}`);
			} else {
				void navigate("/");
			}
		},
		[navigate],
	);

	const handleSelectedDrink = useCallback(
		(drink: string) => {
			void navigate(`/${drink}`);
		},
		[navigate],
	);

	return {
		selectedCategory,
		searchTerm,
		handleSearch,
		handleSelectedCategory,
		handleSelectedDrink,
	};
}
