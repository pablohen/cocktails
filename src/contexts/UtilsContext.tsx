import { createContext, type ReactNode, useCallback, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Props {
	children: ReactNode;
}

interface UtilsContextData {
	selectedCategory: string;
	searchTerm: string;
	handleSearch: (term: string) => void;
	handleSelectedCategory: (category: string) => void;
	handleSelectedDrink: (drink: string) => void;
}

const UtilsContext = createContext<UtilsContextData | undefined>(undefined);

export function UtilsProvider({ children }: Props) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const selectedCategory = searchParams.get("category") || "";
	const searchTerm = searchParams.get("search") || "";

	const handleSearch = useCallback(
		(term: string) => {
			if (term) {
				navigate(`/?search=${encodeURIComponent(term)}`);
			} else {
				navigate("/");
			}
		},
		[navigate],
	);

	const handleSelectedCategory = useCallback(
		(category: string) => {
			if (category) {
				navigate(`/?category=${encodeURIComponent(category)}`);
			} else {
				navigate("/");
			}
		},
		[navigate],
	);

	const handleSelectedDrink = useCallback(
		(drink: string) => {
			navigate(`/${drink}`);
		},
		[navigate],
	);

	return (
		<UtilsContext.Provider
			value={{
				selectedCategory,
				searchTerm,
				handleSearch,
				handleSelectedCategory,
				handleSelectedDrink,
			}}
		>
			{children}
		</UtilsContext.Provider>
	);
}

export function useUtils() {
	const context = useContext(UtilsContext);
	if (context === undefined) {
		throw new Error("useUtils must be used within a UtilsProvider");
	}
	return context;
}
