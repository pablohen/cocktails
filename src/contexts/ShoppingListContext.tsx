import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

interface ShoppingListContextType {
	ingredients: string[];
	addIngredient: (ingredient: string) => void;
	removeIngredient: (ingredient: string) => void;
	isInList: (ingredient: string) => boolean;
	clearList: () => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
	undefined,
);

export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
	const [ingredients, setIngredients] = useState<string[]>(() => {
		const storedList = localStorage.getItem("shoppingList");
		return storedList ? JSON.parse(storedList) : [];
	});

	useEffect(() => {
		localStorage.setItem("shoppingList", JSON.stringify(ingredients));
	}, [ingredients]);

	const addIngredient = (ingredient: string) => {
		setIngredients((prev) => {
			if (prev.includes(ingredient)) return prev;
			return [...prev, ingredient];
		});
	};

	const removeIngredient = (ingredient: string) => {
		setIngredients((prev) => prev.filter((item) => item !== ingredient));
	};

	const isInList = (ingredient: string) => {
		return ingredients.includes(ingredient);
	};

	const clearList = () => {
		setIngredients([]);
	};

	return (
		<ShoppingListContext.Provider
			value={{
				ingredients,
				addIngredient,
				removeIngredient,
				isInList,
				clearList,
			}}
		>
			{children}
		</ShoppingListContext.Provider>
	);
};

export const useShoppingList = () => {
	const context = useContext(ShoppingListContext);
	if (context === undefined) {
		throw new Error(
			"useShoppingList must be used within a ShoppingListProvider",
		);
	}
	return context;
};
