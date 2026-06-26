import { createContext, type ReactNode, useContext } from "react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import type { Drink } from "@/types/Drink";

export type FavoriteDrink = Pick<Drink, "idDrink" | "strDrink" | "strDrinkThumb"> & Partial<Drink>;

interface FavoritesContextType {
	favorites: FavoriteDrink[];
	addFavorite: (drink: FavoriteDrink) => void;
	removeFavorite: (id: string) => void;
	isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
	const [favorites, setFavorites] = useLocalStorageState<FavoriteDrink[]>("favorites", []);

	const addFavorite = (drink: FavoriteDrink) => {
		setFavorites((prev) => {
			if (prev.some((fav) => fav.idDrink === drink.idDrink)) return prev;
			return [...prev, drink];
		});
	};

	const removeFavorite = (id: string) => {
		setFavorites((prev) => prev.filter((drink) => drink.idDrink !== id));
	};

	const isFavorite = (id: string) => {
		return favorites.some((drink) => drink.idDrink === id);
	};

	return (
		<FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
			{children}
		</FavoritesContext.Provider>
	);
};

export const useFavorites = () => {
	const context = useContext(FavoritesContext);
	if (context === undefined) {
		throw new Error("useFavorites must be used within a FavoritesProvider");
	}
	return context;
};
