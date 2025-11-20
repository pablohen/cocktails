import axios from "axios";
import type { Category } from "@/types/Category";
import type { Drink } from "@/types/Drink";

const API_URL =
	import.meta.env.VITE_API_URL || "https://www.thecocktaildb.com/api/json/v1/1";

const cocktailApi = axios.create({
	baseURL: API_URL,
});

export async function getCategories() {
	return await cocktailApi.get<{ drinks: Category[] }>("list.php?c=list");
}

export async function getDrinksByCategory(category: string) {
	return await cocktailApi.get<{ drinks: Drink[] }>("filter.php", {
		params: {
			c: category,
		},
	});
}

export async function getDrinkById(id: string) {
	return await cocktailApi.get<{ drinks: Drink[] }>("lookup.php", {
		params: {
			i: id,
		},
	});
}

export async function getRandomDrink() {
	return await cocktailApi.get<{ drinks: Drink[] }>("random.php");
}

export async function getDrinksByIngredient(ingredient: string) {
	return await cocktailApi.get<{ drinks: Drink[] }>("filter.php", {
		params: {
			i: ingredient,
		},
	});
}

export async function getDrinksByAlcoholic(alcoholic: string) {
	return await cocktailApi.get<{ drinks: Drink[] }>("filter.php", {
		params: {
			a: alcoholic,
		},
	});
}

export async function getDrinksBySearch(searchTerm: string) {
	return await cocktailApi.get<{ drinks: Drink[] }>("search.php", {
		params: {
			s: searchTerm,
		},
	});
}
