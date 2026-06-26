import type { Drink } from "@/types/Drink";

export type DrinkSummary = {
	id: string;
	name: string;
	image: string;
};

export function toDrinkSummary(
	drink: Pick<Drink, "idDrink" | "strDrink" | "strDrinkThumb">,
): DrinkSummary {
	return {
		id: drink.idDrink,
		name: drink.strDrink,
		image: drink.strDrinkThumb,
	};
}

const INGREDIENT_KEYS = [
	"strIngredient1",
	"strIngredient2",
	"strIngredient3",
	"strIngredient4",
	"strIngredient5",
	"strIngredient6",
	"strIngredient7",
	"strIngredient8",
	"strIngredient9",
	"strIngredient10",
	"strIngredient11",
	"strIngredient12",
	"strIngredient13",
	"strIngredient14",
	"strIngredient15",
] as const;

export function getDrinkIngredients(drink: Drink): string[] {
	return INGREDIENT_KEYS.map((key) => drink[key]).filter(
		(ingredient): ingredient is string => !!ingredient,
	);
}
