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

const MEASURE_KEYS = [
	"strMeasure1",
	"strMeasure2",
	"strMeasure3",
	"strMeasure4",
	"strMeasure5",
	"strMeasure6",
	"strMeasure7",
	"strMeasure8",
	"strMeasure9",
	"strMeasure10",
	"strMeasure11",
	"strMeasure12",
	"strMeasure13",
	"strMeasure14",
	"strMeasure15",
] as const;

export type DrinkIngredient = {
	name: string;
	measure: string;
};

export function getDrinkIngredients(drink: Drink): DrinkIngredient[] {
	return INGREDIENT_KEYS.map((key, index) => ({
		name: drink[key]?.trim() ?? "",
		measure: drink[MEASURE_KEYS[index]]?.trim() ?? "",
	})).filter((ingredient) => ingredient.name);
}

export function toDrinkList<T>(drinks: T[] | null | string): T[] {
	return Array.isArray(drinks) ? drinks : [];
}
